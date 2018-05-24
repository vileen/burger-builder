import React, { Component } from 'react';
import { connect } from 'react-redux';

import Order from '../../components/Order';
import axios from '../../axios-orders';
import withErrorHandler from '../../hoc/withErrorHandler';
import * as actions from '../../store/actions';
import Spinner from '../../components/UI/Spinner';

class Orders extends Component {
    componentDidMount() {
        this.props.onFetchOrders();
    }

    render() {
        let orders = <Spinner />;

        if (!this.props.loading) {
            orders = this.props.orders.map(order => {
                return <Order ingredients={order.ingredients} key={order.id} price={order.price} />;
            });
        }

        return <div>{orders}</div>;
    }
}

const mapStateToProps = state => {
    return {
        orders: state.order.orders,
        loading: state.order.loading
    };
};

const mapDispatchToProps = dispatch => {
    return {
        onFetchOrders: () => dispatch(actions.fetchOrders())
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(withErrorHandler(Orders, axios));
