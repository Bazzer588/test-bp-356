import React from 'react';
import {translate} from './AppConfig';

export default function FieldSet (props) {

    return (
        <fieldset className="form-fieldset">
            <legend aria-label={props['aria-label']}>{translate(props.name)}</legend>
            {props.children}
        </fieldset>
    );
}
