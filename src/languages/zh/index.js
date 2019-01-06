import {default as country} from './country.zh_Hans';
import {setLangMap} from "../index";
import {translate} from "../engine";

export default {
    woot: 'zh',
    getOptionDescriptions,
    translate,
    init
};

function init() {
    setLangMap(labels);
}

function getOptionDescriptions(name) {
    return options[name] || {};
}

const options = {
    country,
    yesNo: {Y: '是', N: '没有'},
    gender: {M: '男', F: '女'},
    // country: { GB: 'United Kingdom', US: 'United States', CN: 'China', BW: 'Botswana', AR: 'Argentina' },
    languages: {
        en: '英语 (English)',
        zh: '中文 (Chinese)',
        ru: '俄语 (Russian)',
        fr: '法国 (French)',
        de: '德语 (German)',
        he: '希伯来语 (Hebrew)'
    },
    phoneCodes: {
        '1': 'United States',
        '1-C': 'Canada',
        '44': 'United Kingdom',
        '86': 'China',
        '47': 'Norway',
        '33': 'France',
        '356': 'Malta'
    },
    cashFrom: {'F': 'Family', 'S': 'Savings', 'I': 'Investments', X: 'Other sources'}
};

const labels = {
    pleaseSelect: {
        $: '(请选择）',
        $$: '(可选）'
    },
    // headings
    'personalRef': '输入您的个人信息',
    'Home page title': '这是主页',
    // labels
    country: '国家',
    zipCode: '邮政编码/邮政编码',
    Gender: '性别',
    gender: '性别',
    firstName: '名字',
    lastName: '姓',

    taxRef: '税号',

    destination: '目的地',
    alternate: '替代目的地',

    'Continue': '继续',
    'Cancel': '取消',
    'Change Language': '改变语言',
    'Select your language': '选择你的语言',

    dob: 'Date of Birth',
    expiryDate: '合同到期日',

    roomsRequired: {
        required: 'Please select the number of rooms required',
        $: 'Number of rooms required'
    },

    day: {
        $: '天',
        required: '{f} 一天是必需的'
    },
    month: {
        $: '月',
        pleaseSelect: '月',
        required: '{f} 一个月是必需的'
    },
    year: {
        $: '年',
        required: '{f} 年份是必需的'
    },

    thingList: {
        cnid: 'Country of Thing',
        price: 'Price of Thing'
    },

    // ------ errors ---------
    required: '{f} 是必须的 *',
    errorNoFuture: '{f} can not be a future date',
    errorNoPast: '{f} must be a date in the future',
    minLength: '{f} must be at least {minLength} characters',
    errorMoreThan: '{f} must be more than {minValue}',

    // fix
    YYYY: '年（数字）'
};
