import React from 'react';
import FormSection from "../FormSection";
import FormConnect from "../FormConnect";
import {stringTypeField} from "../validation/validateString";
import {searchTypeField} from '../components/SmartSearch';
import Select from "../components/Select";
import Button from "../components/Button";
import PageRouter from "../components/PageRouter";
import CheckBoxMulti from "../components/CheckBoxMulti";
import {makePersonSection} from "../sections/PersonSection";
import {makeRepeatable} from "../FormListSection";
import {validateTree} from "../validation";

const S1 = stringTypeField('biscuits',{ required: true });
const SX = searchTypeField('origin');
const SZ = searchTypeField('destination');
const Country = stringTypeField( 'alternate', {component: Select, options: 'country', label: 'Country', required: false });
//const Languages = { name: 'languageCheck', component: CheckBoxMulti, showLabel: false, label: 'Please select languages in which you are fluent.', required: true, options: 'languages',
//    validator: () => {} };

const Languages = stringTypeField('languageCheck', { component: CheckBoxMulti, showLabel: false, label: 'Please select languages in which you are fluent.', required: true, options: 'languages'} );


// const Person = makePersonSection('thePerson');
const PersonList = makeRepeatable('personList',makePersonSection(),true);

function validateSection (v) { // v, values, sectionProps, output, errors, path
    v(S1);
    v(SX);
    v(SZ);
    v(Country);
    v(Languages);
    v(PersonList);
}

class SearchFieldsPage extends React.Component {

    static defaultProps = {
        name: 'dealsPage'
        //path: 'dealsPage'
    };

    valida = () => {
        const output = {};
        const errors = [];
        validateTree({ validateSection },this.props.value,output,errors,'dealsPage');
        console.log('OUTPUT',output);
        console.log('ERRORS',errors);
    };

    render () {
        const Field = this.props.renderField;
        return (
            <div>
                <form>
                    {Field(S1)}
                    {Field(SX)}
                    {Field(SZ)}
                    {Field(Country)}
                    {Field(Languages)}
                    {Field(PersonList, { listLength: 2 })}

                    <p style={{ textAlign: 'right', marginTop: '16px' }}>
                        <Button onClick={() => { window.history.back(); }}>Cancel</Button>
                        <Button onClick={this.valida}>Validate</Button>
                        <Button cnm="primary" onClick={() => PageRouter.changePage('/tax-app') } >Continue</Button>
                    </p>
                </form>
            </div>
        );
    }
}

export default FormConnect( FormSection(SearchFieldsPage) );
