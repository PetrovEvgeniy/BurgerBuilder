import React from 'react';
import classes from './Input.module.css';

const input = (props) => {
    let inputElement = null;
    let validationError = null;
    const inputClasses = [classes.InputElement];

    if(props.invalid && props.shouldValidate && props.touched){
        inputClasses.push(classes.Invalid)
        validationError = <p className={classes.ValidationError}>{props.errorMessage} </p>
    }
    let inputClassString = inputClasses.join(' ');

    switch(props.elementType){
        case('input'):
            inputElement = <input 
            className={inputClassString} 
            {...props.elementConfig} 
            value={props.value}
            onChange={props.handleChange}/>;
            break;

        case('textarea'):
            inputElement = <textarea 
            className={inputClassString}
            {...props.elementConfig} 
            value={props.value}
            onChange={props.handleChange}/>
            break;

        case('select'):
            inputElement = (
            <select
            className={inputClassString}
            value={props.value}
            onChange={props.handleChange}>
                {props.elementConfig.options.map(option => (
                    <option key={option.value} value={option.value}>
                        {option.displayValue}
                    </option>
                ))}
            </select>)
            break;

        default:
            inputElement = <input className={inputClassString}{...props.elementConfig} value={props.value}/>;
    }

    return (
        <div className={classes.Input}>
            <label className={classes.Label}>{props.label}</label>
            {inputElement}
            {validationError}
        </div>
    );
}
 
export default input;