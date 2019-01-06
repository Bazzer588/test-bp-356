import { default as country } from './country.he.json';

export default {
    woot: 'he',
    rtl: true,
    getOptionDescriptions,
    translate
};

const map = {
    yesNo: { Y: 'כן', N: 'לא'},
    gender: { M: 'זכר', F: 'נקבה'},
    country,
    languages: { en: 'אנגלית (English)', zh: 'סינית (Chinese)', ru: 'רוסית (Russian)', fr: 'צרפתית', de: 'גרמנית', he: 'עברית (Hebrew)' },
    phoneCodes: { '1': 'United States', '1-C': 'Canada', '44': 'United Kingdom', '86': 'China' ,'47': 'Norway', '33': 'France', '356': 'Malta' },
    cashFrom: {'F':'Family','S':'Savings','I':'Investments',X:'Other sources'}
};

function getOptionDescriptions (name) {
    return map[name] || {};
}

function translate (t) {
    if (!t)
        return t;
    if (t.error) {
        return t.path + ' ' + t.name + ' ' + t.error + (t.values ? ' ('+JSON.stringify(t.values)+')' : '');
    }
    const w = std[t];
    if (w)
        return w;

    if (t.endsWith('-gender')) return 'מין';
    if (t.endsWith('-firstName')) return 'שם פרטי';
    if (t.endsWith('-lastName')) return 'שם משפחה';
    if (t.endsWith('-country')) return 'מדינה';
    if (t.endsWith('-zipCode')) return 'מיקוד';
    if (t.endsWith('-homePhone')) return 'טלפון בבית';
    if (t.endsWith('-mobilePhone')) return 'טלפון נייד';
    if (t.endsWith('-emailAddress')) return 'כתובת דוא"ל';

    if (t.endsWith('-nameOnCard')) return 'Имя на платежной карте';
    if (t.endsWith('-findAirport')) return 'Название аэропорта';

    return t;
}

const std = {
    'Gender': 'מין',
    'Continue': 'המשך',
    'Cancel': 'בטל',
    'Change Language': 'שנה שפה',
    'Select your language': 'בחר את השפה שלך',
    'Home page title': 'זהו דף הבית'
};
