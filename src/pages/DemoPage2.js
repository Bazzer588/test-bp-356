import React from 'react';
import NavLinks from "../sections/NavLinks";
import {selectTypeField} from "../components/Select";
import {stringTypeField} from "../validation/validateString";
import {makeRepeatable} from "../FormListSection";
import {useBasePage} from "./BasePage";
import FormConnect from "../FormConnect";
import FormSection from "../FormSection";
import FileUpload from "../components/FileUpload";
import Button from "../components/Button";

// DEBUG

console.log('DEFAULT CURRENCY', process.env.REACT_APP_DEFAULT_CURRENCY);

// FIELDS

const G = selectTypeField( 'gen', {options: 'cashFrom', label: 'Gen', required: true });
//const G = stringTypeField( 'gen', { required: true, showLabel: false });
const LangList = makeRepeatable('sourceOfDepositFunds',G,true,{ addLabel: 'Add another', simpleField: true, maxLength: 4 });

const others = stringTypeField('otherSource',{ required: true });

const DepositCurrency = selectTypeField('depCurr',{ options: 'currency', required: true, defaultValue: process.env.REACT_APP_DEFAULT_CURRENCY });
const TotalDeposit = stringTypeField('totalDeposit',{ required: true, autoComplete: 'off' } );

const Upload1 = stringTypeField('upload1',{ component: FileUpload, required: true });
const UploadP = stringTypeField('uploadP',{ component: FileUpload, preloadImage: true });
const Upload2 = stringTypeField('upload2',{ type: 'file', value: 'Yeah', placeholder: 'Yoyoyo', required: true });

const UploadCam = stringTypeField('uploadCam',{ component: FileUpload, preloadImage: true, accept: 'image/*', capture: 'camera', placeholder: 'Take a picture...' });

const Comments = stringTypeField('yourComments',{ component: 'textarea', rows: 9 });
const Comments2 = stringTypeField('yourComments2',{ component: 'textarea', rows: 4 });

class DemoPage2 extends React.Component {

    static defaultProps = {
        name: 'thisIsDemoPage',
        //path: 'dealsPage'
        wrap: true
    };

    checkFileInput (id) {
        const el = document.getElementById(id);
        const file = el.files[0];
        if (file) {
            console.log('UPLOAD OK',id,file.size,file.name);
        } else {
            console.log('No file selected',id);
        }
    }

    doContinue = () => {
        console.log(this.props.value);
        this.checkFileInput('thisIsDemoPage-upload1');
        this.checkFileInput('thisIsDemoPage-uploadP');
    };

    render () {
        const { value } =this.props;
        console.log('VVV',JSON.stringify(value));
        const Field = this.props.renderField;
        const oth = value && value.sourceOfDepositFunds && value.sourceOfDepositFunds.indexOf('X') >=0;
        const extras = oth && Field(others);
        return (
            <>
                <header className="App-header">
                    <NavLinks owner={this} page={this.props.page}/>
                    <h1 className="App-title">
                        Another page
                    </h1>
                </header>
                <form>
                <h2>Source of funds for deposit</h2>
                {Field(LangList,{ extras })}
                {Field(DepositCurrency)}
                {Field(TotalDeposit)}

                {Field(Upload1)}
                {Field(UploadP)}
                {Field(Upload2)}
                {Field(UploadCam)}

                {Field(Comments)}
                {Field(Comments2)}
                <p style={{ textAlign: 'right', marginTop: '12px' }}>
                    <a href={user.website}>Click Me</a>
                    <Button cnm="primary" onClick={this.doContinue}>Continue</Button>
                </p>
            </form>
            </>
        );
    }
}

export default useBasePage( FormConnect( FormSection(DemoPage2) ) );

const user = {
    website: 'javascript:stealYourPassword()'   // eslint-disable-line
};

window.stealYourPassword = function () {   // eslint-disable-line
    alert('pwnd');
};
