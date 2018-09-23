import React from 'react';
import {translate} from './AppConfig';

export default function FieldSet ({ name, children }) {

    return (
        <fieldset className="form-fieldset">
            <legend>{translate(name)}</legend>
            {children}
        </fieldset>
    );
}
