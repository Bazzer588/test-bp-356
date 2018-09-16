import React from "react";
import {translate, getOptionList, getOptionDescriptions} from './AppConfig';

// helper

function renderOptions (name, allowOption, props) {
    const list = getOptionList(name);
    const map = getOptionDescriptions(name);
    const opts = [];
    list.forEach(row => {
        if (!allowOption || allowOption(row, props))
            opts.push(<option key={row} value={row}>{map[row] || row}</option>);
    });
    return opts;
}

export default function Select (props) {
    //console.log('SELECT',props);

    const {options, allowOption, ...rest} = props;
    const {value, required, id} = props;
    const className = !!value ? 'custom-select' : 'custom-select no-value';

    return (
        <select {...rest} className={className}>
            {(!value || required === false) && <option value="">{translate(id + '-pleaseSelect', required)}</option>}
            {renderOptions(options, allowOption, props)}
        </select>
    );
}

// https://stackoverflow.com/questions/5805059/how-do-i-make-a-placeholder-for-a-select-box
