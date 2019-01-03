import { default as country } from './country.de.json';

export default {
    woot: 'de',
    getOptionDescriptions,
    translate
};

function getOptionDescriptions (name) {
    const map = {
        yesNo: { Y: 'Ja', N: 'Nein'},
        gender: { M: 'Männlich', F: 'Weiblich'},
        country,
        languages: { en: 'Englisch', zh: 'Chinesisch', ru: 'Russisch', fr: 'Französisch', de: 'Deutsche', he: 'Hebräisch' },
        phoneCodes: { '1': 'United States', '1-C': 'Canada', '44': 'United Kingdom', '86': 'China' ,'47': 'Norway', '33': 'France', '356': 'Malta' },
        cashFrom: {'F':'Family','S':'Savings','I':'Investments',X:'Other sources'}
    };
    return map[name] || {};
}

function translate (t) {
    if (t.error) {
        return t.path + ' ' + t.name + ' ' + t.error + (t.values ? ' ('+JSON.stringify(t.values)+')' : '');
    }
    const w = std[t];
    if (w) return w;

    if (t==='Gender') return 'Geschlecht';
    if (t.endsWith('-gender')) return 'Geschlecht';
    if (t.endsWith('-firstName')) return 'Vorname';
    if (t.endsWith('-lastName')) return 'Nachname';
    if (t.endsWith('-homePhone')) return 'Haustelefon';
    if (t.endsWith('-mobilePhone')) return 'Handynummer';
    if (t.endsWith('-zipCode')) return 'Postleitzahl';

    if (t.endsWith('-country')) return 'Ursprungsland';
    if (t.endsWith('-username')) return 'Nutzername';
    if (t.endsWith('-emailAddress')) return 'Email addresse';
    if (t.endsWith('-taxRef')) return 'Steuernummer';
    if (t.endsWith('-findAirport')) return 'Name des Flughafens';

    if (t.endsWith('-AgeOfEldestChild')) return 'Age of Firstborn';
    if (t.endsWith('-preferredRetireAge')) return 'Bevorzugtes Rentenalter';
    if (t.endsWith('-parkingSpaces')) return 'Wie viele Parkplätze?';

    // buttons
    if (t==='Continue') return 'Fortsetzen';
    if (t==='Cancel') return 'Stornieren';
    return t;
}

const std = {
    'Change Language': 'Sprache ändern',
    'Select your language': 'Wähle deine Sprache',
    'Home page title': 'Dies ist die Startseite'
};
