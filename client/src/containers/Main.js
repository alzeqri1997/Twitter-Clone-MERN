import React from 'react';
import { Switch, Route, withRouter } from "react-router-dom";
import { connect } from "react-redux";
import Homepage from "../components/Homepage";
import AuthForm from "../components/AuthForm";
import { authUser } from "../store/actions/auth"; 
import { removeError } from "../store/actions/errors";
import withAuth from '../hocs/withAuth';
import MessageFrom from '../containers/MessageForm';

const Main = props => {
const { authUser, errors, removeError, currentUser } = props;
    return (
        <div className="container" >
            <Switch>
                <Route exact path="/" render={props => <Homepage currentUser={currentUser} {...props} />} />
                <Route exact path="/signin" render={props => (
                    <AuthForm removeError={removeError} errors={errors} onAuth={authUser} buttonText="Log in" heading="Welcome Back." {...props} />
                )}
                />
                <Route exact path="/signup" render={props => (
                    <AuthForm removeError={removeError} errors={errors} onAuth={authUser} signUp buttonText="Sign me up" heading="Join Twitter now " {...props} />
                )}
                />
                <Route path="/users/:id/messages/new" component={withAuth(MessageFrom)}/>
            </Switch>
        </div>
    );
}

function mapStateToProps(state) {
    return {
        currentUser: state.currentUser,
        errors:state.errors
    };
}
export default withRouter(connect(mapStateToProps , {authUser, removeError})(Main));