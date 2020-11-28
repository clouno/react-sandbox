import React, { Component, Fragment } from 'react';
import { connect } from 'react-redux';

import Burger from '../../components/Burger/Burger';
import BuildControls from '../../components/Burger/BuildControls/BuildControls';
import Modal from '../../components/UI/Modal/Modal';
import OrderSummary from '../../components/Burger/OrderSummary/OrderSummary';
import Spinner from '../../components/UI/Spinner/Spinner';
import withErrorHandler from '../../hoc/withErrorHandler/withErrorHandler';
import * as actions from '../../store/actions/';

import axios from '../../axios-orders';

class BurgerBuilder extends Component {
    
    state = {
        purchasing: false
    }
    
    componentDidMount() {
        this.props.onInitIngredients();
    }

    isPurchasable = () => {
        const sumOfIngredients = Object.values(this.props.ingredients).reduce((sum, el) => sum + el);
        return sumOfIngredients > 0;
    }

    purchasingHandler = () => {
        this.setState({purchasing: true});
    }

    purchasingCancelHandler = () => {
        this.setState({purchasing: false});
    }

    purchasingContinueHandler = () => {
        this.props.onInitPurchase();
        this.props.history.push("/checkout");
    }

    render() {
                
        let orderSummary = null;
        let burger = this.props.error ? <p>Ingredients can't be loaded!</p> : <Spinner />;

        if (this.props.ingredients) {
            
            const disabledInfo = {...this.props.ingredients};
            for (let type of Object.keys(disabledInfo)) {
                disabledInfo[type] = disabledInfo[type] <= 0;
            }

            burger = 
                <Fragment>
                    <Burger ingredients={this.props.ingredients} />
                    <BuildControls 
                        disabled={disabledInfo}
                        purchasable={this.isPurchasable()}
                        ingredientAdded={this.props.onAddedIngredient} 
                        ingredientRemoved={this.props.onRemovedIngredient}
                        price={this.props.totalPrice}
                        purchased={this.purchasingHandler}
                    />
                </Fragment>
            
            orderSummary = 
                <OrderSummary 
                    ingredients={this.props.ingredients} 
                    price={this.props.totalPrice}
                    purchaseCancelled={this.purchasingCancelHandler}
                    purchaseContinued={this.purchasingContinueHandler}
                />
        }

        return (
            <Fragment>
                <Modal show={this.state.purchasing} clicked={this.purchasingCancelHandler}>
                    {orderSummary}
                </Modal>
                {burger}
            </Fragment>
        ); 
    }
}

const mapStateToProps = (state) => {
    return {
        ingredients: state.burgerBuilder.ingredients,
        totalPrice: state.burgerBuilder.totalPrice,
        purchasable: state.burgerBuilder.purchasable,
        error: state.burgerBuilder.error
    }
};

const mapDispatchToProps = (dispatch) =>  {
    return {
        onAddedIngredient: (ingredientType) => dispatch(actions.addIngredient(ingredientType)),
        onRemovedIngredient: (ingredientType) => dispatch(actions.removeIngredient(ingredientType)),
        onInitIngredients: () => dispatch(actions.initIngredients()),
        onInitPurchase: () => dispatch(actions.purchaseInit())
    }
};

export default connect(mapStateToProps, mapDispatchToProps)(withErrorHandler(BurgerBuilder, axios));
