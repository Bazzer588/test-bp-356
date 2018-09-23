import React from "react";
import FormSection from '../FormSection';
import FormConnect from '../FormConnect';
import FieldSet from '../components/FieldSet';

import AddressSection, {validateAddress} from "./AddressSection";
import ContactSection, {validateContactSection} from "./ContactSection";

const HomeAddress = { name: 'homeAddress', component: AddressSection, validateSection: validateAddress };
const OverseasAddress = { name: 'overseasAddress', component: AddressSection, validateSection: validateAddress };
const WorkAddress = { name: 'workAddress', component: AddressSection, validateSection: validateAddress };

const HomePhones = { name: 'contactHome', component: ContactSection, validateSection: validateContactSection };
const OverseasPhones = { name: 'contactOver', component: ContactSection, validateSection: validateContactSection };

class BigForm extends React.PureComponent {

    render () {
        const Field = this.props.renderField;
        return (
            <div>
                <FieldSet name="homeAddress">
                    {Field( HomeAddress )}
                    {Field( HomePhones )}
                </FieldSet>
                <FieldSet name="overseasAddress">
                    {Field( OverseasAddress )}
                    {Field( OverseasPhones )}
                </FieldSet>
                <FieldSet name="workAddress">
                    {Field( WorkAddress )}
                </FieldSet>
            </div>
        );
    }
}

export default FormConnect( FormSection(BigForm) );
