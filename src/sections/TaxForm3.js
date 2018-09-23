import React from "react";
import FormSection from '../FormSection';
import FormConnect from '../FormConnect';
import ContactSection, {validateContactSection} from "./ContactSection";
import Select from "../components/Select";
import { stringTypeField } from '../validation/validateString'
import {translate} from '../components/AppConfig';

// https://developer.mozilla.org/en-US/docs/Web/HTML/Attributes/autocomplete

const TaxReferenceNo = stringTypeField( 'taxRef', {maxLength: 8, minLength: 5, inputClass: 'narrow upper-case', required: true, spellCheck: false, type: 'tel', pattern: '^[0-9]+$' });
const FirstName = stringTypeField( 'firstName', {maxLength: 16, minLength: 2});
const LastName = stringTypeField( 'lastName', {maxLength: 30, required: true });
const UserName = stringTypeField( 'username', {placeholder: 'Username', autoComplete: 'username', type: 'text', pattern: '(?=.*\\d)(?=.*[a-z])(?=.*[A-Z]).{8,}' });

const Gender = stringTypeField( 'gender', {component: Select, options: 'gender', required: true, inputClass: 'narrow' });
const Country = stringTypeField( 'country', {component: Select, options: 'country', required: false });
const ZipCode = stringTypeField( 'zipCode', {maxLength: 12, autoComplete: 'postal-code', required: false, inputClass: 'narrow' });

const Phones = { name: 'phones', component: ContactSection, validateSection: validateContactSection };

class TaxForm extends React.PureComponent {

    allowCountry = (code) => {
        if (code==='AR' && this.props.allowArgentina===false)
            return false;
        return true;
    };

    render () {
        const Field = this.props.renderField;
        const { value = {} } = this.props;
        const tax = value['taxRef'];
        return (
            <fieldset className="form-fieldset">
                <legend>{translate(this.props.name)}</legend>
                {Field( TaxReferenceNo )}
                <div style={{ display: 'inline-block', verticalAlign: 'top', width: '50%', paddingRight: '16px', boxSizing: 'border-box' }}>
                    {Field( FirstName )}
                    </div>
                    <div style={{ display: 'inline-block', verticalAlign: 'top', width: '50%' }}>
                    {Field( LastName )}
                </div>
                {Field( Gender )}
                {Field( UserName, { required: !!tax } )}
                {Field( Country, { allowOption: this.allowCountry, required: (this.props.requireCountry || false) } )}
                {Field( ZipCode )}
                {Field( Phones )}
            </fieldset>
        );
    }
}

export default FormConnect( FormSection(TaxForm) );

//  <Field {...Country} allowOption={this.allowCountry} />
//  {Field(Country, { allowOption: this.allowCountry}) }
