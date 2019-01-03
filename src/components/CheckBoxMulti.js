import React from "react";
import {translate, getOptionList, getOptionDescriptions} from './AppConfig';
import CheckBox from './CheckBox';

export default function CheckBoxMulti (props) {

    const {id, label} = props;

    return (
        <fieldset className="radio-fieldset" id={id}>
            <legend>{translate(label)}</legend>
            {renderOptions(props)}
        </fieldset>
    );
}

// render an array of checkboxes

function renderOptions (props) {

    const {options, allowOption, value = '', id, /*className,*/ afterRadio} = props;

    const opts = [];

    //const cnm = className==='horizontal' ? 'radio-horizontal' : 'radio';

    const list = getOptionList(options);
    const map = getOptionDescriptions(options);

    // console.log('CBM',value);
    const vals = value ? value.split('-') : [];

    list.forEach(row => {
        if (!allowOption || allowOption(row, props)) {
            const radioId = id+'-'+row;  // ie 'form-section-gender-F'

            const chg = (ev) => {
                const chk = ev.target.value;
                if (chk) vals.push(row);
                else vals.splice( vals.indexOf(row), 1 );
                vals.sort();
                props.onChange({ target: { value: vals.join('-') } })
            };

            opts.push(
                <CheckBox
                    id={radioId}
                    key={radioId}
                    label={map[row] || row}
                    onBlur={props.onBlur}
                    onChange={chg}
                    value={ vals.indexOf(row)>=0 }
                />
            );
            if (afterRadio) {  // render something after this radio
                const v = afterRadio(row);
                if (v) opts.push(v);
            }
        }
    });

    return opts;
}
