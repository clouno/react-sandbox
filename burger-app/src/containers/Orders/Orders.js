import React, { Component } from 'react';

import Order from '../../components/Order/Order';
import Spinner from '../../components/UI/Spinner/Spinner';
import axios from '../../axios-orders'
import withErrorHandler from '../../hoc/withErrorHandler/withErrorHandler';

class Orders extends Component {
    
    state = {
        orders: [],
        loading: true
    }

    componentDidMount() {
        axios.get('/orders.json')
            .then((response) => {
                let orders = [];
                
                for (let key in response.data) {
                    orders.push({ id: key, ...response.data[key] });
                }
                
                this.setState({ orders: orders, loading: false });
            })
            .catch(err => this.setState({loading: false}));
    }
    
    render() {
        
        return (
            <div>
                {this.state.loading ? <Spinner /> : [...this.state.orders].map(o => <Order key={o.id} ingredients={o.ingredients} price={o.price} />)}                
            </div>
        );
    }
}

export default withErrorHandler(Orders, axios);
