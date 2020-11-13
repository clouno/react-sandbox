import React from 'react';

import { BrowserRouter, Route, Switch } from 'react-router-dom'

import Layout from './components/Layout/Layout';
import BurgerBuilder from './containers/BurgerBuilder/BurgerBuilder';
import Checkout from './containers/Checkout/Checkout';
import Orders from './containers/Orders/Orders';

function App() {
    return (
        <div>
            <BrowserRouter>
                <Layout>
                    <Switch>
                        <Route path="/checkout" component={Checkout} />
                        <Route path="/orders" component={Orders} />
                        <Route path="/" component={BurgerBuilder} />
                    </Switch>
                </Layout>
            </BrowserRouter>
        </div>
    );
}

export default App;
