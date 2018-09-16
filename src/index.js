import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import registerServiceWorker from './registerServiceWorker';
import {Provider} from 'react-redux'
import store from './startRedux';
import { setTranslator } from './components/AppConfig';

// IE 11 rubbish

if (!String.prototype.endsWith) {
    String.prototype.endsWith = function(search, this_len) {    // eslint-disable-line
        if (this_len === undefined || this_len > this.length) {
            this_len = this.length;
        }
        return this.substring(this_len - search.length, this_len) === search;
    };
}

// SET UP DEFAULTS
setTranslator( translate );

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

// PROG

registerServiceWorker();

function translate (t,required) {
    if (t.endsWith('country-pleaseSelect')) return required ? 'Choose a country' : 'No country selected';
    if (t.endsWith('gender-pleaseSelect')) return 'Please select a gender';
    return t;
}
