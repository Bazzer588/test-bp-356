import { default as country } from './country.ru.json';
import {setLangMap} from "../index";
import {translate} from "../engine";

export default {
    woot: 'ru',
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
    yesNo: { Y: 'да', N: 'нет'},
    gender: { M: 'мужчина', F: 'женский'},
    country,
    languages: { en: 'английский', zh: 'китайский язык', ru: 'русский', fr: 'Французский', de: 'Немецкий', he: 'иврит (עברית)' },
    phoneCodes: { '1': 'United States', '1-C': 'Canada', '44': 'United Kingdom', '86': 'China' ,'47': 'Norway', '33': 'France', '356': 'Malta' },
    cashFrom: {'F':'Family','S':'Savings','I':'Investments',X:'Other sources'}
};

const labels = {
    pleaseSelect: {
        $: 'Пожалуйста выберите',
        $$: '(необязательный выбор)'
    },
    // headings
    'Home page title': 'Это домашняя страница',
    'Search Page': 'Страница поиска',
    'Home Page': 'Главная страница',
    'Search': 'Поиск',
    'Checkout': 'покупка',
    personalRef: 'Персональные данные',
    spouseRef: 'Детали супруга',

    taxRef: 'Налоговый номер',
    username: 'имя пользователя',
    gender: 'Пол',
    firstName: 'имя',
    lastName: 'Фамилия',
    country: 'Страна',
    zipCode: 'почтовый индекс',
    homePhone: 'Домашний телефон',
    mobilePhone: 'Мобильный телефон',
    emailAddress: 'Адрес электронной почты',

    nameOnCard: 'Имя на платежной карте',
    findAirport: 'Название аэропорта',

    'Gender': 'Пол',
    'Continue': 'Продолжить',
    'Cancel': 'отменить',
    'Change Language': 'изменение языка',
    'Select your language': 'Выберите ваш язык',

    // ------ errors ---------
    required: '{f} требуется',
    errorNoFuture: '{f} can not be a future date',
    errorNoPast: '{f} must be a date in the future',
    minLength: '{f} must be at least {minLength} characters',
    errorMoreThan: '{f} must be more than {minValue}',

    // fix, placeholders
    YYYY: 'год ГГГГ',
    MM: 'месяц',
    DD: 'день',
};
