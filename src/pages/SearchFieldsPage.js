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
import {NavLinks} from "../sections/NavLinks";

const S1 = stringTypeField('biscuits',{ required: true });
const SX = searchTypeField('origin');
const SZ = searchTypeField('destination');
const Country = stringTypeField( 'alternate', {component: Select, options: 'country', label: 'Country', required: false });
//const Languages = { name: 'languageCheck', component: CheckBoxMulti, showLabel: false, label: 'Please select languages in which you are fluent.', required: true, options: 'languages',
//    validator: () => {} };

const Languages = stringTypeField('languageCheck', { component: CheckBoxMulti, showLabel: false, label: 'Please select languages in which you are fluent.', required: true, options: 'languages'} );


// const Person = makePersonSection('thePerson');
const PersonList = makeRepeatable('personList',makePersonSection(),true,undefined);

//const G = searchTypeField('gen', {});
const G = stringTypeField( 'gen', {component: Select, options: 'languages', label: 'Gen', required: true });
//const G = stringTypeField( 'gen', { required: true, showLabel: false });
const LangList = makeRepeatable('languageList',G,true,{ addLabel: 'Add a language', simpleField: true, maxLength: 4 });

function validateSection (v) { // v, values, sectionProps, output, errors, path
    v(S1);
    v(SX);
    v(SZ);
    v(Country);
    v(LangList);
    v(Languages);
    v(PersonList);
}

class SearchFieldsPage extends React.Component {

    static defaultProps = {
        name: 'dealsPage',
        //path: 'dealsPage'
        wrap: true
    };

    hideErrors = () => {
        this.props.setShowErrors(false);
        this.props.updateRedux({ type: 'SET', key: this.props.name+'_T', value: {} }); // clear touch
    };

    onDataChange (data,showErrors,fieldName) {
        console.log('onDATACHANGE',fieldName,showErrors,data);
        if (showErrors) {
            const output = {};
            const errors = [];
            validateTree({ validateSection },data,output,errors,'dealsPage');
            console.log('OUTPUT',output);
            console.log('ERRORS',errors);
            if (this.bar)
                errorChange();
        }
    };

    valida = () => {
        const output = {};
        const errors = [];
        validateTree({ validateSection },this.props.value,output,errors,'dealsPage');
        console.log('OUTPUT',output);
        console.log('ERRORS',errors);
        this.props.setShowErrors(true);
    };

    render () {
        const Field = this.props.renderField;
        return (
            <div className="App bg-light">
                <header className="App-header">
                    <NavLinks/>
                    <h1 className="App-title">
                        Deals Page
                    </h1>
                </header>
                <form>
                    {Field(S1)}
                    {Field(SX)}
                    {Field(SZ)}
                    {Field(Country)}
                    {Field(LangList)}
                    {Field(Languages)}
                    {Field(PersonList, { listLength: 2 })}

                    <p style={{ textAlign: 'right', marginTop: '16px' }}>
                        <Button onClick={() => { window.history.back(); }}>Cancel</Button>
                        <Button onClick={this.hideErrors}>Hide errors</Button>
                        <Button onClick={this.valida}>Validate</Button>
                        <Button cnm="primary" onClick={() => PageRouter.changePage('/tax-app') } >Continue</Button>
                    </p>
                    <div style={{ marginTop: '2300px' }}>...</div>
                </form>
            </div>
        );
    }
}

export default FormConnect( FormSection(SearchFieldsPage) );

function errorChange (a,b) {
    const len = a.length;
    if (b.length!==len) {
        return true;
    }
    for (let n=0;n<len;n++) {
        const x = a[n];
        const y = b[n];
        if (x.name !== y.name ||
            x.path !== y.path ||
            x.error !== y.error
            // required
            // values
        ) {
            return true;
        }
    }
    return false;
}
