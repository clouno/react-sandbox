import React, { Component} from 'react';

import classes from './Auth.module.css';

import Button from '../../components/UI/Button/Button';
import Spinner from '../../components/UI/Spinner/Spinner';
import Input from '../../components/UI/Input/Input';

class Auth extends Component {

    state = {
        controls: {
            email: {
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
            password: {
                elementType: 'input',
                elementConfig: {
                    type: 'password',
                    placeholder: 'Your Password'
                },
                validation: {
                    required: true,
                    minLength: 7
                },
                valid: false,
                touched: false,
                value: ''
            }
        }
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
        const updatedControls = {...this.state.controls};
        const updatedFormElement = {...updatedControls[inputIdentifier]}

        updatedFormElement.value = event.target.value;
        updatedFormElement.touched = true;
        updatedFormElement.valid = this.checkValidity(updatedFormElement.value, updatedFormElement.validation);

        updatedControls[inputIdentifier] = updatedFormElement;

        let formIsValid = true;

        for (let formElementIdentifier in updatedControls) {
            formIsValid = updatedControls[formElementIdentifier].valid && formIsValid;
        }

        this.setState({controls: updatedControls, formIsValid: formIsValid});
    }

    render() {

        let form = <Spinner />;

        if (!this.props.loading) {
            
            const formElements = [];

            for (let key in this.state.controls) {
                formElements.push(
                    <Input key={key} {...this.state.controls[key]} changed={(event) => this.inputElementChangedHandler(event, key)} />
                );
            }
            
            form = (
                <div className={classes.Auth}>
                    <form>
                        {formElements}
                        <Button btnType="Success">SUBMIT</Button>
                    </form>                
                </div>
            );
        }

        return form;
    }
}

export default Auth;