//import { default as country } from './country.en';
import { default as country } from './country.de';
//import { default as country } from './country.zh_Hans';

const countryList = Object.keys(country);

// console.log(country);

const propertyTypeList = ['HOUSE','SEMI','TERRACE','VILLA','MANSION','FLAT','PLOT'];

export { country, countryList, propertyTypeList };
