import { default as country } from './country.zh_Hans';

export default {
    woot: 'zh',
    getOptionDescriptions,
    translate
};

function getOptionDescriptions (name) {
    const map = {
        yesNo: { Y: '是', N: '没有'},
        gender: { M: '男', F: '女'},
        // country: { GB: 'United Kingdom', US: 'United States', CN: 'China', BW: 'Botswana', AR: 'Argentina' },
        country,
        languages: {en: '英语 (English)', zh: '中文 (Chinese)', ru: '俄语 (Russian)', fr: '法国 (French)', de: '德语 (German)', he: '希伯来语 (Hebrew)'},
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

    //console.log('ZH trans',t);
    if (t==='Gender') return '性别';
    if (t.endsWith('-gender')) return '性别';
    if (t.endsWith('-firstName')) return '名字';
    if (t.endsWith('-lastName')) return '姓';
    if (t.endsWith('-country')) return '国家';
    if (t.endsWith('-zipCode')) return '邮政编码/邮政编码';

    if (t.endsWith('-taxRef')) return '税号';

    if (t.endsWith('-destination')) return '目的地';
    if (t.endsWith('-alternate')) return '替代目的地';

    return t;
}

const std = {
    'Continue': '继续',
    'Cancel': '取消',
    'Change Language': '改变语言',
    'Select your language': '选择你的语言',
    // headings etc
    'personalRef': '输入您的个人信息',
    'Home page title': '这是主页'
};
