import React, { Component, Fragment } from 'react';

import Burger from '../../components/Burger/Burger'
import BuildControls from '../../components/Burger/BuildControls/BuildControls'
import Modal from '../../components/UI/Modal/Modal'
import OrderSummary from '../../components/Burger/OrderSummary/OrderSummary'
import Spinner from '../../components/UI/Spinner/Spinner'
import withErrorHandler from '../../hoc/withErrorHandler/withErrorHandler'

import axios from '../../axios-orders'

const INGREDIENT_PRICES = {
    salad: 0.5,
    bacon: 0.7,
    cheese: 0.4,
    meat: 1.3,
}

class BurgerBuilder extends Component {
    
    state = {
        ingredients: null,
        totalPrice: 4,
        purchasable: false,
        purchasing: false,
        error: false
    }
    
    componentDidMount() {
        axios.get('/ingredients.json')
            .then(response => {
               this.setState({ ingredients: response.data });                
            })
            .catch(error => this.setState({ error: true }));        
    }

    updatePurchasable = (updatedIngredients) => {
        const sumOfIngredients = Object.values(updatedIngredients).reduce((sum, el) => sum + el);
        this.setState({purchasable: sumOfIngredients > 0});
    }

    addIngredientHandler = (type) => {
        const updatedIngredients = {...this.state.ingredients};
        updatedIngredients[type] = this.state.ingredients[type] + 1;
        
        const newPrice = this.state.totalPrice + INGREDIENT_PRICES[type];
        
        this.setState({ingredients: updatedIngredients, totalPrice: newPrice});
        this.updatePurchasable(updatedIngredients);
    }

    removeIngredientHandler = (type) => {
        const updatedIngredients = {...this.state.ingredients};
        const newCount = this.state.ingredients[type] - 1;
        
        if (newCount < 0) {
            return;
        }

        updatedIngredients[type] = newCount;

        const newPrice = this.state.totalPrice - INGREDIENT_PRICES[type];

        this.setState({ingredients: updatedIngredients, totalPrice: newPrice});
        this.updatePurchasable(updatedIngredients);
    }

    purchasingHandler = () => {
        this.setState({purchasing: true});
    }

    purchasingCancelHandler = () => {
        this.setState({purchasing: false});
    }

    purchasingContinueHandler = () => {
        
        const queryParams = [];

        for (let i in this.state.ingredients) {
            queryParams.push(encodeURIComponent(i) + '=' + encodeURIComponent(this.state.ingredients[i]));
        }

        queryParams.push("price=" + this.state.totalPrice.toFixed(2));

        const queryString = queryParams.join("&");

        this.props.history.push({
            pathname: "/checkout",
            search: '?' + queryString
        });
    }

    render() {
                
        let orderSummary = null;
        let burger = this.state.error ? <p>Ingredients can't be loaded!</p> : <Spinner />;

        if (this.state.ingredients) {
            
            const disabledInfo = {...this.state.ingredients};
            for (let type of Object.keys(disabledInfo)) {
                disabledInfo[type] = disabledInfo[type] <= 0;
            }

            burger = 
                <Fragment>
                    <Burger ingredients={this.state.ingredients} />
                    <BuildControls 
                        disabled={disabledInfo}
                        purchasable={this.state.purchasable}
                        ingredientAdded={this.addIngredientHandler} 
                        ingredientRemoved={this.removeIngredientHandler}
                        price={this.state.totalPrice}
                        purchased={this.purchasingHandler}
                    />
                </Fragment>
            
            orderSummary = 
                <OrderSummary 
                    ingredients={this.state.ingredients} 
                    price={this.state.totalPrice}
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

export default withErrorHandler(BurgerBuilder, axios);