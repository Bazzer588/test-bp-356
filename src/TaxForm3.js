import React from "react";
import FormSection from './FormSection';
import FormConnect from './FormConnect';
import ContactSection from "./ContactSection";
import Select from "./components/Select";

// https://developer.mozilla.org/en-US/docs/Web/HTML/Attributes/autocomplete
function validateContactSection () {}

const TaxReferenceNo = { name: 'taxRef', maxLength: 8, minLength: 5, inputClass: 'narrow' };
const FirstName = { name: 'firstName', maxLength: 30 };
const LastName = { name: 'lastName', maxLength: 30, autoComplete: 'postal-code' };
const UserName = { name: 'username', placeholder: 'Username', autoComplete: 'username', type: 'text' };
const Gender = { name: 'gender', component: Select, options: 'gender' };
const Country = { name: 'country', component: Select, options: 'country', required: false };
const Phones = { name: 'phones', component: ContactSection, validateSection: validateContactSection };

class TaxForm extends React.PureComponent {

    render () {
        const field = this.props.renderField;
        const { value = {} } = this.props;
        const tax = value['taxRef'];
        return (
            <fieldset className="form-fieldset">
                <legend>{this.props.name} Details</legend>
                {field(TaxReferenceNo)}
                {field(Country)}
                {field(FirstName)}
                {field(LastName)}
                {field(UserName, { required: !!tax })}
                {field(Gender)}
                {field(Phones)}
            </fieldset>
        );
    }
}

export default FormConnect( FormSection(TaxForm) );
