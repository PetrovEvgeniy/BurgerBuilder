import React, { Component } from 'react';
import * as actions from '../../store/actions';
import axios from '../../axios-orders';
import {connect} from 'react-redux';
import withErrorHandler from '../../hoc/withErrorHandler/withErrorHandler';
import Order from '../../components/Order/Order';
import Spinner from '../../components/UI/Spinner/Spinner';
class Orders extends Component {
    state = { 
        
     }

    componentDidMount() {
       this.props.onFetchOrders()
    }

    render() { 

        let orders = <Spinner/>;

        if(!this.props.loading){
            orders = this.props.orders.map(order => <Order 
                key={order.id} 
                price={order.price.toFixed(2)}
                ingredients={order.ingredients}/>);
        }

        return ( 
            <div>
                {orders}
            </div>
         );
    }
}
 
const mapStateToProps = state => {
    return {
        orders: state.order.orders,
        loading: state.order.loading
    }
}

const mapDispatchToProps = dispatch => {
    return {
        onFetchOrders: () => dispatch(actions.fetchOrders())
    }
}

export default connect(mapStateToProps,mapDispatchToProps)(withErrorHandler(Orders,axios));