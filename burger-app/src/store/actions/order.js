import axios from '../../axios-orders'
import * as actionTypes from './actionTypes';

export const purchaseBurgerSuccess = (id, orderData) => {
    return {
        type: actionTypes.PURCHASE_BURGER_SUCCESS,
        orderId: id,
        orderData: orderData
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
        type: actionTypes.PURCHASE_BURGER_START,
    }
}

export const purchaseBurger = (orderData) => {
    return (dispatch) => {
        dispatch(purchaseBurgerStart());
        axios.post('/orders.json', orderData)
            .then((response) => {
                dispatch(purchaseBurgerSuccess(response.data.name, orderData));
            })
            .catch(error => purchaseBurgerFail(error));
    }
}

export const purchaseInit = (error) => {
    return {
        type: actionTypes.PURCHASE_INIT,
    }
}

export const fetchOrdersStart = () => {
    return {
        type: actionTypes.FETCH_ORDERS_START
    }
}

export const fetchOrders = () => {
    return (dispatch) => {
        dispatch(fetchOrdersStart());
        axios.get('/orders.json')
            .then((response) => {
                let orders = [];
                
                for (let key in response.data) {
                    orders.push({ id: key, ...response.data[key] });
                }
                dispatch(fetchOrdersSuccess(orders));
            })
            .catch(err => dispatch(fetchOrdersFail(err)));        
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
        type: actionTypes.FETCH_ORDERS_FAIL
    }
} 