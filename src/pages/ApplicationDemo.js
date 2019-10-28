import React from 'react';
import {useBasePage} from "./BasePage";
import FormConnect from "../FormConnect";
import FormSection from "../FormSection";
import NavLinks from "../sections/NavLinks";
import ListGroup from "../components/ListGroup";

export class ApplicationDemo extends React.Component {

    static defaultProps = {
        name: 'appDemo',
        //path: 'dealsPage'
        wrap: true
    };

    parties() {
        return dataSet.involvedParties.map((row, index) => {
            const id = 'INV' + index;
            return (
                <div id={id} key={id}>
                    {row.type}{': '}{row.fullName}
                </div>
            );
        })

    }

    render() {
        const state = this.state || {};
        const parts = this.parties();

        return (
            <>
                <header className="App-header">
                    <NavLinks owner={this} page={this.props.page}/>
                    <h1 className="App-title">
                        Application Demo
                    </h1>
                </header>

                <div style={{maxWidth: '400px', margin: '12px'}}>
                    <ListGroup value={state.hack} onClick={(v) => this.setState({hack: v})}>
                        <div id="111">Application 8785566546</div>
                        {parts}
                        <div id="666">+ Add another applicant</div>
                    </ListGroup>
                </div>

                <pre style={{textAlign: 'left', margin: '12px'}}>
                    {JSON.stringify(dataSet, null, ' ')}
                </pre>
            </>
        );
    }

}

export default useBasePage(FormConnect(FormSection(ApplicationDemo)));

const dataSet = {
    application: {},
    involvedParties: [
        {
            type: 'Main Applicant',
            fullName: 'Vincent Vega',
            dob: '1982-08-17'
        },
        {
            type: 'Secondary Applicant',
            fullName: 'Carlina Corleone',
            dob: '1986-02-21'
        },
        {
            type: 'Dependent Child',
            fullName: 'Mickey Vega'
        },
        {
            type: 'Dependent Child',
            fullName: 'Luca Corleone'
        },

    ]
};
