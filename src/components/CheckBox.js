import React from "react";
import {translate} from './AppConfig';

export default function ({ id, value, label, onChange, ...rest }) {

    return (
        <div className="checkbox">
            <input
                {...rest}
                checked={!!value}
                id={id}
                onChange={ () => onChange({ target: { value: !value } }) }
                type="checkbox"
            />
            <label htmlFor={id}>{translate(label)}</label>
        </div>
    );
}
