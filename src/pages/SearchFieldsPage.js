import React from 'react';
import FormSection from "../FormSection";
import FormConnect from "../FormConnect";
import {stringTypeField} from "../validation/validateString";
import {searchTypeField} from '../components/SmartSearch';
import Select from "../components/Select";
import Button from "../components/Button";
import PageRouter from "../components/PageRouter";
import CheckBoxMulti from "../components/CheckBoxMulti";

const S1 = stringTypeField('biscuits',{ required: true });
const SX = searchTypeField('origin');
const SZ = searchTypeField('destination');
const Country = stringTypeField( 'alternate', {component: Select, options: 'country', label: 'Country', required: false });
const Languages = { name: 'languageCheck', component: CheckBoxMulti, showLabel: false, label: 'Please select languages in which you are fluent.', required: true, options: 'languages' };

class SearchFieldsPage extends React.Component {

    static defaultProps = {
        name: 'dealsPage'
        //path: 'dealsPage'
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

                    <p style={{ textAlign: 'right', marginTop: '16px' }}>
                        <Button onClick={() => { window.history.back(); }}>Cancel</Button>
                        <Button cnm="primary" onClick={() => PageRouter.changePage('/tax-app') } >Continue</Button>
                    </p>
                </form>
            </div>
        );
    }
}

export default FormConnect( FormSection(SearchFieldsPage) );
