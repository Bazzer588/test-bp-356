import React from "react";

function getOptionList (name) {
    const map = {
        gender: ['M','F'],
        country: ['GB','US','CN']
    };
    return map[name] || ['Y','N'];
}

function getOptionDescriptions (name) {
    const map = {
        gender: { M: 'Male', F: 'Female'},
        country: { GB: 'United Kingdom', US: 'United States', CN: 'China' }
    };
    return map[name] || {};
}

// helper

function getOptions (name,allowOption,props) {
    const list = getOptionList(name);
    const map = getOptionDescriptions(name);
    const opts = [];
    list.forEach( row => {
        if (!allowOption || allowOption(row,props))
            opts.push( <option key={row} value={row}>{map[row] || row}</option> );
    });
    return opts;
}

export default function Select ({ options, ...props }) {
    console.log('SELECT',props);

    const required = props.required;

    return (
        <select {...props} className="custom-select">
            {(!props.value || required===false) && <option>Please select a {options}</option>}
            {getOptions(options)}
        </select>
    );
    /*
    if (options==='country') {
        return (
            <select {...props} className="custom-select">
                {!props.value && <option>Please select a country</option>}
                <option value="GB">United Kingdom</option>
                <option value="US">United States</option>
                <option value="CN">China</option>
            </select>
        );
    }
    return (
        <select {...props} className="custom-select">
            {!props.value && <option>Please select a gender</option>}
            <option value="M">Male</option>
            <option value="F">Female</option>
        </select>
    );
    */
}
