import React from 'react';
import {useBasePage, ModalPopup} from "./BasePage";
import NavLinks from "../sections/NavLinks";
import Button from "../components/Button";
import makeGenericSection from "../sections/GenericSection";
import FormSection from "../FormSection";
import FormConnect from "../FormConnect";
import {stringTypeField} from "../validation/validateString";
import {makeRepeatable} from "../FormListSection";
import {searchTypeField} from "../components/SmartSearch";
import {fetchAirports} from "./fetchAirports";
import PDFButton from "./PDFButton";

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

    testApi = () => {
        const { value, page } = this.props;
        const v = value.findAirport;
        fetchAirports(v)
            .then( list => {
                console.log('PAGE GOT',list);

                if (Array.isArray(list)) {
                    const rows = [];
                    list.forEach( port => {
                        rows.push(
                            <tr key={port.Code}>
                                <td title={JSON.stringify(port,null,' ')}>{port.Code}</td>
                                <td>{port.City}</td>
                                <td>{port.Name}</td>
                                <td>{port.Country}</td>
                                <td>{port.T}</td>
                            </tr>
                        );
                    });
                    const text = <table className="genTable"><tbody>{rows}</tbody></table>;
                    popAlert({page, title: 'Aeropuertos', text });
                    return;
                }

                popAlert({page, title: 'Airports', text: JSON.stringify(list) });
            });
    };

    render () {
        const { page, renderField } = this.props;
        return (
            <>
            <header className="App-header">
                <NavLinks owner={this} page={page}/>
                <h1 className="App-title">
                    Repeat page
                </h1>
            </header>
            <form autoComplete="off" onSubmit={(e) => { e.preventDefault(); console.log('WTF'); this.testApi(); }}>
                <p><br/>Yet another page...</p>
                <Button onClick={() => page.setPopupComp( MyPop, this )}>Component</Button>
                <Button onClick={() => popAlert({page, title: 'Warning', text: 'You better watch out'})}>Warning</Button>
                <Button onClick={() => popAlert({page, title: 'Info', text: 'Good news! Something good just happened.'})}>Info</Button>
                <Button onClick={() => popAlert({page, title: 'Values', text: JSON.stringify(this.props.value,null,' ')})}>Values</Button>
                {renderField(stringTypeField('findAirport'))}
                <br/>
                <Button onClick={this.testApi}>Find</Button>
                <h2>List of things</h2>
                {renderField(GList)}
                <h3>Download PDF</h3>
                <p>
                    <PDFButton parent={this}/>
                </p>
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
                {text}
            </ModalPopup>
        );
    });
}
