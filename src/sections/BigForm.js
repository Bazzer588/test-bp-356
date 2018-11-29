import React from "react";
import FormSection from '../FormSection';
import FormConnect from '../FormConnect';
import FieldSet from '../components/FieldSet';

import {makeAddressSection} from "./AddressSection";
import ContactSection, {validateContactSection} from "./ContactSection";
import Select from "../components/Select";
import CheckBox from "../components/CheckBox";
import {stringTypeField} from "../validation/validateString";
import {comboTypeField} from './ComboField';
import RoomCount from './RoomCount';
import walkTree from '../validation/walkTree';
import ErrorList from "../components/ErrorList";

// fields

const CarsInHouse = stringTypeField( 'carsInHouse', {component: Select, required: true, rangeFrom: 0, rangeTo: 4, inputClass: 'narrow' });
const ParkingSpaces = stringTypeField( 'parkingSpaces', {component: Select, required: false, rangeFrom: 0, rangeTo: 2, inputClass: 'narrow' });
const AgeRetire = stringTypeField( 'preferredRetireAge', {component: Select, required: false, rangeFrom: 70, rangeTo: 55, inputClass: 'narrow' });
const ConsentSMS = { name: 'consentSMS', component: CheckBox, showLabel: false, label: 'Please send me SMS messages about the progress of my application.' };
const ConsentEmail = { name: 'consentEmail', component: CheckBox, showLabel: false, label: 'Sign me up for regular email alerts.' };
const ConsentOth = { name: 'consentOther', component: CheckBox, showLabel: false, label: 'Other consent option.' };
const Thingy = comboTypeField('regNumber',{ options: 'country', required: false, minLength: 4, maxLength: 12 });
const Whatever = comboTypeField('langCode',{ part1: 'lang', options: 'languages', required: true, minLength: 4, maxLength: 12 });

// declare sections

const HomeAddress = makeAddressSection('homeAddress');
const OverseasAddress = makeAddressSection('overseasAddress');
const WorkAddress = makeAddressSection('workAddress');

const HomePhones = { name: 'contactHome', component: ContactSection, validateSection: validateContactSection };
const OverseasPhones = { name: 'contactOver', component: ContactSection, validateSection: validateContactSection };

const RoomsSection = { name: 'rooms', component: RoomCount, validateSection: () => {} };

class BigForm extends React.PureComponent {

    static defaultProps = {
        wrap: true  // onDataChange will only be called if this is set
    };

    /*static getDerivedStateFromProps(props, state) {
        console.log('GDSFP',props.showErrorsWrap);
        return null;
    }*/

    checkErrors = () => {
        // console.log('BIGFORM',this.props);
        this.props.setShowErrors(true);
        const errors = walkTree(this);
        this.setState({ errors });
        if (errors && errors.length)
            ErrorList.autoFocusPlease();
    };

    onDataChange = (changed,errs) => {
        if (errs) {
            const form = FormSection(BigForm);
            const bf = new form({...this.props, setRef: null, value: changed });
            const errors = walkTree(bf);
            // console.log('DCH',changed.workAddress,errors);
            this.setState({errors});
        }
    };

    render () {
        const st = this.state || {};
        let errors = st.errors;

        const Field = this.props.renderField;
        const { /*owner, */ name, setRef /*, showErrors, showErrorsWrap*/, errorsAtTop } = this.props;
        // console.log('OWNER is',owner);
        // console.log('showErrors',showErrors);
        if (setRef) setRef(name,this);
        /*if (owner) {
            owner.theBigForm = this;
            owner.things[name] = this;
        }*/

        /*if (!this.crazyFlag && (showErrors || showErrorsWrap)) { // why showErrorsWrap ????
            this.crazyFlag = true;
            errors = walkTree(this);      // YOU CAN'T CALL WALK TREE DURING RENDER !!!!
            this.crazyFlag = false;
        }*/

        return (
            <div>
                {errorsAtTop && errors && errors.length>0 && <ErrorList errors={errors} />}
                <FieldSet name="Rooms" aria-label="List of rooms and contacts">
                    {Field( RoomsSection )}
                </FieldSet>
                <FieldSet name="About you">
                    {Field( CarsInHouse )}
                    {Field( ParkingSpaces )}
                    {Field( AgeRetire )}
                    <div style={{ marginTop: '16px' }}>
                    {Field( ConsentSMS )}
                    {Field( ConsentEmail )}
                    {Field( ConsentOth )}
                    {Field( Thingy )}
                    {Field( Whatever )}
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
                {!errorsAtTop && errors && errors.length>0 && <ErrorList errors={errors} />}
                <button onClick={this.checkErrors} type="button">Walk</button>
            </div>
        );
    }
}

const form = FormSection(BigForm);

export default FormConnect(form);
