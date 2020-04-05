import * as actionTypes from './actionsTypes'
import axios from '../../axios-orders';


export const purchaseBurgerSuccess = (id, data) => {
    return {
        type: actionTypes.PURCHASE_BURGER_SUCCESS,
        orderId: id,
        orderData: data.orderData,
        ingredients: data.ings,
        price: data.price
    }
}

export const purchaseBurgerFail = (error) => {
    return {
        type: actionTypes.PURCHASE_BURGER_FAIL,
        error: error
    }
}

export const purchaseBurgerStart = () => {
    return {
        type: actionTypes.PURCHASE_BURGER_START
    }
}

export const purchaseBurger= (data) => {
    return dispatch => {
        dispatch(purchaseBurgerStart());
        axios.post('/orders.json', data)
            .then(response => {
                dispatch(purchaseBurgerSuccess(response.data.name, data))
            })
            .catch(error => purchaseBurgerFail(error));
    }
}

export const purchaseInit = () => {
    return {
        type: actionTypes.PURCHASE_INIT
    }
}

export const fetchOrdersSuccess = (orders) => {
    return {
        type: actionTypes.FETCH_ORDERS_SUCCESS,
        orders: orders
    }
}

export const fetchOrdersFail = (error) => {
    return {
        type: actionTypes.FETCH_ORDERS_FAIL,
        error: error
    }
}

export const fetchOrdersStart = () => {
    return {
        type: actionTypes.FETCH_ORDERS_START
    }
}

export const fetchOrders = () => {
    return dispatch => {
        dispatch(fetchOrdersStart())
        axios.get('/orders.json')
        .then(res => {
            const fetchedOrders = [];
            for(let key in res.data){
                fetchedOrders.push({
                    ...res.data[key],
                    id: key
                });
            }
            dispatch(fetchOrdersSuccess(fetchedOrders))
        })
        .catch(error => {
            dispatch(fetchOrdersFail(error))
        })

    }
}