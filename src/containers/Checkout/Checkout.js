import React, {  } from 'react';
import {Route, Redirect} from 'react-router-dom';
import {connect} from 'react-redux';

import CheckoutSummary from '../../components/Order/CheckoutSummary/CheckoutSummary';
import ContactData from './ContactData/ContactData';


const Checkout = props => {

    const continueCheckout = () => {
        props.history.replace('/checkout/contact-data')
     }

    const cancelCheckout = () => {
        props.history.goBack();
     }

        let summary = <Redirect to="/"/>
        if(props.ings){
            const purchasedRedirect = props.purchased ? <Redirect to="/"/> : null;
            summary = (<div>
                {purchasedRedirect}
                <CheckoutSummary 
                continueCheckout={continueCheckout} 
                cancelCheckout={cancelCheckout} 
                ingredients={props.ings}/>
                <Route path={props.match.path + '/contact-data'}
                component={ContactData}/>
            </div>)
        }
        return summary;
    
}

const mapStateToProps = state => {
    return {
        ings: state.burgerBuilder.ingredients,
        purchased: state.order.purchased
    }
}


export default connect(mapStateToProps)(Checkout);