import React from 'react';
import logo from '../logo.svg';
import PageRouter from '../components/PageRouter';
import FormConnect from "../FormConnect";
import FormSection from "../FormSection";
import CheckBox from "../components/CheckBox";
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
        makePayment(this);
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

function Button ({ children, onClick, cnm = 'default' }) {
    return <button className={"btn btn-"+cnm} onClick={onClick} type="button">{children}</button>;
}

export default FormConnect( FormSection(PaymentPage) );

// promise code

function makePayment (page) {
    page.setState({ loading: true, message: 'Checking payment details' });
    sendPayment()
        .then( () => page.setState({ message: 'Checking stock and delivery schedule' }) )
        .then( () => sendPayment() )
        .then( () => page.setState({ message: 'Transferring funds' }) )
        .then( () => sendPayment() )
        .then( () => page.setState({ loading: false }) )
        .then( () => paymentFinished(1) )
        .catch( (e) => handleError(page,e) );
}

function sendPayment () {
    return new Promise( (resolve) => {
        setTimeout( () => resolve(), 1000 );
    });
}

function paymentFinished (response) {
    if (!response)
        throw new Error('Blah de blah');
    window.scrollTo(0,0);
    PageRouter.changePage('/tax-app');
}

function handleError (page, err) {
    page.setState({ loading: false });
    alert('An error occurred\n'+err);
}
