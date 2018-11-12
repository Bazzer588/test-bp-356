import React from "react";
import Select from "../components/Select";
import validateString from "../validation/validateString";

function validateCombo (value, props, path, output) {
    if (!value) value = {};
    const { name, required, minLength, maxLength } = props;
    const part1 = props.part1 || 'country';
    const x = validateString(value[part1], { name, required }, path, output);
    if (x && x.error) {
        x.part = part1;
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

    const part1 = props.part1 || 'country';

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

    // TODO component without label needs aria-label - in this case country - or use aria-labelledby ?

    return (
        <div>
            <span style={{ display: 'inline-block', verticalAlign: 'top', marginRight: '10px', maxWidth: '50%' }} >
                <Select value={value[part1] || ''} onChange={onPartChange(part1)} onBlur={onBlurField} onFocus={onFocusField} id={id+'-'+part1} options={options} {...defs}/>
            </span>
            <span style={{ display: 'inline-block', verticalAlign: 'top', maxWidth: 'calc(50% - 10px)' }} >
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
    // use a timer to blur - can be reset on a focus event
    return setTimeout(onBlur,25);
}
