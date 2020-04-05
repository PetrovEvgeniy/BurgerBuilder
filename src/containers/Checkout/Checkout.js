import React, { Component } from 'react';
import {Route, Redirect} from 'react-router-dom';
import {connect} from 'react-redux';

import CheckoutSummary from '../../components/Order/CheckoutSummary/CheckoutSummary';
import ContactData from './ContactData/ContactData';


class Checkout extends Component {

     continueCheckout = () => {
        this.props.history.replace('/checkout/contact-data')
     }

     cancelCheckout = () => {
        this.props.history.goBack();
     }

    render() { 
        let summary = <Redirect to="/"/>
        if(this.props.ings){
            const purchasedRedirect = this.props.purchased ? <Redirect to="/"/> : null;
            summary = (<div>
                {purchasedRedirect}
                <CheckoutSummary 
                continueCheckout={this.continueCheckout} 
                cancelCheckout={this.cancelCheckout} 
                ingredients={this.props.ings}/>
                <Route path={this.props.match.path + '/contact-data'}
                component={ContactData}/>
            </div>)
        }
        return summary;
    }
}

const mapStateToProps = state => {
    return {
        ings: state.burgerBuilder.ingredients,
        purchased: state.order.purchased
    }
}


export default connect(mapStateToProps)(Checkout);