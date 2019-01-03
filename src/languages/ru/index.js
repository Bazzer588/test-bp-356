import { default as country } from './country.ru.json';

export default {
    woot: 'ru',
    getOptionDescriptions,
    translate
};

const map = {
    yesNo: { Y: 'да', N: 'нет'},
    gender: { M: 'мужчина', F: 'женский'},
    country,
    languages: { en: 'английский', zh: 'китайский язык', ru: 'русский', fr: 'Французский', de: 'Немецкий' },
    phoneCodes: { '1': 'United States', '1-C': 'Canada', '44': 'United Kingdom', '86': 'China' ,'47': 'Norway', '33': 'France', '356': 'Malta' },
    cashFrom: {'F':'Family','S':'Savings','I':'Investments',X:'Other sources'}
};

function getOptionDescriptions (name) {
    return map[name] || {};
}

function translate (t) {
    //if (!t) return 'Undefined';
    if (t.error) {
        return t.path + ' ' + t.name + ' ' + t.error + (t.values ? ' ('+JSON.stringify(t.values)+')' : '');
    }
    const w = std[t];
    if (w)
        return w;

    if (t.endsWith('-gender')) return 'Пол';
    if (t.endsWith('-firstName')) return 'имя';
    if (t.endsWith('-lastName')) return 'Фамилия';
    if (t.endsWith('-country')) return 'Страна';
    if (t.endsWith('-zipCode')) return 'почтовый индекс';
    if (t.endsWith('-homePhone')) return 'Домашний телефон';
    if (t.endsWith('-mobilePhone')) return 'Мобильный телефон';
    if (t.endsWith('-emailAddress')) return 'Адрес электронной почты';

    if (t.endsWith('-nameOnCard')) return 'Имя на платежной карте';
    if (t.endsWith('-findAirport')) return 'Название аэропорта';

    return t;
}

const std = {
    'Gender': 'Пол',
    'Continue': 'Продолжить',
    'Cancel': 'отменить',
    'Change Language': 'изменение языка',
    'Select your language': 'Выберите ваш язык',
    'Home page title': 'Это домашняя страница'
};
