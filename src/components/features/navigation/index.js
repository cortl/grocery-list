import React from 'react';
import {Menu} from 'semantic-ui-react';
import PropTypes from 'prop-types';

import SignOut from './sign-out';

export class Navigation extends React.Component {
    static contextTypes = {
        router: PropTypes.object
    };

    navigateTo = url => () => this.context.router.history.push(url)

    render = () => {
        return (
            <Menu secondary>
                <Menu.Menu position='right'>
                    <Menu.Item
                        active={this.props.active === 'home'}
                        onClick={this.navigateTo('/')}
                    >
                        {'Home'}
                    </Menu.Item>
                    <Menu.Item
                        active={this.props.active === 'settings'}
                        onClick={this.navigateTo('/settings')}
                    >
                        {'Settings'}
                    </Menu.Item>
                    <SignOut />
                </Menu.Menu>
            </Menu>
        );
    }
}

Navigation.propTypes = {
    active: PropTypes.string
};