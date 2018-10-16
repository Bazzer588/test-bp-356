import React from "react";
// import {translate, getOptionList, getOptionDescriptions} from './AppConfig';
import './PhoneInput.scss';
import validateString from "../validation/validateString";

const DEF_CODE = '44';

export const phoneTypeField = (name,props) => { return { name, component: PhoneInput, validator: validatePhone, ...props } };

export function validatePhone (value, props, path, output) {
    const { name, required } = props;
    if (value && value.tel) {
        const err = validateString(value.tel,props,path);
        if (err.error)
            return err;
        if (output)
            output[name] = value;
        return true;
    } else if (required) {
        return { name, path, required, error: 'required' };
    }
}

export default class PhoneInput extends React.Component {

    docClick = (ev) => {
        console.log('DOC CLICK');
        this.setState({ pop: false });
        document.removeEventListener('click',this.docClick);
    };

    btn = () => {
        const state = this.state || {};
        this.setState({ pop: !state.pop });
        if (!state.pop) {
            document.addEventListener('click',this.docClick);
        }
    };

    setCo (ev,co) {
        ev.preventDefault();
        const value = this.props.value || {};
        const val = { tel: '', ...value, code: co };
        this.props.onChange({ target: { value: val } });
        this.btn();
        document.getElementById(this.props.id+'-picker').focus();
        //return false;
    }

    telChange = (ev) => {
        const value = this.props.value || {};
        const val = { code: DEF_CODE, ...value, tel: ev.target.value };
        this.props.onChange({ target: { value: val } });
    };

    render () {
        const { value = {}, id, onBlur, minLength, maxLength, required } = this.props;
        const state = this.state || {};
        return (
            <div className="phone-input">
                <button
                    aria-label={'Country code'}
                    id={id+'-picker'}
                    onClick={this.btn}
                    type="button"
                    onFocus={this.docClick}
                >
                    +{value.code || DEF_CODE}
                </button>
                {state.pop &&
                    <div className="telpopup">
                        <a href="/" onClick={(ev) => this.setCo(ev,'44')}>44 United Kingdom</a>
                        <a href="/" onClick={(ev) => this.setCo(ev,'47')}>47 Norway</a>
                        <a href="/" onClick={(ev) => this.setCo(ev,'01')}>01 United States of America</a>
                        <a href="/" onClick={(ev) => this.setCo(ev,'86')}>86 China</a>
                    </div>
                }
                <input
                    aria-describedby={this.props['aria-describedby']}
                    id={id}
                    maxLength={maxLength}
                    minLength={minLength}
                    required={required}
                    type="tel"
                    onBlur={onBlur}
                    onChange={this.telChange}
                    onFocus={this.docClick}
                    value={value.tel || ''}
                />
            </div>
        );
    }
}
