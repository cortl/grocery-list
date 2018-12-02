import React, {Component} from 'react'
import Icon from './Icon';
import {connect} from "react-redux";
import {changeExistingCategory, changeNewCategory, removeItem} from "../actions";
import Category from "./Category";
import PropTypes from "prop-types";
import {CATEGORIES} from "../constants/categories";

export class ItemActions extends Component {

    changeCategory = () => {
        return this.props.category.associationId
            ? this.props.updateExistingCategory(this.props.category.associationId, this.props.name)
            : this.props.addNewCategory(this.props.id, this.props.name);

    };

    render() {
        return (
            <div className='float-right'>
                <button type='button' className='btn btn-link' id={`${this.props.id}dropDown`}
                        data-toggle="dropdown" aria-haspopup="true" aria-expanded="true">
                    <Icon color={this.props.category.textColor} type='cog'/>
                </button>
                <ul className="dropdown-menu" aria-labelledby={`${this.props.id}dropDown`}>
                    {Object.keys(CATEGORIES).map((key) => {
                        return <Category key={key} change={this.changeCategory()} category={CATEGORIES[key]}/>
                    })}
                </ul>
                <button onClick={(e) => this.props.removeItem(this.props.id)} type='button' className='btn btn-link'>
                    <Icon color={this.props.category.textColor} type='trash'/>
                </button>
            </div>
        )
    }
}

ItemActions.propTypes = {
    id: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
    addNewCategory: PropTypes.func.isRequired,
    updateExistingCategory: PropTypes.func.isRequired,
    removeItem: PropTypes.func.isRequired,
    category: PropTypes.shape({
        associationId: PropTypes.string
    })
};

export const mapDispatchToProps = dispatch => ({
    removeItem: id => dispatch(removeItem(id)),
    addNewCategory: (id, name) => category => dispatch(changeNewCategory(id, name, category)),
    updateExistingCategory: (id, name) => category => dispatch(changeExistingCategory(id, name, category))
});

export default connect(null, mapDispatchToProps)(ItemActions);
