import React from 'react';
import './App.scss';
import PageRouter from './components/PageRouter';
// language
import { changeLang } from './languages';
// pages
import HomePage from './pages/HomePage';
import SearchPage from './pages/SearchPage';
import PaymentPage from './pages/PaymentPage';
import SearchFieldsPage from './pages/SearchFieldsPage';
import PopupTestPage from './pages/PopupTestPage';
import RepeaterPage from './pages/RepeaterPage';
import LazyPage from './components/LazyPage';
import DemoPage2 from "./pages/DemoPage2";

/** defined app routes */

PageRouter.defineRoute('/',HomePage,'React tax application');
PageRouter.defineRoute('/tax-app',HomePage,'React tax application');
PageRouter.defineRoute('/tax-app/search',SearchPage,'React search page');
PageRouter.defineRoute('/tax-app/deals',SearchFieldsPage,'React hot deals page');
PageRouter.defineRoute('/tax-app/checkout',PaymentPage,'Checkout page');
PageRouter.defineRoute('/tax-app/repeat',RepeaterPage,'Repeater page');
PageRouter.defineRoute('/tax-app/another',DemoPage2,'Another');

// PageRouter.defineRoute('/tax-app/code-split',CodeSplitPage1,'Code Split Test Page 1');

PageRouter.defineRoute('/tax-app/code-split',
    LazyPage({
        loader: () => import ('./pages/Code_Page_1' /* webpackChunkName: "CODE_PAGE_1" */),
        label: 'Loading the page'
    }),
    'Code Split Test Page 1'
);

PageRouter.defineRoute('/tax-app/code-split2',
    LazyPage({
        loader: () => import ('./pages/Code_Page_2' /* webpackChunkName: "CODE_PAGE_2" */),
        label: '加载条款和条件'
    }),
    'Code Split Test Page 2'
);

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
        console.log('APP RENDER', appCount);
        appCount++;
        if (appCount===1 || !window.currentLang) {
            changeLang(window.currentLang || 'en',null,() => this.setState({ w: 1 }));
            //return <div>Loding</div>;
            return null;
        }
        return <PageRouter/>
    }
}

let appCount = 0;

App.initialize = (fn) => {
    appCount++;
    changeLang('en',null,fn);
};

/*
    wrap with this to see warnings:
    <React.StrictMode>
*/
