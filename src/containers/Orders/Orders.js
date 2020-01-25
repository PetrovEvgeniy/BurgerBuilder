import React, { Component } from 'react';
import axios from '../../axios-orders';

import withErrorHandler from '../../hoc/withErrorHandler/withErrorHandler';
import Order from '../../components/Order/Order';
import Spinner from '../../components/UI/Spinner/Spinner';
class Orders extends Component {
    state = { 
        orders: [],
        loading: true
     }

    componentDidMount() {
        axios.get('/orders.json')
        .then(res => {
            const fetchedOrders = [];
            this.setState({loading: false})
            for(let key in res.data){
                fetchedOrders.push({
                    ...res.data[key],
                    id: key
                });
            }

            this.setState({loading: false, orders: fetchedOrders})
        })
        .catch(error => {
            this.setState({loading: false})
        })
    }

    render() { 

        let orders = this.state.orders.map(order => <Order 
            key={order.id} 
            price={order.price.toFixed(2)}
            ingredients={order.ingredients}/>);

        if(this.state.loading){
            orders = <Spinner/>;
        }

        return ( 
            <div>
                {orders}
            </div>
         );
    }
}
 
export default withErrorHandler(Orders,axios);