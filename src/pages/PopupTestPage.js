import React from 'react';
import Button from "../components/Button";
import BasePage from "./BasePage";
import {NavLinks} from "../sections/NavLinks";

export default class PopupTestPage extends React.Component {

    constructor (props) {
        super(props);
        this.myRef = React.createRef();
    }

    openWiz = () => {
        this.myRef.current.setPopup(Wiz1);
    };

    openDel = () => {
        this.myRef.current.setPopup(DeletePop);
    };

    openErr = () => {
        this.myRef.current.setPopup(ErrorPop);
    };

    openFatal = () => {
        this.myRef.current.setPopup(FatalErrorPop);
    };

    render () {
        return (
            <BasePage
                ref={this.myRef}
            >
                <header className="App-header">
                    <NavLinks/>
                    <h1 className="App-title">
                        Modal test page
                    </h1>
                </header>
                <form>
                    <p><br/>
                    This is the popup test page...
                    </p>
                    <Button onClick={() => console.log(this.myRef.current)}>Click me</Button>
                    <Button onClick={this.openWiz}>Wizard</Button>
                    <Button onClick={this.openDel}>Delete</Button>
                    <p><br/>Errors</p>
                    <Button onClick={this.openErr}>Error</Button>
                    <Button onClick={this.openFatal}>Fatal</Button>
                </form>
            </BasePage>
        );
    }

}


const Wiz1 = {
    title: 'This is a wizard',
    content: 'Here is some content in the first bit of this wizard. Text can be very long and will wrap at some point to the next line.',
    buttons:
        <>
            <Button cnm="secondary">Confirm</Button>
            <Button cnm="primary">Next</Button>
        </>
};

const DeletePop = {
    title: 'Delete 2nd Applicant',
    content:
        <div>
            <p>Please confirm</p>
            <p>Do you want to delete this applicant?</p>
            <p>You cannot undo this action</p>
        </div>,
    buttons:
            <Button cnm="primary">Delete Applicant</Button>
};

const ErrorPop = {
    title: 'Oops! Something went wrong',
    content:
        <div>
            <p>An error occurred when submitting your application.</p>
            <p>Please check your internet connection and retry.</p>
        </div>,
    buttons:
        <>
            <Button cnm="primary">Retry</Button>
        </>
};

const FatalErrorPop = {
    title: 'We are unable to continue with your booking',
    content:
        <div>
            <p>An internal error has occurred when processing your booking.</p>
            <p>Please call <b>0800 27636523</b> for technical support</p>
            <p>Your error reference number is <b>EX 8374</b></p>
        </div>,
    buttons: null
};
