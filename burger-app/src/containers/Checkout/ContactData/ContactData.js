import React, { Component } from 'react';
import { connect } from 'react-redux';
import axios from '../../../axios-orders'

import classes from './ContactData.module.css';

import Button from '../../../components/UI/Button/Button';
import Spinner from '../../../components/UI/Spinner/Spinner';
import Input from '../../../components/UI/Input/Input';
import withErrorHandler from '../../../hoc/withErrorHandler/withErrorHandler';

import * as actions from '../../../store/actions/'

class ContactData extends Component {

    state = {
        orderForm: {
            name: {
                elementType: 'input',
                elementConfig: {
                    type: 'text',
                    placeholder: 'Your Name'
                },
                validation: {
                    required: true
                },
                valid: false,
                touched: false,
                value: ''
            },
            street: {
                elementType: 'input',
                elementConfig: {
                    type: 'text',
                    placeholder: 'Street'
                },
                validation: {
                    required: true
                },
                valid: false,
                touched: false,
                value: ''
            },
            zipCode: {
                elementType: 'input',
                elementConfig: {
                    type: 'text',
                    placeholder: 'ZIP Code'
                },
                validation: {
                    required: true,
                    minLength: 5,
                    maxLength: 5
                },
                valid: false,
                touched: false,
                value: ''
            },
            country: {
                elementType: 'input',
                elementConfig: {
                    type: 'text',
                    placeholder: 'Country'
                },
                validation: {
                    required: true
                },
                valid: false,
                touched: false,
                value: ''
            },
            mail: {
                elementType: 'input',
                elementConfig: {
                    type: 'email',
                    placeholder: 'Your E-Mail'
                },
                validation: {
                    required: true,
                    isEmail: true
                },
                valid: false,
                touched: false,
                value: ''
            },
            deliveredMethod: {
                elementType: 'select',
                elementConfig: {
                    options: [
                        { value: 'fastest', displayValue: 'Fastest'},
                        { value: 'cheapest', displayValue: 'Cheapest'}
                    ]
                },
                validation: {},
                valid: true,
                touched: false,
                value: 'fastest'
            }
        },
        formIsValid: false
    }

    orderHandler = (event) => {
        event.preventDefault();

        const formData = {};

        for (let formElementIdentifier in this.state.orderForm) {
            formData[formElementIdentifier] = this.state.orderForm[formElementIdentifier].value;
        }

        const order = {
            ingredients: this.props.ingredients,
            price: this.props.totalPrice,
            orderData: formData
        }
        
        this.props.onSubmitOrder(order);
    }

    checkValidity = (value, rules) => {
        let isValid = true;

        if (rules.required) {
            isValid = value.trim() !== '' && isValid;
        }

        if (rules.minLength) {
            isValid = value.length >= rules.minLength && isValid;
        }

        if (rules.maxLength) {
            isValid = value.length <= rules.maxLength && isValid;
        }

        if (rules.isEmail) {
            const emailPattern = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
            isValid = emailPattern.test(String(value).toLowerCase())
        }

        return isValid;
    }
    
    inputElementChangedHandler = (event, inputIdentifier) => {
        const updatedOrderForm = {...this.state.orderForm};
        const updatedFormElement = {...updatedOrderForm[inputIdentifier]}

        updatedFormElement.value = event.target.value;
        updatedFormElement.touched = true;
        updatedFormElement.valid = this.checkValidity(updatedFormElement.value, updatedFormElement.validation);

        updatedOrderForm[inputIdentifier] = updatedFormElement;

        let formIsValid = true;

        for (let formElementIdentifier in updatedOrderForm) {
            formIsValid = updatedOrderForm[formElementIdentifier].valid && formIsValid;
        }

        this.setState({orderForm: updatedOrderForm, formIsValid: formIsValid});
    }

    render() {

        let form = <Spinner />;

        if (!this.props.loading) {
            
            const formElements = [];

            for (let key in this.state.orderForm) {
                formElements.push(
                    <Input key={key} {...this.state.orderForm[key]} changed={(event) => this.inputElementChangedHandler(event, key)} />
                );
            }
            
            form = (
                <div className={classes.ContactData}>
                    <h4>Enter your Contact Data</h4>
                    <form onSubmit={this.orderHandler}>
                        {formElements}
                        <Button btnType="Success" disabled={!this.state.formIsValid}>ORDER</Button>
                    </form>                
                </div>
            );
        }

        return form;
    }
}

const mapStateToProps = (state) => {
    return {
        ingredients: state.burgerBuilder.ingredients,
        totalPrice: state.burgerBuilder.totalPrice,
        loading: state.order.loading
    }
}

const mapDispatchToPros = (dispatch) => {
    return {
        onSubmitOrder: (orderData) => dispatch(actions.purchaseBurger(orderData))  
    }
}

export default connect(mapStateToProps, mapDispatchToPros)(withErrorHandler(ContactData, axios));