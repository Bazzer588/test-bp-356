import React from 'react';
import logo from '../logo.svg';
import PageRouter from '../components/PageRouter';
import FormConnect from "../FormConnect";
import FormSection from "../FormSection";
import CheckBox from "../components/CheckBox";
import Button from "../components/Button";
import Loader from '../components/Loader';
import {phoneTypeField} from '../components/PhoneInput';

import TestPopup from './TestPopup';
import PickerPopup from './PickerPopup';

import {stringTypeField} from "../validation/validateString";
import {validateTree} from '../validation';
import NavLinks from "../sections/NavLinks";
import walkTree from "../validation/walkTree";
import ErrorList from "../components/ErrorList";

function validateBool (value, props, path, output) {
    const { name, required } = props;
    if (required && !value) {
        return { name, path, required, error: 'required' };
    }
    if (output) {
        output[name] = !!value;
    }
    return true;
}

// declare fields

const CardNumber = stringTypeField( 'cardNumber', { minLength: 16, maxLength: 16, type: 'tel', required: true });
const CVV = stringTypeField( 'cvvNumber', { minLength: 3, maxLength: 4, type: 'tel', required: true, inputClass: 'tiny', pattern: '^[0-9]+$' });
const NameOnCard = stringTypeField( 'nameOnCard', {maxLength: 40, minLength: 4, inputClass: 'upper-case', required: true, spellCheck: false, pattern: '^[a-zA-Z ]+$' });
const ConsentSMS = { name: 'smsTrack', component: CheckBox, showLabel: false, label: 'Please send me SMS messages to track my order.', required: true, validator: validateBool };

const EmoField = phoneTypeField('emergencyPhone', { maxLength: 12, minLength: 4, required: true, pattern: '^[0-9]+$' });
const FaxField = phoneTypeField('faxNo', { maxLength: 10, minLength: 6 });

function validatePaymentPage (v /*, values, sectionProps, output, errors, path */) {
    v(CardNumber);
    v(CVV);
    v(NameOnCard);
    v(ConsentSMS);
    return true;
}

// page class

class PaymentPage extends React.Component {

    static defaultProps = {
        name: 'checkOutForm',
        path: 'paymentPage',
        wrap: true  // onDataChange will only be called if this is set
    };

    constructor (props) {
        super(props);
        const { name } = this.props;
        this.props.updateRedux({ type: 'SET', key: name+'_T', value: {} }); // RESET touched FIELDS
    }

    /*componentWillMount () {             // unsafe, use static getDerivedStateFromProps(nextProps, prevState)
        const { name } = this.props;
        this.props.updateRedux({ type: 'SET', key: name+'_T', value: {} }); // RESET touched FIELDS
    }*/

    componentDidUpdate (prevProps, prevState, snapshot) { // prevProps, prevState, snapshot
        //console.log('DID UPTATE');
        const { inputErrors, } = (this.state || {});
        if (inputErrors!==(prevState && prevState.inputErrors)) {
            // const p = document.getElementById('theErrors');
            // if (p) p.focus();
            // focus to error?
            // this.focusToFirstError();
        }
    }

    focusToFirstError (errors) {
        if (!errors) errors = this.state.errors || []; // const { errors = [] } = (this.state || {});
        const err = errors[0];
        if (err) {
            const id = err.path+'-'+err.name;
            const p = document.getElementById(id);
            if (p) p.focus();
        }
    }

    doCheckout = () => {
        const output = {};
        const errors = [];
        validateTree({ validateSection: validatePaymentPage },this.props.value,output,errors,'paymentPage-checkOutForm');
        console.log('OUTPUT',output);
        console.log('ERRORS',errors);

        if (output.smsTrack) {
            console.log('CHGECKOUT', this.props.value);
            this.setState({ inputErrors: undefined });
            makePayment(this, this.props.value);
        } else {
            // show errors
            this.setState({ inputErrors: Date.now(), errors });
            this.props.setShowErrors(true);
            this.focusToFirstError(errors);
        }
    };

    openPop = () => {
        this.setState({ popup: 1 });
    };

    goBack = () => {
        window.history.back();
    };

    onDataChange = (changed,errs) => {
        //console.log('PP DCH',errs);
        if (errs) {
            const form = FormSection(PaymentPage);
            const bf = new form({...this.props, setRef: null, value: changed });
            const errors = walkTree(bf);
            // console.log('DCH',changed.workAddress,errors);
            this.setState({errors});
        }
    };

    checkErrs = () => {
        this.props.setShowErrors(true);
        const errors = walkTree(this);
        this.setState({ errors });
        if (errors && errors.length)
            ErrorList.autoFocusPlease();
    };

    render() {
        const Field = this.props.renderField;

        const { loading, message, popup } = this.state || {};
        const dprops = loading ? { 'aria-disabled': true, 'aria-hidden': true, className: 'loader-blur' } : {};

        const { inputErrors, errors } = (this.state || {});

        const link = (e) => {
            this.setState({ inputErrors: undefined, errors: [] });
            this.props.setShowErrors(false);
            alert('!!!');
            e.preventDefault();
            return false;
        };

        return (
            <div className="App">
                <div {...dprops}>
                    <Header head="Checkout" doNotWalkTree />
                    <form>
                        <h2>Your payment details</h2>
                        {Field( CardNumber )}
                        {Field( CVV )}
                        {Field( NameOnCard )}
                        <br/>
                        {Field( ConsentSMS )}

                        {inputErrors &&
                            <div id="theErrors" tabIndex="0" className="alert alert-primary">
                                Please correct errors and continue {inputErrors}
                                <a href="/" onClick={link} tabIndex="0">Please enter a valid credit card number</a>
                                <a href="/" onClick={link} tabIndex="0">Please enter the CVV number</a>
                            </div>
                        }

                        {errors && errors.length>0 && <ErrorList errors={errors} />}

                        <p style={{ textAlign: 'right', marginTop: '12px' }}>
                            <Button onClick={this.goBack}>Cancel</Button>
                            <Button id="ShowPopup" onClick={this.openPop}>Popup</Button>
                            <Button onClick={this.checkErrs}>Check</Button>
                            <Button cnm="primary" onClick={this.doCheckout} >Make Payment</Button>
                        </p>

                        <p className="App-intro">
                            Terms & conditions
                            etc here
                        </p>

                        {Field( EmoField )}
                        {Field( FaxField )}

                        <p>&nbsp;</p>
                        <p>Thank you for your patience</p>
                    </form>
                </div>
                {loading && <Loader text={message}/>}
                {popup===1 && <TestPopup parent={this}/>}
                {popup>=2 && <PickerPopup parent={this} popupCode={popup}/>}
            </div>
        );
    }
}

export default FormConnect( FormSection(PaymentPage) );

// helpers

function Header ({ head }) {
    return (
        <header className="App-header">
            <img src={logo} className="App-logo" alt="logo"/>
            <h1 className="App-title">{head}</h1>
            <NavLinks/>
        </header>
    );
}

/*
class ButtonStrip extends React.PureComponent {
    render () {
        return (
            <p style={{ textAlign: 'right', marginTop: '12px' }}>
                {this.props.children}
            </p>
        );
    }
}
*/

// #######################   promise code   ###################################

function makePayment (page, values) {
    page.setState({ loading: true, message: 'Checking payment details...' });
    sendPayment(values)
        .then( (res) => showStatus(res, page, 'Checking stock and delivery schedule') )
        .then( (res) => sendPayment(res) )
        .then( (res) => showStatus(res, page, 'Transferring funds') )
        .then( (res) => sendPayment(res) )
        .then( (res) => showStatus(res, page, '', false) )
        .then( (res) => paymentFinished(res,values) )
        .catch( (e) => handleError(page,e) );
}

function showStatus (res, page, message, loading = true) {
    page.setState({ message, loading });
    return res;
}

function sendPayment (v) {
    return new Promise( (resolve) => {
        setTimeout( () => resolve(v), 1000 );
    });
}

function paymentFinished (response, thing) {
    console.log('paymentFinished',response);
    if (!response || thing.cvvNumber==='666')
        throw new Error('Validation of the CVV number failed');
    window.scrollTo(0,0);
    PageRouter.changePage('/tax-app');
}

function handleError (page, err) {
    page.setState({ message: 'Error occurred' });
    alert('An error occurred\n'+err);
    page.setState({ loading: false });
}

/*  TODO
    what if user presses back button ?
    promise will eventually resolve (or error)

    state vs redux
    press back then forward - should spinner still be there ?
*/
