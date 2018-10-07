import React from "react";
import {translate, getOptionList, getOptionDescriptions} from './AppConfig';

export default function Radios (props) {

    const {id, label} = props;

    return (
        <fieldset className="radio-fieldset" id={id}>
            <legend>{translate(label)}</legend>
            {renderOptions(props)}
        </fieldset>
    );
}

// render an array of radio buttons

function renderOptions (props) {

    const {options, allowOption, value, id, className} = props;

    const opts = [];

    const cnm = className==='horizontal' ? 'radio-horizontal' : 'radio';

    const list = getOptionList(options);
    const map = getOptionDescriptions(options);

    list.forEach(row => {
        if (!allowOption || allowOption(row, props)) {
            const radioId = id+'-'+row;  // ie 'form-section-gender-F'
            opts.push(
                <div className={cnm} key={radioId}>
                    <input
                        id={radioId}
                        name={id}
                        type="radio"
                        value={row}
                        checked={row===value}
                        aria-describedby={props['aria-describedby']}
                        onChange={props.onChange}
                        onBlur={props.onBlur}
                    />
                    <label htmlFor={radioId}>
                        {map[row] || row}
                    </label>
                </div>
            );
        }
    });

    return opts;
}
