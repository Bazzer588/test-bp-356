import React from 'react';

import {selectTypeField} from "../components/Select";
import {stringTypeField} from "../validation/validateString";
import {makeRepeatable} from "../FormListSection";
import {useBasePage} from "./BasePage";
import FormConnect from "../FormConnect";
import FormSection from "../FormSection";

const G = selectTypeField( 'gen', {options: 'cashFrom', label: 'Gen', required: true });
//const G = stringTypeField( 'gen', { required: true, showLabel: false });
const LangList = makeRepeatable('sourceOfDepositFunds',G,true,{ addLabel: 'Add another', simpleField: true, maxLength: 4 });

const others = stringTypeField('otherSource',{ required: true });

const TotalDeposit = stringTypeField('totalDeposit',{ required: true });

class DemoPage2 extends React.Component {

    static defaultProps = {
        name: 'thisIsDemoPage',
        //path: 'dealsPage'
        wrap: true
    };

    render () {
        const { value } =this.props;
        console.log('VVV',JSON.stringify(value));
        const Field = this.props.renderField;
        const oth = value && value.sourceOfDepositFunds && value.sourceOfDepositFunds.indexOf('X') >=0;
        const extras = oth && Field(others);
        return (
            <form>
                <h2>Source of funds for deposit</h2>
                {Field(LangList,{ extras })}
                {Field(TotalDeposit)}
            </form>
        );
    }
}

export default useBasePage( FormConnect( FormSection(DemoPage2) ) );
