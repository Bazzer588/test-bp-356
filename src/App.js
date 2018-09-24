import React from 'react';
import './App.css';
import PageRouter from './components/PageRouter';
// pages
import HomePage from './pages/HomePage';
import SearchPage from './pages/SearchPage';
import PaymentPage from './pages/PaymentPage';

PageRouter.defineRoute('/',HomePage,'React tax application');
PageRouter.defineRoute('/tax-app',HomePage,'React tax application');
PageRouter.defineRoute('/tax-app/search',SearchPage,'React search page');
PageRouter.defineRoute('/tax-app/deals',SearchPage,'React hot deals page');
PageRouter.defineRoute('/tax-app/checkout',PaymentPage,'Checkout page');

//PageRouter.defineRoute(() => {},'search');

export default class App extends React.Component {

    render() {
        return <PageRouter/>
    }
}

/*
    wrap with this to see warnings:
    <React.StrictMode>
 */
