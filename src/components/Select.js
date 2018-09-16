import React from "react";
import {translate} from './AppConfig';

function getOptionList (name) {
    const map = {
        gender: ['M','F'],
        country: ['GB','US','CN','BW','AR'],
        months: ['01','02','03','04','05','06','07','08','09','10','11','12']
    };
    return map[name] || ['Y','N'];
}

function getOptionDescriptions (name) {
    const map = {
        gender: { M: 'Male', F: 'Female'},
        country: { GB: 'United Kingdom', US: 'United States', CN: 'China', BW: 'Botswana', AR: 'Argentina' }
    };
    return map[name] || {};
}

// helper

function renderOptions (name,allowOption,props) {
    const list = getOptionList(name);
    const map = getOptionDescriptions(name);
    const opts = [];
    list.forEach( row => {
        if (!allowOption || allowOption(row,props))
            opts.push( <option key={row} value={row}>{map[row] || row}</option> );
    });
    return opts;
}

export default function Select (props) {
    //console.log('SELECT',props);

    const { options, allowOption, ...rest } = props;
    const { value, required, id } = props;
    const cnm = !!value ? 'custom-select' : 'custom-select no-value';

    return (
        <select {...rest} className={cnm}>
            {(!value || required===false) && <option value="">{translate(id+'-pleaseSelect',required)}</option>}
            {renderOptions(options,allowOption,props)}
        </select>
    );
}

// https://stackoverflow.com/questions/5805059/how-do-i-make-a-placeholder-for-a-select-box
