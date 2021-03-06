import 'react-app-polyfill/ie11'; // has to be first
import React from 'react';
import ReactDOM from 'react-dom';
import './Fixers';
import './index.css';
// import {changeLang} from './languages';

// import registerServiceWorker from './registerServiceWorker';
import { unregister } from './registerServiceWorker';

import {Provider} from 'react-redux'
import store from './startRedux';
// this app
// import { setTranslator } from './components/AppConfig';
import App from './App';

// SET UP DEFAULTS
// setTranslator( translate );
//setGetOptionList( getOptionList );
//setGetOptionDescriptions( getOptionDescriptions );

// RENDER

const render = Root => {
    ReactDOM.render(
        <Provider store={store}><Root/></Provider>,
        document.getElementById('root')
    );
};

function onLoaded () {
    App.initialize( () => render(App) );
    const redirect = window.sessionStorage.getItem('redirect');
    if (redirect) {
        window.sessionStorage.removeItem('redirect');
        // window.location.replace(redirect);
        window.history.replaceState(null, '', redirect); // data, title, url
    }
}

onLoaded();

// set an initial language - could be from cookie, session state etc
// changeLang('en',null,() => render(App) );

// display the loader for 1/2 sec
//setTimeout( () => render(App), 500 );

// hot loading

if (process.env.NODE_ENV==='development') {
    if (module.hot) {
        module.hot.accept('./App', () => {
            //console.log('MOD HOT');
            const NextApp = require('./App').default;
            render(NextApp);
        });
    }
}

// PROGRESSIVE APP

// registerServiceWorker();
unregister();

// HACK
window.redux = store;

// TODO move elsewhere POSSIBLY TO APP
/*
function translate (t,required) {
    if (!t) return 'Undefined';
    if (t.error) {
        if (t.error==='minLength') return 'Please enter at least '+t.values.minLength+' characters for '+t.name;
        if (t.name==='langCode') {
            if (t.error==='required') return '这是一个非常长的文本行，必须包装在一个小显示器上。';
        }
        return t.path + '-' + t.name + '-' + t.error;
    }
    if (t.endsWith('-country-pleaseSelect')) return required ? 'Choose a country' : 'No country selected';
    if (t.endsWith('-lang-pleaseSelect')) return required ? 'Choose a language' : 'No language selected';
    if (t.endsWith('-gender-pleaseSelect')) return 'Please select a gender';
    if (t.endsWith('-gender-required')) return 'Please choose a gender';
    if (t.endsWith('-month-pleaseSelect')) return required ? 'MM' : 'MM';
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
    if (t.endsWith('-preferredRetireAge')) return <span>What is your preferred retirement age? <b>(optional)</b></span>;

    if (t.endsWith('-regNumber')) return 'Registration number and country';

    if (t.endsWith('-cardNumber')) return 'Payment card number';
    if (t.endsWith('-cvvNumber')) return 'CVV';
    if (t.endsWith('-nameOnCard')) return 'Name on card';

    if (t.endsWith('-emergencyPhone')) return 'Emergency contact number';
    if (t.endsWith('-faxNo')) return 'Fax number';

    const map = {
        personalRef: 'Enter your personal details',
        spouseRef: 'Enter your spouse details'
    };
    return map[t] || t;
}

function getOptionList (name) {
    const map = {
        yesNo: ['Y','N'],
        gender: ['M','F'],
        country: countryList, // ['GB','US','CN','BW','AR','BE','CH','FR','DE'],
        countryDefaults: ['GB','US','CN','BW','AR','BE','CH'],
        months: ['01','02','03','04','05','06','07','08','09','10','11','12'],
        languages: ['en','zh','fr','de','ru'],
        phoneCodes: ['1','1-C','44','86','47','33','356'],
        cashFrom: ['F','S','I','X']
    };
    return map[name] || ['Y','N'];
}

function getOptionDescriptions (name) {
    const map = {
        yesNo: { Y: 'Yes', N: 'No'},
        gender: { M: 'Male', F: 'Female'},
        // country: { GB: 'United Kingdom', US: 'United States', CN: 'China', BW: 'Botswana', AR: 'Argentina' },
        country,
        languages: { en: 'English', zh: 'Chinese', ru: 'Russian', fr: 'French', de: 'German' },
        phoneCodes: { '1': 'United States', '1-C': 'Canada', '44': 'United Kingdom', '86': 'China' ,'47': 'Norway', '33': 'France', '356': 'Malta' },
        cashFrom: {'F':'Family','S':'Savings','I':'Investments',X:'Other sources'}
    };
    return map[name] || {};
}
*/

// countries with translations
// https://github.com/umpirsky/country-list/tree/master/data
