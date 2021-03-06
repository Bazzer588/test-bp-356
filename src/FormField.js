import React from "react";
import {translate} from './components/AppConfig';
import InputText from "./components/InputText";

export default class FormField extends React.PureComponent {

    onBlur = () => {
        const { touched, name, parent } = this.props;
        if (!touched) {
            parent.onBlurField(name,true,this);
        }
    };

    onChange = (ev) => {
        const mod = ev.target.value;
        const { name, parent } = this.props;
        parent.onChangeField(name,mod,this);
    };

    render () {
        const { parent, coreData, name, path, showErrors, touched, required, showLabel = true, htmlId, inputClass, fieldClass = '',
            component, validator, stripProps, labelId,
            ...others
        } = this.props;

        const Compo = component || InputText; // 'input';
        // const type = component ? undefined : 'text';
        const optional = component ? undefined : (required ? undefined : 'optional');

        const value = this.props.value || '';
        const full = path + '-' + name; // const full = path + '-' + (htmlId || name); // TODO htmlId screws up error link
        const labl = path + '-' + (labelId || name);

        const error = (!!touched || showErrors) && validator && validator(value,this.props,path);
        const invalid = error && !!error.error;
        // const invalid = required!==false && !!touched && !value;
        const errorId = invalid ? full+'-fieldError' : undefined;

        const otherProps = stripProps ? stripProps(others) : others;

        const divClass = invalid ? 'form-field ff-invalid' : 'form-field';
        return (
            <div className={divClass+' '+fieldClass}>
                {showLabel && <label htmlFor={full}>{translate(labl,this.props)}</label>}
                <Compo
                    aria-describedby={errorId}
                    aria-invalid={invalid}
                    className={inputClass || optional}
                    id={full}
                    onBlur={this.onBlur}
                    onChange={this.onChange}
                    required={required}
                    // type={type}
                    {...otherProps}
                    value={value}
                />
                {invalid && renderError(error,errorId)}
            </div>
        );
    }
}

function renderError (error, errorId) {
    /*
    function vals (error, values) {
        if (values) {
            if (values.minLength) return 'Please enter at least '+error.values.minLength+' characters';
            if (values.found) return 'Invalid email, character sequence "'+values.found+'" is not allowed';
            return error.error+' '+JSON.stringify(values);
        }
        return error.error;
    }
    const text = vals(error,error.values);
    */
    const text = translate(error);

    return (
        <span
            aria-live="assertive"
            className="field-error"
            id={errorId}
        >
            {text}
            {error.required && ' *'}
        </span>
    );
}

/*  render manually

    <FormField
        {...fieldProps}
        coreData={coreData}
        parent={this}
        path={path+'-'+this.props.name}
        touched={ this.props.touched[ fieldProps.name ] }
        value={ this.props.value[ fieldProps.name ] }
    />

    parent/this must have props:
        onChangeField
        onBlurField

 */

/*  OTHER THINGS
    help popups
    focus help (show layer with more info)
    good data indicator (ie entry is valid, show a tick)
    layout options (ie traditional table style)
    extra field info ('Full name as displayed on card')
    dimmed text in label - ie 'Address 2 (optional)' where bracketed is gray


    PASSING CUSTOM ATTRIBUTES TO THE HTML INPUT
    https://reactjs.org/blog/2017/09/08/dom-attributes-in-react-16.html

 */
