import React from 'react';
import {useBasePage, ModalPopup} from "./BasePage";
import {NavLinks} from "../sections/NavLinks";
import Button from "../components/Button";
import makeGenericSection from "../sections/GenericSection";
import FormSection from "../FormSection";
import FormConnect from "../FormConnect";
import {stringTypeField} from "../validation/validateString";
import {makeRepeatable} from "../FormListSection";
import {searchTypeField} from "../components/SmartSearch";

const Geno = makeGenericSection('testThing',[
    searchTypeField('cnid',{ required: true }),
    stringTypeField('price',{ required: true })
]);

const GList = makeRepeatable('thingList',Geno,true,{ addLabel: 'Add a thing' });

class RepeaterPage extends React.Component {

    static defaultProps = {
        name: 'repeaterPage',
        wrap: true
    };

    doSomething () {
        const { page } = this.props;
        page.fadeOutPopup( () => alert('done') );
    }

    render () {
        const { page, renderField } = this.props;
        return (
            <>
            <header className="App-header">
                <NavLinks/>
                <h1 className="App-title">
                    Repeater page
                </h1>
            </header>
            <form autoComplete="off">
                <p><br/>Yet another page...</p>
                <Button onClick={() => page.setPopupComp( MyPop, this )}>Component</Button>
                <Button onClick={() => popAlert({page, title: 'Warning', text: 'You better watch out'})}>Warning</Button>
                <Button onClick={() => popAlert({page, title: 'Info', text: 'Good news! Something good just happened.'})}>Info</Button>
                <Button onClick={() => popAlert({page, title: 'Values', text: JSON.stringify(this.props.value,null,' ')})}>Values</Button>
                <h2>List of things</h2>
                {renderField(GList)}
            </form>
            </>
        );
    }
}

export default useBasePage( FormConnect( FormSection(RepeaterPage) ) );

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

function popAlert ({page,title,text}) {
    page.setPopupComp(() => {
        return (
            <ModalPopup page={page} title={title}>
                <p>{text}</p>
            </ModalPopup>
        );
    });
}
