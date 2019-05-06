import React, { Component } from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";

export default (ComposedComponent) => {
    class Authentication extends Component {
        static contextTypes = {
            router: PropTypes.object
        };

        componentWillMount = () => {
            if (!this.props.auth) {
                this.context.router.history.push("/signIn");
            }
        };

        componentWillUpdate = (nextProps) => {
            if (!nextProps.auth) {
                this.context.router.history.push("/signIn");
            }
        };

        render = () => {
            if (!this.props.auth.isEmpty) {
                return <ComposedComponent {...this.props} />;
            }
            return null;
        }
    }

    Authentication.propTypes = {
        auth: PropTypes.shape({
            isEmpty: PropTypes.bool
        })
    }

    return connect(mapStateToProps)(Authentication);
}



export const mapStateToProps = (state) => {
    return { auth: state.firebase.auth };
};
