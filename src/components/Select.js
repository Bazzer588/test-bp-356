import React from "react";
import {translate, getOptionList, getOptionDescriptions} from './AppConfig';

// helper

function renderOptions (name, allowOption, props, rangeFrom, rangeTo) {
    const opts = [];

    if (rangeFrom || rangeTo) {
        const d = rangeFrom<rangeTo ? 1 : -1;
        for (let n=rangeFrom;;n+=d) {
            opts.push(<option key={n} value={n}>{n}</option>);
            if (n===rangeTo) break;
        }
        return opts;
    }

    const list = getOptionList(name);
    const map = getOptionDescriptions(name);
    list.forEach(row => {
        if (!allowOption || allowOption(row, props))
            opts.push(<option key={row} value={row}>{map[row] || row}</option>);
    });
    return opts;
}

export default function Select (props) {
    //console.log('SELECT',props);

    const {options, allowOption, rangeFrom, rangeTo, className, ...rest} = props;
    const {value, required, id} = props;
    const base = !!value ? 'custom-select' : 'custom-select no-value';
    const cnm = className ? base+' '+className : base;

    return (
        <select {...rest} className={cnm}>
            {(value==='' || value===undefined || required === false) && <option value="">{translate(id + '-pleaseSelect', required)}</option>}
            {renderOptions(options, allowOption, props, rangeFrom, rangeTo)}
        </select>
    );
}

// https://stackoverflow.com/questions/5805059/how-do-i-make-a-placeholder-for-a-select-box
