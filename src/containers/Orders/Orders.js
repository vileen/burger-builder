import React, {Component} from 'react';

import Order from '../../components/Order';
import axios from '../../axios-orders';
import withErrorHandler from '../../hoc/withErrorHandler';

class Orders extends Component {
    state = {
        orders: [],
        loading: false,
    };



    async componentDidMount() {
        const fetchedOrders = [];
        try {
            const response = await axios.get('/orders.json');
            for (let key in response.data) {
                fetchedOrders.push({
                    ...response.data[key],
                    id: key
                });
            }
        } catch(err) {
            this.setState({
                loading: false
            })
        }

        this.setState({
            orders: fetchedOrders,
            loading: false
        })
    }

    render() {
        return (
            <div>
                {this.state.orders.map(order => {
                    return <Order
                        ingredients={order.ingredients}
                        key={order.id}
                        price={order.price}
                    />
                })}
            </div>
        );
    }
}

export default withErrorHandler(Orders, axios);