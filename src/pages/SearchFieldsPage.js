import React from 'react';
import FormSection from "../FormSection";
import FormConnect from "../FormConnect";
import {stringTypeField} from "../validation/validateString";
import {searchTypeField} from '../components/SmartSearch';

const S1 = stringTypeField('biscuits');
const SX = searchTypeField('baboo');
const SZ = searchTypeField('wobbo');

class SearchFieldsPage extends React.Component {

    static defaultProps = {
        name: 'foobar',
        path: 'yaya'
    };

    render () {
        const Field = this.props.renderField;
        return (
            <div>
                <form>
                    {Field(S1)}
                    {Field(SX)}
                    {Field(SZ)}
                </form>
            </div>
        );
    }
}

export default FormConnect( FormSection(SearchFieldsPage) );
