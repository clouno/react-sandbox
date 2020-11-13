import React from 'react';

import classes from './Input.module.css';

const input = (props) => {

    let inputElement = null;

    const inputClasses = [classes.InputElement];

    if (props.touched && !props.valid) {
        inputClasses.push(classes.Invalid);
    }

    const InputClassesString = inputClasses.join(' ');

    switch(props.elementType) {
        case 'input':
            inputElement = <input className={InputClassesString} value={props.value} {...props.elementConfig} onChange={props.changed}/>;
            break;
        case 'textarea':
            inputElement = <textarea className={InputClassesString} value={props.value} {...props.elementConfig} onChange={props.changed}/>;
            break
        case 'select':
            inputElement = 
                <select className={InputClassesString} onChange={props.changed}>
                    {props.elementConfig.options.map(o => <option key={o.value} value={o.value} selected={o.selected}>{o.displayValue}</option>)}
                </select>
            break;
        default:
            inputElement = <input className={InputClassesString} value={props.value} {...props.elementConfig} onChange={props.changed}/>;
    }

    return (
        <div className={classes.Input}>
            <label className={classes.Label}>{props.label}</label>
            {inputElement}
        </div>
    );
} 

export default input;