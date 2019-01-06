import React from "react";
import {translate} from "./AppConfig";

function MultiInput (props) {

    //console.log('Multi',props);

    // typeName is used for copy, ie 'dateInput', 'currencyInput', 'hongKongId'
    const { inputs, id, onBlur, onChange, defaultField = 0, required, typeName } = props;
    const value = props.value || {}; // value may be '' which breaks IE11

    const onPartChange = (name) => (ev) => {
        onChange({ target: { value: { ...value, [name]: ev.target.value } } });
    };

    return (
        <div>
            {inputs.reduce( (acc,item,index) => {
                const { name, component, validator, span, ariaLabel, ...rest } = item;
                const Compo = component || 'input';
                const type = component ? undefined : 'text';
                const key = id+'-'+name;
                const full = index === defaultField ? id : key;
                const label = id + '-' + typeName + '-' + name + '-ariaLabel';
                acc.push(
                    <span style={{ display: 'inline-block', verticalAlign: 'top', marginLeft: index ? '-1px' : undefined }} key={key} {...span}>
                        <Compo
                            aria-describedby={props['aria-describedby']} // main props not item
                            aria-invalid={props['aria-invalid']}
                            aria-label={translate(label,props)}
                            {...rest}
                            id={full}
                            value={value[name]}
                            onBlur={onBlur}
                            onChange={onPartChange(name)}
                            required={required}
                            type={type}
                        />
                    </span>
                );
                return acc;
            },[])}
        </div>
    );
}

function validator (value, props, path, output) {
    if (!value) value = {};
    const { inputs, name, defaultField = 0, required, nextValidator } = props;
    const out = {};
    let err = undefined;
    inputs.forEach( (item,index) => {
        const fld = item.name;
        const r = item.validator( value[fld], { ...item, required }, path+'-'+name, out );
        if (r && r.error && !err) {
            if (index===defaultField) r.linkToPath = true;
            r.errorFieldName = name;
            //console.log('GOTATTA',r);
            err = r;
        }
    });
    if (!err && nextValidator) {
        // nextValidator(out,props,path); // ????
    }
    if (output) {
        output[name] = out;
    }
    return err;
}

export default function makeMultiInput (name, props) {
    return { name, ...props, validator, component: MultiInput };
}

/*
    typeName: 'dateInput'
    id: 'form2-paymentMethod-expiryDate'
    inputs[0].name: 'day'
    inputs[1].name: 'month'
    inputs[2].name: 'year'

    aria-label: 'Policy expiry date: select a month'        {f}: select a month
    aria-label: 'Policy expiry date: please enter a year'   {f}: please enter a year

    error: 'Please enter a future date'
    error: 'Please enter a valid day of month'

    -------------

    aria-label: 'ID number: part one'
    aria-label: 'ID number: part two'

 */
