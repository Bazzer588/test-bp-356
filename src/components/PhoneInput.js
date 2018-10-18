import React from "react";
import {getOptionList, getOptionDescriptions} from './AppConfig';
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

export class PhoneInput extends React.Component {

    docClick = () => {
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
        focusTo( document.getElementById(this.props.id+'-picker') );
        //return false;
    }

    telChange = (ev) => {
        const value = this.props.value || {};
        const val = { code: DEF_CODE, ...value, tel: ev.target.value };
        this.props.onChange({ target: { value: val } });
    };

    onBtnKey = (ev) => {
        console.log('Key',ev.key);
        if (ev.key==='ArrowDown' || ev.key==='ArrowUp' || ev.key==='Tab') {
            const state = this.state || {};
            if (state.pop) {
                if (ev.shiftKey) {
                    this.setState({ pop: false });
                    return;
                }
                ev.preventDefault();
                ev.stopPropagation();
                focusTo( document.getElementById(this.props.id+'-checked') );
            }
        } else if (ev.key==='Escape') {
            this.docClick();
        }
    };

    render () {
        const { value = {}, id, onBlur, minLength, maxLength, required } = this.props;
        const state = this.state || {};
        return (
            <div className="phone-input">
                <button
                    aria-label={'Telephone country code'}
                    id={id+'-picker'}
                    onClick={this.btn}
                    type="button"
                    onFocus={this.docClick}
                    onKeyDown={this.onBtnKey}
                >
                    +{value.code || DEF_CODE}
                </button>
                {state.pop &&
                    <div className="telpopup">
                        {renderOptions(this,'phoneCodes',id,value.code || DEF_CODE)}
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

function renderOptions (t,options,id,value) {
    const list = getOptionList(options);
    const map = getOptionDescriptions(options);
    const opts = [];
    list.forEach(row => {
        const check = row===value;
        opts.push(
            <a href="/"
               onClick={(ev) => t.setCo(ev,row)} key={row}
               className={check ? 'checked' : ''}
               id={check ? id+'-checked': undefined}
               onKeyDown={onLinkKey}
            >
                <span className="code">+{row}</span>
                {map[row]}
            </a>
        );
        if (check) {
            setTimeout(() => {
                const it = document.getElementById(id+'-checked');
                if (it) it.scrollIntoView();
            },10);
        }
    });
    return opts;
}

function onLinkKey (ev) {
    if (ev.key==='ArrowDown') {
        //ev.preventDefault();
        ev.stopPropagation();
        focusTo(ev.target.nextSibling);
    } else if (ev.key==='ArrowUp') {
        //ev.preventDefault();
        ev.stopPropagation();
        focusTo(ev.target.previousSibling);
    } else if (ev.key==='Escape') {
        focusTo(ev.target.parentElement.previousSibling);
    }
}

function focusTo (el) {
    if (el) el.focus();
}
