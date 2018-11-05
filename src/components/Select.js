import React from "react";
import {translate, getOptionList, getOptionDescriptions} from './AppConfig';

export default function Select (props) {
    // console.log('SELECT',props);

    const {options, allowOption, rangeFrom, rangeTo, className, ...rest} = props;
    const {value, required, id} = props;

    const base = !!value ? 'custom-select' : 'custom-select no-value';
    const cnm = className ? base+' '+className : base;

    return (
        <select {...rest} className={cnm}>
            {(value==='' || value===undefined || required === false) &&
                <option value="">{translate(id + '-pleaseSelect', required)}</option>
            }
            {renderOptions(options, allowOption, props, rangeFrom, rangeTo)}
        </select>
    );
}

// render the array of <option> elements

function renderOptions (options, allowOption, props, rangeFrom, rangeTo) {

    if (!allowOption && statMap[options])
        return statMap[options];

    const opts = [];

    if (rangeFrom || rangeTo) {
        const d = rangeFrom<rangeTo ? 1 : -1;
        for (let n=rangeFrom;;n+=d) {
            opts.push(<option key={n} value={n}>{n}</option>);
            if (n===rangeTo) break;
        }
        return opts;
    }

    const list = getOptionList(options);
    const map = getOptionDescriptions(options);

    list.forEach(row => {
        if (!allowOption || allowOption(row, props))
            opts.push(<option key={row} value={row}>{map[row] || row}</option>);
    });

    if (!allowOption)
        statMap[options] = opts;

    return opts;
}

// useful
// https://stackoverflow.com/questions/5805059/how-do-i-make-a-placeholder-for-a-select-box

const statMap = {}; // TODO should be stored in language resources
