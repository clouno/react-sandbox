import React, { Component } from 'react';
import { connect } from 'react-redux';

import Order from '../../components/Order/Order';
import Spinner from '../../components/UI/Spinner/Spinner';
import axios from '../../axios-orders'
import withErrorHandler from '../../hoc/withErrorHandler/withErrorHandler';
import { fetchOrders } from '../../store/actions/'

class Orders extends Component {
    
    componentDidMount() {
        this.props.onFetchOrders()
    }
    
    render() {
        
        return (
            <div>
                {this.props.loading ? <Spinner /> : [...this.props.orders].map(o => <Order key={o.id} ingredients={o.ingredients} price={o.price} />)}                
            </div>
        );
    }
}

const mapStateToProps = (state) => {
    return {
        loading: state.order.loading,
        orders: state.order.orders
    }
} 


const mapDispatchToProps = (dispatch) => {
    return {
        onFetchOrders: () => dispatch(fetchOrders())
    }
} 

export default connect(mapStateToProps, mapDispatchToProps)(withErrorHandler(Orders, axios));
