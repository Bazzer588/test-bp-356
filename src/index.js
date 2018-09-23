import React from 'react';
import ReactDOM from 'react-dom';
import './Fixers';
import './index.css';
import registerServiceWorker from './registerServiceWorker';
import {Provider} from 'react-redux'
import store from './startRedux';
// this app
import { setTranslator, setGetOptionList, setGetOptionDescriptions } from './components/AppConfig';
import PageRouter from './components/PageRouter';

import App from './App';
import HomePage from './pages/HomePage';
import SearchPage from './pages/SearchPage';

// SET UP DEFAULTS
setTranslator( translate );
setGetOptionList( getOptionList );
setGetOptionDescriptions( getOptionDescriptions );

PageRouter.defineRoute('/',HomePage);
PageRouter.defineRoute('/tax-app',HomePage);
PageRouter.defineRoute('/tax-app/search',SearchPage);
//PageRouter.defineRoute(() => {},'search');

// RENDER

const render = Root => {
    ReactDOM.render(
        <Provider store={store}><Root/></Provider>,
        document.getElementById('root')
    );
};

render(App);

if (module.hot) {
    module.hot.accept('./App', () => {
        const NextApp = require('./App').default;
        render(NextApp);
    });
}

// PROGRESSIVE APP

registerServiceWorker();

// TODO move elsewhere

function translate (t,required) {
    if (t.endsWith('country-pleaseSelect')) return required ? 'Choose a country' : 'No country selected';
    if (t.endsWith('gender-pleaseSelect')) return 'Please select a gender';
    if (t.endsWith('-address1')) return 'First line of address';
    if (t.endsWith('-address2')) return 'Second line of address';
    if (t.endsWith('-city')) return 'City';
    if (t.endsWith('-region')) return 'State or Province';
    if (t.endsWith('-country')) return 'Country';
    if (t.endsWith('-zipCode')) return 'Zip code';
    if (t.endsWith('-firstName')) return 'First name';
    if (t.endsWith('-lastName')) return 'Surname';
    if (t.endsWith('-taxRef')) return 'Tax Reference Number';
    if (t.endsWith('-username')) return 'User name';
    if (t.endsWith('-gender')) return 'Gender';
    if (t.endsWith('-homePhone')) return 'Home telephone';
    if (t.endsWith('-mobilePhone')) return 'Mobile phone';
    if (t.endsWith('-emailAddress')) return 'Email address';
    const map = {
        personalRef: 'Your personal details',
        spouseRef: 'Your spouse details'
    };
    return map[t] || t;
}

function getOptionList (name) {
    const map = {
        gender: ['M','F'],
        country: ['GB','US','CN','BW','AR'],
        months: ['01','02','03','04','05','06','07','08','09','10','11','12']
    };
    return map[name] || ['Y','N'];
}

function getOptionDescriptions (name) {
    const map = {
        gender: { M: 'Male', F: 'Female'},
        country: { GB: 'United Kingdom', US: 'United States', CN: 'China', BW: 'Botswana', AR: 'Argentina' }
    };
    return map[name] || {};
}
