import React, {Component} from 'react';
import {compose} from 'redux';
import {connect} from 'react-redux';
import PropTypes from 'prop-types';
import {Loader, Grid, Header} from 'semantic-ui-react';
import {firebaseConnect} from 'react-redux-firebase';

import Add from '../features/grocery-list/add';
import firebase from '../../config/fbConfig';
import FirestoreItemList from '../../enhancers/firestore-connected-list';
import {Navigation} from '../features/navigation';

const queryFor = (field, value) => firebase.firestore().collection('shares')
    .where(field, '==', value)
    .get()
    .then(querySnap => querySnap.docs)
    .then(queryDocSnaps => queryDocSnaps.map(queryDocSnap => ({id: queryDocSnap.id, ...queryDocSnap.data()})));

export class Groceries extends Component {
    constructor(props) {
        super(props);
        this.state = {
            ids: []
        };
    }
    async componentDidMount() {
        const othersShares = await queryFor('requestedId', this.props.auth.uid)
            .then(docs => docs.map(doc => doc.senderId));
        const myShares = await queryFor('senderId', this.props.auth.uid)
            .then(docs => docs.map(doc => doc.requestedId).filter(Boolean));
        myShares.push(this.props.auth.uid);
        this.setState({
            ids: Array.from(new Set(othersShares.concat(myShares)))
        });
    }

    render = () => {
        return (
            <Grid centered columns={1} container>
                <Grid.Column computer='10' mobile='16'>
                    <Navigation active='home' />
                    <Header as='h1'>{'Grocery List'}</Header>
                    {this.state.ids.length
                        ? this.buildList()
                        : <Loader active />}
                </Grid.Column>
            </Grid>
        );
    }

    buildList = () => {
        return (
            <>
                <Grid.Row>
                    <FirestoreItemList ids={this.state.ids} userId={this.props.auth.uid} />
                </Grid.Row>
                <Grid.Row>
                    <Add />
                </Grid.Row>
            </>
        );
    }
}

Groceries.propTypes = {
    auth: PropTypes.shape({
        uid: PropTypes.string
    })
};

const mapStateToProps = state => ({
    auth: state.firebase.auth
});

export default compose(
    firebaseConnect(),
    connect(mapStateToProps)
)(Groceries);