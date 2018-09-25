import React from 'react';
import logo from '../logo.svg';
import PageRouter from '../components/PageRouter';
import FormConnect from "../FormConnect";
import FormSection from "../FormSection";
import CheckBox from "../components/CheckBox";
import Button from "../components/Button";
import {stringTypeField} from "../validation/validateString";
import Loader from '../components/Loader';

// declare fields

const CardNumber = stringTypeField( 'cardNumber', { minLength: 16, maxLength: 16, type: 'tel', required: true });
const CVV = stringTypeField( 'cvvNumber', { minLength: 3, maxLength: 4, type: 'tel', required: true, inputClass: 'tiny', pattern: '^[0-9]+$' });
const NameOnCard = stringTypeField( 'nameOnCard', {maxLength: 40, minLength: 4, inputClass: 'upper-case', required: true, spellCheck: false, pattern: '^[a-zA-Z ]+$' });
const ConsentSMS = { name: 'smsTrack', component: CheckBox, showLabel: false, label: 'Please send me SMS messages to track my order.' };

// page class

class PaymentPage extends React.Component {

    static defaultProps = {
        name: 'checkOutForm',
        path: 'paymentPage'
    };

    doCheckout = () => {
        // const P = new Promise( (resolve, reject) => {} );
        /*

        this.setState({ loading: true, message: 'Checking payment details' });
        setTimeout( () => {
            this.setState({ message: 'Checking stock and transportation' });
            setTimeout( () => {
                this.setState({ message: 'Transferring funds' });
                setTimeout( () => {
                    window.scrollTo(0,0);
                    PageRouter.changePage('/tax-app');
                }, 2000);
            }, 1500);
        }, 1500);
        */
        console.log('CHGECKOUT',this.props.value);
        makePayment(this,this.props.value);
    };

    render() {
        const Field = this.props.renderField;

        const { loading, message } = this.state || {};
        const dprops = loading ? { 'aria-disabled': true, 'aria-hidden': true, className: 'loader-blur' } : {};

        return (
            <div className="App">
                <div {...dprops}>
                    <header className="App-header">
                        <img src={logo} className="App-logo" alt="logo"/>
                        <h1 className="App-title">Checkout</h1>
                    </header>
                    <form>
                        <h2>Your payment details</h2>
                        {Field( CardNumber )}
                        {Field( CVV )}
                        {Field( NameOnCard )}
                        <br/>
                        {Field( ConsentSMS )}

                        <p style={{ textAlign: 'right' }}>
                            <Button onClick={() => { window.history.back(); }}>Cancel</Button>
                            {' '}
                            <Button cnm="primary" onClick={this.doCheckout} >Make Payment</Button>
                        </p>
                    </form>
                    <p className="App-intro">
                        Terms & conditions
                        etc here
                    </p>
                </div>
                {loading && <Loader text={message}/>}
            </div>
        );
    }
}

export default FormConnect( FormSection(PaymentPage) );

// #######################   promise code   ###################################

function makePayment (page, values) {
    page.setState({ loading: true, message: 'Checking payment details...' });
    sendPayment(values)
        .then( (res) => showStatus(res, page, 'Checking stock and delivery schedule') )
        .then( (res) => sendPayment(res) )
        .then( (res) => showStatus(res, page, 'Transferring funds') )
        .then( (res) => sendPayment(res) )
        .then( (res) => showStatus(res, page, '', false) )
        .then( () => paymentFinished(1,values) )
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
