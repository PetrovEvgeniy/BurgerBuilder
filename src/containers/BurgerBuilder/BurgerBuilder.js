import React, { useEffect, useState, useCallback} from 'react';
import { useDispatch, useSelector} from 'react-redux';

import Aux from '../../hoc/Auxiliary/Auxiliary';
import Burger from '../../components/Burger/Burger'
import BuildControls from '../../components/Burger/BuildControls/BuildControls'
import Modal from '../../components/UI/Modal/Modal';
import OrderSummary from '../../components/Burger/OrderSummary/OrderSummary';
import Spinner from '../../components/UI/Spinner/Spinner';
import withErrorHandler from '../../hoc/withErrorHandler/withErrorHandler';
import * as actions from '../../store/actions/index';
import axios from '../../axios-orders';


const BurgerBuilder = props => {

    const [isPurchasing, setIsPurchasing] = useState(false)

    const dispatch = useDispatch();

    const ings = useSelector(state => state.burgerBuilder.ingredients );
    const price = useSelector(state => state.burgerBuilder.totalPrice);
    const error = useSelector(state => state.burgerBuilder.error);
    const isAuthenticated = useSelector(state => state.auth.token !== null);


    const onIngredientAdded= (ingName) => dispatch(actions.addIngredient(ingName));
    const onIngredientRemoved= (ingName) => dispatch(actions.removeIngredient(ingName));
    const onInitIngredients=  useCallback(() => dispatch(actions.initIngredients()),[dispatch]);
    const onInitPurchase= () => dispatch(actions.purchaseInit());
    const onSetAuthRedirectPath= (path) => dispatch(actions.setAuthRedirectPath(path));

    useEffect(() => {
        onInitIngredients()
    },[onInitIngredients])

    const updatePurchaseState = (ingredients) => {

        const sum = Object.keys(ingredients)
            .map(igKey => {
                return ingredients[igKey];
            })
            .reduce((sum, el) => {
                return sum + el;
            }, 0);

        return sum > 0;
    }

    const purchaseHandler = () => {
        if(isAuthenticated){
            setIsPurchasing(true);
        }
        else{
            onSetAuthRedirectPath('/checkout');
            props.history.push("/auth")
        }
    }

   const purchaseCancelHandler = () => {
        setIsPurchasing(false);
    }

   const purchaseContinueHandler = () => {

        onInitPurchase()
        props.history.push('/checkout');
    }

        const disabledInfo = {
            ...ings
        }
        for (let key in disabledInfo) {
            disabledInfo[key] = (disabledInfo[key] <= 0);
        }

        let orderSummary = null;
        let burger = error ? <h3>Ingredients can't be loaded.</h3> : <Spinner />;

        if (ings) {
            orderSummary = (<OrderSummary
                ingredients={ings}
                cancelPurchase={purchaseCancelHandler}
                continuePurchase={purchaseContinueHandler}
                price={price} />);

            burger = (
                <Aux>
                    <Burger ingredients={ings} />
                    <BuildControls
                        addIngredient={onIngredientAdded}
                        removeIngredient={onIngredientRemoved}
                        disabledInfo={disabledInfo}
                        purchasable={updatePurchaseState(ings)}
                        orderBurger={purchaseHandler}
                        isAuth={isAuthenticated}
                        price={price} />
                </Aux>
            );
        }

        return (
            <Aux>
                <Modal show={isPurchasing} closeModal={purchaseCancelHandler}>
                    {orderSummary}
                </Modal>
                {burger}

            </Aux>
        )
    
}

// const mapStateToProps = state => {
//     return {
//         ings: state.burgerBuilder.ingredients,
//         price: state.burgerBuilder.totalPrice,
//         error: state.burgerBuilder.error,
//         isAuthenticated: state.auth.token !== null
//     }
// }

// const mapDispatchToProps = dispatch => {
//     return {
//         onIngredientAdded: (ingName) => dispatch(actions.addIngredient(ingName)),
//         onIngredientRemoved: (ingName) => dispatch(actions.removeIngredient(ingName)),
//         onInitIngredients: () => dispatch(actions.initIngredients()),
//         onInitPurchase: () => dispatch(actions.purchaseInit()),
//         onSetAuthRedirectPath: (path) => dispatch(actions.setAuthRedirectPath(path))
           
//     }
// }

export default (withErrorHandler(BurgerBuilder, axios));
