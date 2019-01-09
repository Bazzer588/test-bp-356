import { default as country } from './country.de.json';
import {setLangMap} from "../index";
import {translate} from "../engine";

export default {
    woot: 'de',
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
    yesNo: { Y: 'Ja', N: 'Nein'},
    gender: { M: 'Männlich', F: 'Weiblich'},
    country,
    languages: { en: 'Englisch', zh: 'Chinesisch', ru: 'Russisch', fr: 'Französisch', de: 'Deutsche', he: 'Hebräisch' },
    phoneCodes: { '1': 'United States', '1-C': 'Canada', '44': 'United Kingdom', '86': 'China' ,'47': 'Norway', '33': 'France', '356': 'Malta' },
    cashFrom: {'F':'Family','S':'Savings','I':'Investments',X:'Other sources'}
};

const labels = {
    pleaseSelect: {
        $: 'Bitte auswählen',
        $$: 'Optionale Auswahl'
    },
    // headings
    'Change Language': 'Sprache ändern',
    'Select your language': 'Wähle deine Sprache',
    'Home page title': 'Dies ist die Startseite',

    Gender: 'Geschlecht',
    gender: 'Geschlecht',
    firstName: 'Vorname',
    lastName: 'Nachname',
    homePhone: 'Haustelefon',
    mobilePhone: 'Handynummer',
    zipCode: 'Postleitzahl',

    country: 'Ursprungsland',
    username: 'Nutzername',
    emailAddress: 'Email addresse',
    taxRef: 'Steuernummer',
    findAirport: 'Name des Flughafens',

    AgeOfEldestChild: 'Age of Firstborn',
    preferredRetireAge: 'Bevorzugtes Rentenalter',
    parkingSpaces: 'Wie viele Parkplätze?',

    // buttons
    Continue: 'Fortsetzen',
    Cancel: 'Stornieren',

    month: {
        pleaseSelect: 'MM',
        required: '{f} Monat ist erforderlich',
        $: 'Monat'
    },
    year: 'Jahr',

    // fix, placeholders
    YYYY: 'JJJJ',
    MM: 'MM',
    DD: 'TT',

    // ------ errors ---------
    required: '{f} ist erforderlich',

};
