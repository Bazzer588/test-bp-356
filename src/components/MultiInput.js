import React from "react";

function MultiInput (props) {

    //console.log('Multi',props);

    const { inputs, id, onBlur, onChange, defaultField = 0, required } = props;
    const value = props.value || {}; // value may be '' which breaks IE11

    const onPartChange = (name) => (ev) => {
        onChange({ target: { value: { ...value, [name]: ev.target.value } } });
    };

    return (
        <div>
            {inputs.reduce( (acc,item,index) => {
                const { name, component, validator, span, ...rest } = item;
                const Compo = component || 'input';
                const type = component ? undefined : 'text';
                const key = id+'-'+name;
                const full = index===defaultField ? id : key;
                acc.push(
                    <span style={{ display: 'inline-block', verticalAlign: 'top' }} key={key} {...span}>
                        <Compo
                            aria-describedby={props['aria-describedby']}
                            aria-invalid={props['aria-invalid']}
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
            //r.path = path;
            //r.name = props.name;
            //r.field = name;
            console.log('GOTATTA',r);
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
