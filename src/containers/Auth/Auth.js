import React, { useState,useEffect } from 'react';
import {connect} from 'react-redux';
import {Redirect} from 'react-router-dom';
import Input from '../../components/UI/Input/Input';
import Button from '../../components/UI/Button/Button';
import Spinner from '../../components/UI/Spinner/Spinner';
import classes from './Auth.module.css';
import * as actions from '../../store/actions/index'

const Auth = props => {
    const [isSignup, setIsSignup] = useState(false)
    const [authForm, setAuthForm] = useState({
            email: {
                elementType: 'input',
                elementConfig: {
                    type: 'email',
                    placeholder: 'E-Mail Address'
                },
                value: '',
                validation: {
                    required: true,
                    match:  /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
                },
                valid: false,
                touched: false,
                errorMessage: 'This email is not valid.'
            },
            password: {
                elementType: 'input',
                elementConfig: {
                    type: 'password',
                    placeholder: 'Password'
                },
                value: '',
                validation: {
                    required: true,
                    minLength: 6
                },
                valid: false,
                touched: false,
                errorMessage: 'The password should be at least 6 characters.'
            }});
    

    const {buildingBurger, authRedirectPath, onSetAuthRedirectPath} = props;
    useEffect(() => {
        if(!buildingBurger && authRedirectPath !== '/'){
            onSetAuthRedirectPath()
        }
    },[buildingBurger, authRedirectPath, onSetAuthRedirectPath])
        

    const checkValidity = (value, rules) => {
        let isValid = true;

        if(rules.required){
            isValid = value.trim() !== '' && isValid;
        }

        if(rules.minLength){
            isValid = value.trim().length >= rules.minLength && isValid;
        }

        if(rules.maxLength){
            isValid = value.trim().length <= rules.maxLength && isValid;
        }

        if(rules.match){
            isValid = value.trim().match(rules.match) && isValid;
        }

        return isValid;
    }

    const inputChangeHandler = (event, fieldName) => {
        const updatedauthForm = {
            ...authForm,
            [fieldName]: {
                ...authForm[fieldName],
                value: event.target.value,
                valid: checkValidity(event.target.value, authForm[fieldName].validation),
                touched: true
            }
        };
        setAuthForm(updatedauthForm);
    }

    const submitHandler = (event) => {
        event.preventDefault();

        props.onAuth(authForm.email.value, authForm.password.value, isSignup)
    }

    const switchAuthModeHandler = () => {
        setIsSignup(!isSignup);
    }

        const formElementsArray = [];
        for (let key in authForm) {
            formElementsArray.push({
                id: key,
                config: authForm[key]
            })
        }


        let form = formElementsArray.map(formElement => (
            <Input
                key={formElement.id}
                elementType={formElement.config.elementType}
                elementConfig={formElement.config.elementConfig}
                value={formElement.config.value}
                invalid={!formElement.config.valid}
                shouldValidate={formElement.config.validation}
                errorMessage={formElement.config.errorMessage}
                touched={formElement.config.touched}
                handleChange={(event) => inputChangeHandler(event, formElement.id)} />
        ))

        if(props.loading){
            form = <Spinner/>
        }

        let errorMessage = null;
        if(props.error){
            errorMessage = (
                <p style={{color: "red", fontWeight: "bold" }}>{props.error.message}</p>
            )
        }

        let authRedirect = null;
        if(props.isAuthenticated){
            authRedirect = <Redirect to={props.authRedirectPath}/>
        }

        return (
            <div className={classes.Auth}>
                {authRedirect}
                {errorMessage}
                <form onSubmit={submitHandler}>
                    {form}
                    <Button btnType="Success">SUBMIT</Button>
                </form>
                <Button 
                clicked={switchAuthModeHandler}
                btnType="Danger">SWITCH TO {isSignup ? 'SIGNIN' : 'SIGNUP'}</Button>
            </div>
        )
    
}

const mapStateToProps = state => {
    return {
        loading: state.auth.loading,
        error: state.auth.error,
        isAuthenticated: state.auth.token !== null,
        buildingBurger: state.burgerBuilder.building,
        authRedirectPath: state.auth.authRedirectPath 
    }   
}

const mapDispatchToProps = dispatch => {
    return {
        onAuth: (email,password,isSignup) => dispatch(actions.auth(email,password,isSignup)),
        onSetAuthRedirectPath: () => dispatch(actions.setAuthRedirectPath('/'))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Auth)