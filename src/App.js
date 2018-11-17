import React from 'react';
import './App.scss';
import PageRouter from './components/PageRouter';
// pages
import HomePage from './pages/HomePage';
import SearchPage from './pages/SearchPage';
import PaymentPage from './pages/PaymentPage';
import SearchFieldsPage from './pages/SearchFieldsPage';
import PopupTestPage from './pages/PopupTestPage';
import RepeaterPage from './pages/RepeaterPage';

PageRouter.defineRoute('/',HomePage,'React tax application');
PageRouter.defineRoute('/tax-app',HomePage,'React tax application');
PageRouter.defineRoute('/tax-app/search',SearchPage,'React search page');
PageRouter.defineRoute('/tax-app/deals',SearchFieldsPage,'React hot deals page');
PageRouter.defineRoute('/tax-app/checkout',PaymentPage,'Checkout page');
PageRouter.defineRoute('/tax-app/repeat',RepeaterPage,'Repeater page');

// console.log('DEFINING ROUTE');
PageRouter.defineRoute(routePayment);

function routePayment (pa) { // tax-app/payment/8437763
    if (pa[1]==='payment') {
        return {
            Compo: PopupTestPage,
            title: 'Payment record {record}',
            values: {
                record: pa[2]
            }
        };
    }
}

/** the app */

export default class App extends React.Component {

    render() {
        console.log('APP RENDER');
        return <PageRouter/>
    }
}

/*
    wrap with this to see warnings:
    <React.StrictMode>
*/
