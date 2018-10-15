import React from "react";
import {translate} from './AppConfig';

export default function CheckBox ({ id, value, label, onChange, className = 'checkbox', ...rest }) {

    //function onClick () {
    //    document.getElementById(id).focus();
    //}

    return (
        <div className={className}>
            <input
                {...rest}
                checked={!!value}
                id={id}
                onChange={ () => onChange({ target: { value: !value } }) }
                onClick={onClickRadio}
                type="checkbox"
            />
            <label htmlFor={id}>{translate(label)}</label>
        </div>
    );
}

function onClickRadio (ev) {
    ev.target.focus();
}

/*
    checked is set if the value passed in is truthy

    onChange is called with a boolean target.value

    required is not set, due to warning:
    The attribute aria-required is not supported by the role checkbox. This role is implicit on the element input  jsx-a11y/role-supports-aria-props

*/
