import React, { Component } from 'react';
import { Route, Switch, withRouter, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';

import Layout from './hoc/Layout';
import BurgerBuilder from './containers/BurgerBuilder';
import Logout from './containers/Auth/Logout';
import * as actions from './store/actions';
import asyncComponent from './hoc/asyncComponent';

const asyncCheckout = asyncComponent(() => {
    return import('./containers/Checkout');
});

const asyncOrders = asyncComponent(() => {
    return import('./containers/Orders');
});

const asyncAuth = asyncComponent(() => {
    return import('./containers/Auth');
});

class App extends Component {
    componentDidMount() {
        this.props.onTryAutoSignUp();
    }

    render() {
        let routes = (
            <Switch>
                <Route path="/auth" component={asyncAuth} />
                <Route path="/" component={BurgerBuilder} />
                <Redirect to="/" />
            </Switch>
        );

        if (this.props.isAuthenticated) {
            routes = (
                <Switch>
                    <Route path="/checkout" component={asyncCheckout} />
                    <Route path="/orders" component={asyncOrders} />
                    <Route path="/logout" component={Logout} />
                    <Route path="/auth" component={asyncAuth} />
                    <Route path="/" component={BurgerBuilder} />
                </Switch>
            );
        }

        return (
            <div>
                <Layout>{routes}</Layout>
            </div>
        );
    }
}

const mapStateToProps = state => {
    return {
        isAuthenticated: !!state.auth.token
    };
};

const mapDispatchToProps = dispatch => {
    return {
        onTryAutoSignUp: () => dispatch(actions.authCheckState())
    };
};

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(App));
