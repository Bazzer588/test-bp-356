import React from "react";
import {translate, getOptionList, getOptionDescriptions} from './AppConfig';
import validateString from "../validation/validateString";

export default function Select (props) {
    // console.log('SELECT',props);

    const {options, allowOption, rangeFrom, rangeTo, className, excludeValues, showCode, ...rest} = props;
    const {defaultValue, value, required, id} = props;
    const actual = value || defaultValue;

    const base = !!actual ? 'custom-select' : 'custom-select no-value';
    const cnm = className ? base+' '+className : base;

    return (
        <select {...rest} className={cnm}>
            {(actual==='' || actual===undefined || required === false) &&
                <option value="">{translate(id + '-pleaseSelect', props)}</option>
            }
            {renderOptions(options, allowOption, props, rangeFrom, rangeTo, excludeValues, showCode)}
        </select>
    );
}

// render the array of <option> elements

function renderOptions (options, allowOption, props, rangeFrom, rangeTo, excludeValues, showCode) {

    if (!excludeValues && !allowOption && statMap[options])
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
    const value = props.value;

    list.forEach(row => {
        if (!isExcluded(row,value,excludeValues))
            opts.push(
                <option key={row} value={row}>
                    {showCode ? map[row] +' ('+row+')' : map[row] || row}
                </option>
            );
    });

    //if (!excludeValues && !allowOption)
    //    statMap[options] = opts;

    return opts;
}

function isExcluded (val, current, excludeValues) {
    return excludeValues && val!==current && excludeValues.indexOf(val)>=0;
    //console.log('IEX',val,current,excludeValues,z);
    //return z;
}

// useful
// https://stackoverflow.com/questions/5805059/how-do-i-make-a-placeholder-for-a-select-box

const statMap = {}; // TODO should be stored in language resources

export const selectTypeField = (name,props) => { return { name, component: Select, ...props, validator: validateString } };
