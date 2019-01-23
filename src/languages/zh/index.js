import {default as country} from './country.zh_Hans';
import {setLangMap} from "../index";
import {translate} from "../engine";

export default {
    woot: 'zh',
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
    cashFrom: {
        'F': 'Family',
        'S': 'Savings',
        'I': 'Investments',
        X: 'Other sources'
    }
};

const labels = {
    pleaseSelect: {
        $: '(请选择）',
        $$: '(可选）'
    },
    // headings
    'personalRef': '输入您的个人信息',
    spouseRef: '配偶细节',
    'Home page title': '这是主页',
    'Search Page': '第二页申请',
    'Home Page': '主页',
    'Search': '搜索',
    'Checkout': '查看',

    homeAddress: '家庭地址',
    overseasAddress: '海外地址',
    workAddress: '就业或工作地址',

    // labels
    'Please choose a file': '请选择一个文件',
    address1: '第一行地址',
    address2: '第二行地址',
    city: '市',
    region: '州或省',
    country: '国家',
    zipCode: '邮政编码/邮政编码',
    firstName: '名字',
    lastName: '姓',

    taxRef: '税号',
    username: '用户名',
    Gender: '性别',
    gender: '性别',
    homePhone: '家庭电话',
    mobilePhone: '移动电话',
    emailAddress: '电子邮件',

    carsInHouse: '你家里的汽车',
    preferredRetireAge: '首选退休年龄',
    destination: '目的地',
    alternate: '替代目的地',

    'Continue': '继续',
    'Cancel': '取消',
    'Change Language': '改变语言',
    'Select your language': '选择你的语言',

    dob: '出生日期',
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
        required: '{f} 年份是必需的',
        minLength: '{f} year of 4 chars please'
    },

    thingList: {
        cnid: 'Country of Thing',
        price: 'Price of Thing'
    },

    // ------ errors ---------
    required: '{f} 是必须的',
    minLength: '{f}必须至少为{minLength}个字符',
    errorMoreThan: '{f} must be more than {value}',
    errorLessThan: '{f} must be less than {value}',
    // date errors
    invalidYear: '{f}, year is invalid',
    invalidMonth: '{f}, month is invalid',
    invalidDay: '{f}, day is invalid',
    invalidDayOfMonth: '{f}，月份日期无效',
    dateNotInFuture: '{f} can not be a future date',
    dateNotInPast: '{f}不能是过去的日期',
    dateNotToday: '{f}不能是今天的日期',

    // fix, placeholders
    YYYY: '年(数字)',
    MM: '月',
    DD: '天'
};
