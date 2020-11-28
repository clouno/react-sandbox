import React, { Component } from 'react';
import { Route, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';

import CheckoutSummary from '../../components/Order/CheckoutSummary/CheckoutSummary'
import ContactData from './ContactData/ContactData'

import classes from './Checkout.module.css';

class Checkout extends Component {

    checkoutCancelledHandler = () => {
        this.props.history.goBack();
    }

    checkoutContinuedHandler = () => {
        this.props.history.push('/checkout/contact-data');
    }

    render() {
        return (
            this.props.purchased ? <Redirect to="/" /> :
                !this.props.ingredients ? <Redirect to="/" /> :
                    <div className={classes.Checkout}>
                        <CheckoutSummary
                            ingredients={this.props.ingredients}
                            checkoutCanceled={this.checkoutCancelledHandler}
                            checkoutContinued={this.checkoutContinuedHandler} />
                        <Route
                            path="/checkout/contact-data"
                            component={ContactData} />
                    </div>
        )
    }
}

const mapStateToProps = (state) => {
    return {
        ingredients: state.burgerBuilder.ingredients,
        purchased: state.order.purchased
    }
}

export default connect(mapStateToProps)(Checkout);
