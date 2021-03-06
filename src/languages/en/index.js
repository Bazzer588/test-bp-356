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
    setLangMap(labels);
}

function getOptionDescriptions (name) {
    return options[name] || {};
}

const options = {
    country,
    yesNo: {
        Y: 'Yes',
        N: 'No'
    },
    gender: {
        M: 'Male',
        F: 'Female'
    },
    languages: {
        en: 'English',
        zh: 'Chinese',
        ru: 'Russian',
        fr: 'French',
        de: 'German',
        he: 'Hebrew (עברית)'},
    phoneCodes: {
        '1': 'United States',
        '1-C': 'Canada',
        '44': 'United Kingdom',
        '86': 'China',
        '47': 'Norway',
        '33': 'France',
        '356': 'Malta'
    },
    cashFrom: {
        'F': 'Family',
        'S': 'Savings',
        'I': 'Investments',
        X: 'Other sources'
    }
};

const labels = {
    pleaseSelect: {
        $: 'Please select',
        $$: 'Please select (optional)'
    },
    // headings
    personalRef: 'Enter your personal details',
    spouseRef: 'Enter your spouse details',
    homeAddress: 'Home address',
    overseasAddress: 'Overseas address',
    workAddress: 'Employment or work address',

    // labels
    'Please choose a file': 'Please choose a file',
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

    dob: 'Date of Birth',
    expiryDate: 'Contract expiry date',

    roomsRequired: {
        required: 'Please select the number of rooms required',
        $: 'Number of rooms required'
    },

    // multi fields
    dateInput: {
        day: '{f} day of month',
        month: '{f} month',
        year: '{f} year'
    },
    /*
    day: {
        $: 'day',
        required: '{f} day is required'
    },
    month: {
        $: 'month',
        pleaseSelect: 'MM',
        required: '{f} month is required'
    },
    year: {
        $: 'year',
        required: '{f} year is required'
    },
    */

    thingList: {
        cnid: 'Country of Thing',
        price: 'Price of Thing'
    },

    // app demo
    Application: 'Application',
    'Main Applicant': 'Main Applicant',
    'Secondary Applicant': 'Secondary Applicant',
    'Dependent Child': 'Dependent Child',
    'addApplicant': '+ Add another applicant',
    'addApplicant2': 'or a dependant or other involved party',

    // ------ errors ---------
    required: '{f} is required',
    minLength: '{f} must be at least {minLength} characters',
    errorMoreThan: '{f} must be more than {minValue}',
    // date errors
    invalidYear: '{f}, year is invalid',
    invalidMonth: '{f}, month is invalid',
    invalidDay: '{f}, day is invalid',
    invalidDayOfMonth: '{f}, day of month is invalid',
    dateNotInFuture: '{f} can not be a future date',
    dateNotInPast: '{f} can not be a date in the past',
    dateNotToday: '{f} can not be today\'s date',
};
