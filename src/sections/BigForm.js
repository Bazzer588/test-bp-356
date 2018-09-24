import React from "react";
import FormSection from '../FormSection';
import FormConnect from '../FormConnect';
import FieldSet from '../components/FieldSet';

import AddressSection, {validateAddress} from "./AddressSection";
import ContactSection, {validateContactSection} from "./ContactSection";
import Select from "../components/Select";
import CheckBox from "../components/CheckBox";
import {stringTypeField} from "../validation/validateString";

// fields

const CarsInHouse = stringTypeField( 'carsInHouse', {component: Select, required: true, rangeFrom: 0, rangeTo: 4, inputClass: 'narrow' });
const ParkingSpaces = stringTypeField( 'parkingSpaces', {component: Select, required: false, rangeFrom: 0, rangeTo: 2, inputClass: 'narrow' });
const AgeRetire = stringTypeField( 'preferredRetireAge', {component: Select, required: false, rangeFrom: 70, rangeTo: 55, inputClass: 'narrow' });
const ConsentSMS = { name: 'consentSMS', component: CheckBox, showLabel: false, label: 'Please send me SMS messages about the progress of my application.' };
const ConsentEmail = { name: 'consentEmail', component: CheckBox, showLabel: false, label: 'Sign me up for regular email alerts.' };

// declare sections

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
                <FieldSet name="About you">
                    {Field( CarsInHouse )}
                    {Field( ParkingSpaces )}
                    {Field( AgeRetire )}
                    <div style={{ marginTop: '16px' }}>
                    {Field( ConsentSMS )}
                    {Field( ConsentEmail )}
                    </div>
                </FieldSet>
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
