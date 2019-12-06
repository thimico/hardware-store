import React from 'react';
import { BrowserRouter as Router, Switch, Route, Redirect } from 'react-router-dom';
import Home from './pages/Home';
import Products from './pages/Products';
import Categories from './pages/Categories';
import ProductDetails from './components/ProductBox/Details';

const Routes = () => (
    <Router>
        <Switch>
            <Route exact path="/" component={Home} />
            <Route exact path="/products" component={Products} />
            <Route exact path="/categories/:id" component={Categories} />
            <Route exact path="/products/:id" component={ProductDetails} />
            <Redirect to="/" />
        </Switch>
    </Router>
);

export default Routes;
