import {setGetOptionDescriptions, setGetOptionList, setTranslator} from '../components/AppConfig';
// import RU from './ru';
import {setLangMap} from './engine';

export {setLangMap};

/** call a module loader for a language */

function getLoader (lang) {
    const map = {
        en: () => import ('./en' /* webpackChunkName: "lang_en" */ ),
        de: () => import ('./de' /* webpackChunkName: "lang_de" */ ),
        // ru: () => Promise.resolve({ default: RU }), // import ('./ru' /* webpackChunkName: "lang_ru" */ ),
        ru: () => import ('./ru' /* webpackChunkName: "lang_ru" */ ),
        zh: () => import ('./zh' /* webpackChunkName: "lang_zh" */ ),
        fr: () => import ('./he' /* webpackChunkName: "lang_he" */ ),
        he: () => import ('./he' /* webpackChunkName: "lang_he" */ ),
    };
    const lod = map[lang] || map['en'];
    return lod();
}

/** called at startup and when changing language */

export function changeLang (lang, page, fn) {
    getLoader(lang)
        .then( module => {
            const tra = module.default;
            console.log('LANGUAGE LOADED',lang,tra);
            if (page) page.setLoader(null);
            // set it up
            optionLists.country = Object.keys( tra.getOptionDescriptions('country') );
            // set app
            if (tra.init) tra.init();
            setGetOptionDescriptions( tra.getOptionDescriptions );
            setGetOptionList(getOptionList);
            setTranslator(tra.translate);
            // trigger change
            window.currentLang = lang;
            fn();
            // is this language rtl ?
            if (tra.rtl) document.body.classList.add('forms-rtl');
            else document.body.classList.remove('forms-rtl');
        })
        .catch( e => {
            console.log(e);
            if (page) page.setLoader(null);
        });
}

/** all option lists used by the app */

const optionLists = {
    yesNo: ['Y','N'],
    gender: ['M','F'],
    // country: countryList, // ['GB','US','CN','BW','AR','BE','CH','FR','DE'],
    countryDefaults: ['GB','US','CN','BW','AR','BE','CH'],
    months: ['01','02','03','04','05','06','07','08','09','10','11','12'],
    languages: ['en','zh','fr','de','ru','he'],
    phoneCodes: ['1','1-C','44','86','47','33','356'],
    cashFrom: ['F','S','I','X'],
    propertyTypeList: ['HOUSE','SEMI','TERRACE','VILLA','MANSION','FLAT','PLOT'],
    currency: ['USD','GBP','EUR','CNY','JPY','CAD']
};

/** called by Select, Radios etc */

function getOptionList (name) {
    return optionLists[name] || optionLists.yesNo;
}

/**
// countries with translations
// https://github.com/umpirsky/country-list/tree/master/data
*/
