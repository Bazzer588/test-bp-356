import React from "react";
import {translate} from './AppConfig';

export default function (props) {

    const { id, value, label, onChange, ...rest } = props;

    return (
        <span className="checkbox">
            <input
                {...rest}
                checked={!!value}
                id={id}
                onChange={ () => onChange({ target: { value: !value } }) }
                type="checkbox"
            />
            <label htmlFor={id}>{translate(label)}</label>
        </span>
    );
}
