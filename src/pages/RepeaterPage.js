import React from 'react';
import {useBasePage, ModalPopup} from "./BasePage";
import {NavLinks} from "../sections/NavLinks";
import Button from "../components/Button";

class RepeaterPage extends React.Component {

    doSomething () {
        const { page } = this.props;
        page.fadeOutPopup( () => alert('done') );
    }

    render () {
        const { page } = this.props;
        return (
            <>
            <header className="App-header">
                <NavLinks/>
                <h1 className="App-title">
                    Repeater page
                </h1>
            </header>
            <form>
                <p><br/>Yet another page...</p>
                <Button onClick={() => page.setPopupComp( MyPop, this )}>Component</Button>
                <Button onClick={() => popAlert(page,'Warning','You better watch out')}>Warning</Button>
                <Button onClick={() => popAlert(page,'Info','Good news! Something good just happened.')}>Info</Button>
            </form>
            </>
        );
    }
}

export default useBasePage(RepeaterPage);

/** a popup */

function MyPop ({ page, owner }) {
    return (
        <ModalPopup
            continueAction={() => owner.doSomething()}
            title="Here we go"
            page={page}
        >
            <p>Yet another popup here</p>
        </ModalPopup>
    );
}

/** generic popup */

function popAlert (page,title,text) {
    page.setPopupComp(() => {
        return (
            <ModalPopup page={page} title={title}>
                <p>{text}</p>
            </ModalPopup>
        );
    });
}
