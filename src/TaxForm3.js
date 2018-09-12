import React from "react";
import FormSection from './FormSection';
import FormConnect from './FormConnect';

// https://developer.mozilla.org/en-US/docs/Web/HTML/Attributes/autocomplete

const TaxReferenceNo = { name: 'taxRef', maxLength: 8, minLength: 5, inputClass: 'narrow' };
const FirstName = { name: 'firstName', maxLength: 30 };
const LastName = { name: 'lastName', maxLength: 30, autoComplete: 'postal-code' };
const Email = { name: 'emailAddress', maxLength: 80, minLength: 10, required: false, autoComplete: 'never-ever', htmlId: 'otherField' };
const Telephone = { name: 'telephone', maxLength: 12, autoComplete: 'tel', inputClass: 'narrow' };
const UserName = { name: 'username', placeholder: 'Username', autoComplete: 'username', type: 'text' };
const Gender = { name: 'gender', component: Select };

class TaxForm extends React.Component {

    render () {
        const { value = {} } = this.props;
        const tax = value['taxRef'];
        return (
            <FormSection parent={this}>
                {field =>
                    <fieldset className="form-fieldset">
                        <legend>{this.props.name} Details</legend>
                        {field(TaxReferenceNo)}
                        {field(FirstName)}
                        {field(LastName)}
                        {field(Telephone)}
                        {field(Email, { required: !!tax })}
                        {field(UserName, { required: true })}
                        {field(Gender)}
                    </fieldset>
                }
            </FormSection>
        );
    }
}

export default FormConnect(TaxForm);

// ***********************

function Select (props) {
    console.log('SELECT',props);
    return (
        <select {...props} className="custom-select">
            {!props.value && <option>Please select a gender</option>}
            <option value="M">Male</option>
            <option value="F">Female</option>
        </select>
    );
}
