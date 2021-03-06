import { default as country } from './country.he.json';
import {setLangMap} from "../index";
import {translate} from "../engine";

export default {
    woot: 'he',
    rtl: true,
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
    yesNo: { Y: 'כן', N: 'לא'},
    gender: { M: 'זכר', F: 'נקבה'},
    country,
    languages: { en: 'אנגלית (English)', zh: 'סינית (Chinese)', ru: 'רוסית (Russian)', fr: 'צרפתית', de: 'גרמנית', he: 'עברית (Hebrew)' },
    phoneCodes: { '1': 'United States', '1-C': 'Canada', '44': 'United Kingdom', '86': 'China' ,'47': 'Norway', '33': 'France', '356': 'Malta' },
    cashFrom: {'F':'Family','S':'Savings','I':'Investments',X:'Other sources'}
};

const labels = {
    pleaseSelect: {
        $: '(בבקשה תבחר)',
        $$: '(בחירה אופציונלית)'
    },
    // headings
    'Home page title': 'זהו דף הבית',
    'Search Page': 'דף חיפוש',
    'Home Page': 'דף הבית',
    'Search': 'לחפש',
    'Checkout': 'לבדוק',
    personalRef: 'פרטים אישיים',
    spouseRef: 'פרטים על בני זוג',
    // labels
    'Gender': 'מין',
    'Continue': 'המשך',
    'Cancel': 'בטל',
    'Change Language': 'שנה שפה',
    'Select your language': 'בחר את השפה שלך',
    homeAddress: 'כתובת בית',

    taxRef: 'הפניה למס',
    gender: 'מין',
    firstName: 'שם פרטי',
    lastName: 'שם משפחה',
    country: 'מדינה',
    zipCode: 'מיקוד',
    homePhone: 'טלפון בבית',
    mobilePhone: 'טלפון נייד',
    emailAddress: 'כתובת דוא"ל',

    nameOnCard: 'Имя на платежной карте',
    findAirport: 'שם שדה התעופה',

    // ------ errors ---------
    required: 'נדרש {f}',
    minLength: '{f} חייב להיות לפחות {minLength} תווים',
};
