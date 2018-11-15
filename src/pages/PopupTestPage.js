import React from 'react';
import Button from "../components/Button";
import BasePage, {ModalPopup} from "./BasePage";
import {NavLinks} from "../sections/NavLinks";
import Select from "../components/Select";
import Radios from "../components/Radios";
import CheckBox from "../components/CheckBox";

export default class PopupTestPage extends React.Component {

    constructor (props) {
        super(props);
        this.myRef = React.createRef();
    }

    popup (fn,props) {
        const page = this.myRef.current;
        page.setPopup( fn({ page, compo: this, ...props }) );
    }

    popupComp (cls, props) {
        const page = this.myRef.current;
        page.setPopupComp( cls, this, props );
    }

    openWiz = () => {
        this.popup( Wiz1, {index: 7} );
    };

    deleteApplicant (i) {
        this.myRef.current.fadeOutPopup(
            () => console.log('Del appl '+i)
        );
    };

    openDel = () => {
        this.popup( DeletePopFn, { index: 2 } );
    };

    retryThing () {
        this.myRef.current.fadeOutPopup(
            () => console.log('Retry now')
        );
    }

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
                    <p><br/>This is the popup test page...</p>
                    <Button onClick={this.openWiz}>Wizard</Button>
                    <Button onClick={this.openDel}>Delete</Button>
                    <p><br/>Errors</p>
                    <Button onClick={() => this.popup(ErrorPop)}>Error</Button>
                    <Button onClick={() => this.popup(FatalError)}>Fatal</Button>
                    <p><br/>Test</p>
                    <Button onClick={() => console.log(this.myRef.current)}>Debug</Button>
                    <Button onClick={() => this.popupComp(WizTestAgain)}>Component</Button>
                </form>
            </BasePage>
        );
    }

}

function Wiz1 ({ page, compo, index }) {

    function next () { page.setPopup(Wiz2({page,compo,index})) }

    let rad = '';
    function pra (ev) {
        rad = ev.target.value;
        console.log(rad);
    }

    return {
        title: 'This is a wizard',
        children:
            <div>
                Here is some content in the first bit of this wizard. Text can be very long and will wrap at some point to the next line.
                <Radios options="languages" label="ChooseLanguage" onChange={pra} value={rad}/>
            </div>,
        buttons:
            <>
                <Button onClick={() => page.setPopup(DeletePopFn({page,compo,index}))} cnm="secondary">Confirm</Button>
                <Button onClick={next} cnm="primary">Next</Button>
            </>
    };
}

function Wiz2 ({ page, compo, index }) {

    function back () { page.setPopup(Wiz1({page,compo,index})) }
    function next () { page.setPopup(Wiz3({page,compo,index})) }
    function onLang () {}

    return {
        title: 'Second popup',
        children:
            <div>
                <p>This is the second popup which replaces the first</p>
                <p>Pick a language</p>
                <Select options="languages" onChange={onLang}/>
            </div>,
        buttons:
            <>
                <Button onClick={back} cnm="secondary">Back</Button>
                <Button onClick={next} cnm="primary">Next</Button>
            </>
    };
}


function Wiz3 ({ page, compo, index }) {

    function back () { page.setPopup(Wiz2({page,compo,index})) }
    function next () { page.setPopup(ErrorPop({page,compo})) }

    /*function foo (ev) {
        console.log(ev.target.value);
        page.setState({ bar: Date.now(), chkkk: ev.target.value });
    }*/

    const value = page.state.chkkk;
    console.log('RENDER WIZ3',value);

    return {
        title: 'Final Stage',
        children:
            <WizFinale/>,
        buttons:
            <>
                <Button id="closePop" onClick={back} cnm="secondary">Back</Button>
                <Button onClick={next} cnm="primary">Next</Button>
            </>,
        noCancel: true,
        noBkClose: true
    };
}

class WizFinale extends React.Component {
    onLang = (ev) => { this.setState({ lang: ev.target.value }); };
    cb = (ev) => { this.setState({ value: ev.target.value }); };
    render () {
        const st = this.state || {};
        return (
            <div>
                <p>Please confirm your language</p>
                <Select options="languages" value={st.lang} onChange={this.onLang}/>
                <div style={{ height: '12px' }}/>
                <CheckBox id="wibbleBats" label="I confirm I agree to all the terms and conditions." value={st.value} onChange={this.cb}/>
            </div>
        );
    }
}

/** ---- popup to prompt for delete ----------------------------------- */

function DeletePopFn ({ page, compo, index }) {
    return ({
        title: 'Delete Applicant #'+(index+1),
        children:
            <div>
                <p>Please confirm</p>
                <p>Do you want to delete this applicant?</p>
                <p>You cannot undo this action</p>
            </div>,
        buttons:
            <Button onClick={() => compo.deleteApplicant(index)} cnm="primary">Delete Applicant</Button>
    });
}

/** error popup where you must click 'Exit' or 'Retry' */

const ErrorPop = ({page, compo}) => { return {
    title: 'Oops! Something went wrong',
    children:
        <div>
            <p>An error occurred when submitting your application.</p>
            <p>Please check your internet connection and retry.</p>
        </div>,
    buttons:
        <>
            <Button id="closePop" onClick={() => page.fadeOutPopup()}>Exit Application</Button>
            <Button onClick={() => compo.retryThing()} cnm="primary">Retry</Button>
        </>,
    noCancel: true,
    noBkClose: true
}};

/** error popup with just a close button */

function FatalError () {
    return {
        title: 'We are unable to continue with your booking',
        children:
            <div>
                <p>An internal error has occurred when processing your booking.</p>
                <p>Please call <b>0800 27636523</b> for technical support</p>
                <p>Your error reference number is <b>EX 8374</b></p>
            </div>,
        buttons: null,
        noBkClose: true,
        popupClass: 'fatal'
    };
}

/** try this */

function slideOut (t,c,dest) {
    const p = document.getElementById('theModalContent');
    p.classList.add(c);
    setTimeout(() => {
        const { page, owner } = t.props;
        p.classList.remove(c);
        page.setPopupComp(dest,owner);
    },200);
}

class WizTestAgain extends React.Component {

    /*slide = () => {
        const p = document.getElementById('theModalContent');
        p.classList.add('div-deleting');
        //page.setPopup(Wiz1({page}))
        setTimeout(() => {
            const { page, owner } = this.props;
            p.classList.remove('div-deleting');
            page.setPopupComp(WizTestSecond,owner);

        },200);
    };*/

    buttons = () => {
        const { page } = this.props;
        return (
            <>
                <Button onClick={() => page.fadeOutPopup()}>Goodbye</Button>
                <Button onClick={() => slideOut(this,'div-deleting',WizTestSecond)} cnm="primary">Next</Button>
            </>
        );
    };

    render () {
        const { page, replace } = this.props;
        return (
            <ModalPopup
                title="Here's a component popup"
                renderButtons={this.buttons}
                page={page}
                replace={replace}
            >
                <p>Hello this is a popup</p>
                <p>This one's a component</p>
            </ModalPopup>
        );
    }
}

class WizTestSecond extends React.Component {

    onLang = (ev) => { this.setState({ lang: ev.target.value }); };
    cb = (ev) => { this.setState({ value: ev.target.value }); };

    render () {
        const { page, owner, replace } = this.props;
        const st = this.state || {};

        const buttons = (
            <>
                <Button onClick={() => page.setPopupComp(WizTestAgain,owner,{ ani: 'back' })}>Back</Button>
                <Button onClick={() => slideOut(this,'div-deleting',WizTestThird)} cnm="primary">Next</Button>
            </>
        );

        return (
            <ModalPopup
                title="And here's a second popup"
                buttons={buttons}
                page={page}
                replace={replace}
            >
                <p>Yes this is boring</p>
                <p>Yet another popup here</p>
                <p>Please confirm your language</p>
                <Select options="languages" value={st.lang} onChange={this.onLang}/>
                <div style={{ height: '12px' }}/>
                <CheckBox id="wibbleBats" label="I confirm I agree to all the terms and conditions." value={st.value} onChange={this.cb}/>
            </ModalPopup>
        );
    }
}

function WizTestThird ({ page, owner, replace }) {

    const buttons = (
        <>
            <Button onClick={() => page.setPopupComp(WizTestSecond,owner,{ ani: 'back' })}>Back</Button>
            <Button id="closePop" onClick={() => owner.retryThing()} cnm="primary">Retry</Button>
        </>
    );

    return (
        <ModalPopup
            title="Third great popup"
            buttons={buttons}
            noCancel
            page={page}
            replace={replace}
        >
            <p>Yet another popup here</p>
        </ModalPopup>
    );
}
