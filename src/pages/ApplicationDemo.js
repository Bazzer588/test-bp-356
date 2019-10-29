import React from 'react';
import {useBasePage} from "./BasePage";
import FormConnect from "../FormConnect";
import FormSection from "../FormSection";
import NavLinks from "../sections/NavLinks";
import ListGroup from "../components/ListGroup";
import {mockName, mockNumber, mockStreet} from "./mockData";

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
                    <small>{row.type}{': '}</small>
                    <br/>{row.fullName}
                </div>
            );
        })

    }

    render() {
        const state = this.state || {};
        const parts = this.parties();
        const {applicationNumber = '616629873'} = this.props;


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
                        <div id="111">
                            <small>Application {applicationNumber}</small>
                            <br/>
                            {dataSet.application.address}
                        </div>
                        {parts}
                        <div id="666">
                            + Add another applicant
                            <br/>
                            <small>or a dependant or other involved party</small>
                        </div>
                    </ListGroup>
                </div>

                {/*<pre style={{textAlign: 'left', margin: '12px'}}>*/}
                {/*    {JSON.stringify(dataSet, null, ' ')}*/}
                {/*</pre>*/}
            </>
        );
    }

}

export default useBasePage(FormConnect(FormSection(ApplicationDemo)));

const dataSet = (() => {
    const cc = mockNumber(4);
    const children = [];
    for (let n = 0; n < cc; n++) {
        children.push({
            type: 'Dependent Child',
            fullName: mockName(), // 'Mickey Vega'
        });
    }
    return {
        application: {
            address: (1 + mockNumber(82)) + ' ' + mockStreet() + ', Sheffield, S1 2DR'
        },
        involvedParties: [
            {
                type: 'Main Applicant',
                fullName: mockName(), // 'Vincent Vega',
                dob: '1982-08-17'
            },
            {
                type: 'Secondary Applicant',
                fullName: mockName(), // 'Carlina Corleone',
                dob: '1986-02-21'
            },
            ...children
        ]
    };
})();
