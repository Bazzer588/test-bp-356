import React from "react";
import Select from "../components/Select";
import validateString from "../validation/validateString";

function validateCombo (value, props, path, output) {
    if (!value) value = {};
    const { name, required, minLength, maxLength } = props;
    const x = validateString(value.country, { name, required }, path, output);
    if (x && x.error) {
        x.part = 'country';
        return x;
    }
    const r = validateString(value.phone, { name, required, minLength, maxLength }, path, output); // only pass input props
    // if (r && r.error) r.part = 'phone';
    return r;
}

export const comboTypeField = (name,props) => { return { name, ...props, validator: validateCombo, component: ComboField } };

function ComboField (props) {

    const value = props.value || {}; // value may be '' which breaks IE11
    const { id, onChange, onBlur, options, minLength, maxLength, required } = props;
    const defs = { required, 'aria-describedby': props['aria-describedby'] };

    /*const onSelectChange = (ev) => {
        const country = ev.target.value;
        onChange({ target: { value: { ...value, country } } });
    };

    const onInputChange = (ev) => {
        const phone = ev.target.value;
        onChange({ target: { value: { ...value, phone } } });
    };*/

    const onPartChange = (item) => (ev) => {
        onChange({ target: { value: { ...value, [item]: ev.target.value } } });
    };

    let timer;

    function onBlurField (ev) {
        timer = handleBlur(ev,id,onBlur);
    }

    function onFocusField () {
        clearTimeout(timer);
    }

    return (
        <div>
            <span style={{ display: 'inline-block', verticalAlign: 'top', marginRight: '10px' }} >
                <Select value={value.country || ''} onChange={onPartChange('country')} onBlur={onBlurField} onFocus={onFocusField} id={id+'-country'} options={options} {...defs}/>
            </span>
            <span style={{ display: 'inline-block', verticalAlign: 'top' }} >
                <input value={value.phone || ''} onChange={onPartChange('phone')} onBlur={onBlurField} onFocus={onFocusField} id={id} type="text" minLength={minLength} maxLength={maxLength} {...defs}/>
            </span>
        </div>
    );
}

function handleBlur (ev, id, onBlur) {
    const elem = ev.relatedTarget || document.activeElement;
    if (elem && elem.id) {
        if (!(elem.id===id || elem.id.startsWith(id+'-'))) {
            onBlur();
        }
        return;
    }
    // use a timer allows cancel of blur
    return setTimeout(onBlur,25);
}
