import React, { Component } from 'react';
import axios from '../../../axios-orders'

import classes from './ContactData.module.css';

import Button from '../../../components/UI/Button/Button';
import Spinner from '../../../components/UI/Spinner/Spinner';
import Input from '../../../components/UI/Input/Input';

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
                    required: true
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
        formIsValid: false,
        loading: false
    }

    orderHandler = (event) => {
        event.preventDefault();

        this.setState({loading: true});

        const formData = {};

        for (let formElementIdentifier in this.state.orderForm) {
            formData[formElementIdentifier] = this.state.orderForm[formElementIdentifier].value;
        }

        const order = {
            ingredients: this.props.ingredients,
            price: this.props.totalPrice,
            orderData: formData
        }
        
        axios.post('/orders.json', order)
            .then(() => {
                this.setState({ loading: false, purchasing: false });
                this.props.history.push('/');
            });        
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

        if (!this.state.loading) {
            
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

export default ContactData;