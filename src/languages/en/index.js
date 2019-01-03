import React from 'react';
import { default as country } from './country.en.json';
import {setLangMap} from "../index";
import {translate} from "../engine";

export default {
    woot: 'en',
    getOptionDescriptions,
    translate,
    init
};

function init () {
    setLangMap(std);
}

const map = {
    yesNo: { Y: 'Yes', N: 'No'},
    gender: { M: 'Male', F: 'Female'},
    country,
    languages: { en: 'English', zh: 'Chinese', ru: 'Russian', fr: 'French', de: 'German', he: 'Hebrew (עברית)' },
    phoneCodes: { '1': 'United States', '1-C': 'Canada', '44': 'United Kingdom', '86': 'China' ,'47': 'Norway', '33': 'France', '356': 'Malta' },
    cashFrom: {'F':'Family','S':'Savings','I':'Investments',X:'Other sources'}
};

function getOptionDescriptions (name) {
    return map[name] || {};
}
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

    const w = std[t];
    if (w) return w;

    if (t.indexOf('-')>0) {
        const a = t.split('-');
        const x = a[a.length-1];
        //console.log('TRA',x,a);
        if (required) {
            return std[x] || t;
        }
        // optional...
        const v = opt[x] || std[x] || t;
        if ((typeof v) !== 'string')
            console.log('TXX',t, typeof v, React.isValidElement(v), v);
        return v;
    }

    if (t.endsWith('-country-pleaseSelect')) return required ? 'Choose a country' : 'No country selected';
    if (t.endsWith('-lang-pleaseSelect')) return required ? 'Choose a language' : 'No language selected';
    if (t.endsWith('-gender-pleaseSelect')) return 'Please select a gender';
    if (t.endsWith('-gender-required')) return 'Please choose a gender';
    if (t.endsWith('-month-pleaseSelect')) return required ? 'MM' : 'MM';
    if (t.endsWith('-pleaseSelect')) return required ? 'Please choose' : 'Not specified';

    return t;
}

function floop (dict, names, index) {
    const name = names[index];
    if (name) {
        const thing = dict[name];
        if (thing) {
            if (index===names.length-1)
                return thing;
            const it = floop(thing,names,index+1);
            if (it)
                return it;
        }
        return floop(dict,names,index+1);
    }
}
*/
const std = {
    pleaseSelect: {
        $: 'Please select',
        $$: 'Please select (optional)'
    },
    // headings
    personalRef: 'Enter your personal details',
    spouseRef: 'Enter your spouse details',
    homeAddress: 'Home address',
    overseasAddress: 'Overseas address',
    // labels
    address1: 'First line of address, for example house number and street',
    address2: 'Second line of address',
    city: 'City',
    region: 'State or Province',
    country: 'Country',
    zipCode: 'Zip code',
    firstName: 'First name',
    lastName: 'Surname',
    taxRef: 'Tax Reference Number',
    username: 'User name',
    gender: 'Gender',
    homePhone: 'Home telephone',
    mobilePhone: 'Mobile phone',
    emailAddress: 'Email address',

    carsInHouse: 'How many cars are there in your household?',
    parkingSpaces: 'How many parking spaces do you have exclusive use of?',

    regNumber:'Registration number and country',

    cardNumber:'Payment card number',
    cvvNumber:'CVV',
    nameOnCard:'Name on card',

    emergencyPhone:'Emergency contact number',
    faxNo:'Fax number',
    preferredRetireAge: {
        $: 'Pref ret age',
        $$: <span>What is your preferred retirement age? <b>(optional)</b></span>
    },

    dob: 'DOB',

    roomsRequired: {
        required: 'Please select the number of rooms required',
        $: 'Number of rooms required'
    },

    month: {
        $: 'month',
        pleaseSelect: 'MM',
        required: '{f} month is required'
    },
    thingList: {
        cnid: 'Country of Thing',
        price: 'Price of Thing'
    },

    // ------ errors ---------
    required: '{f} is required',
    errorNoFuture: '{f} can not be a future date',
    errorNoPast: '{f} must be a date in the future',
    minLength: '{f} must be at least {minLength} characters',
    errorMoreThan: '{f} must be more than {minValue}',
};

/*
const opt = {
    pleaseSelect: 'Not specified',
    preferredRetireAge: <span>What is your preferred retirement age? <b>(optional)</b></span>
};
*/
