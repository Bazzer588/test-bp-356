import React from 'react';
import ReactDOM from 'react-dom';
import './Fixers';
import './index.css';
import registerServiceWorker from './registerServiceWorker';
import {Provider} from 'react-redux'
import store from './startRedux';
// this app
import { setTranslator, setGetOptionList, setGetOptionDescriptions } from './components/AppConfig';
import App from './App';

// SET UP DEFAULTS
setTranslator( translate );
setGetOptionList( getOptionList );
setGetOptionDescriptions( getOptionDescriptions );

// RENDER

const render = Root => {
    ReactDOM.render(
        <Provider store={store}><Root/></Provider>,
        document.getElementById('root')
    );
};

setTimeout( () => render(App), 500 );  // always display loader for 1 sec
// render(App);

if (module.hot) {
    module.hot.accept('./App', () => {
        console.log('MOD HOT');
        const NextApp = require('./App').default;
        render(NextApp);
    });
}

// PROGRESSIVE APP

registerServiceWorker();

// TODO move elsewhere POSSIBLY TO APP

function translate (t,required) {
    if (t.endsWith('country-pleaseSelect')) return required ? 'Choose a country' : 'No country selected';
    if (t.endsWith('gender-pleaseSelect')) return 'Please select a gender';
    if (t.endsWith('-pleaseSelect')) return required ? 'Please choose' : 'Not specified';

    if (t.endsWith('-address1')) return 'First line of address, for example house number and street';
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

    if (t.endsWith('-carsInHouse')) return 'How many cars are there in your household?';
    if (t.endsWith('-parkingSpaces')) return 'How many parking spaces do you have exclusive use of?';
    if (t.endsWith('-preferredRetireAge')) return 'What is your preferred retirement age?';
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

// countries with translations
// https://github.com/umpirsky/country-list/tree/master/data
