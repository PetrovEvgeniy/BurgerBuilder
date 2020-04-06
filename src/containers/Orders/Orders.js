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
       this.props.onFetchOrders(this.props.token, this.props.userId)
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
        loading: state.order.loading,
        token: state.auth.token,
        userId: state.auth.userId
    }
}

const mapDispatchToProps = dispatch => {
    return {
        onFetchOrders: (token, userId) => dispatch(actions.fetchOrders(token, userId))
    }
}

export default connect(mapStateToProps,mapDispatchToProps)(withErrorHandler(Orders,axios));