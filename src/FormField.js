import React from "react";

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
        const { parent, coreData, name, path, touched, required, htmlId, inputClass, component, validator, ...others } = this.props;
        const Compo = component || 'input';
        const value = this.props.value || '';
        const full = path + '-' + (htmlId || name);
        const labl = path + '-' + name;

        if (validator) {
            const error = validator(value,this.props,path);
        }

        const invalid = required!==false && !!touched && !value;  // TODO validator
        const errorId = invalid ? full+'-fieldError' : undefined;

        const divClass = invalid ? 'form-field ff-invalid' : 'form-field';
        return (
            <div className={divClass}>
                <label htmlFor={full}>{labl}</label>
                <Compo
                    aria-describedby={errorId}
                    aria-invalid={invalid}
                    className={inputClass}
                    id={full}
                    onBlur={this.onBlur}
                    onChange={this.onChange}
                    required={required}
                    {...others}
                    value={value}
                />
                {invalid &&
                    <span
                        aria-live="assertive"
                        className="field-error"
                        id={errorId}
                    >
                        {'Please enter the field '+labl}
                    </span>
                }
            </div>
        );
    }
}

/*  render manually

    <FormField
        {...fieldProps}
        parent={this}
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

 */
