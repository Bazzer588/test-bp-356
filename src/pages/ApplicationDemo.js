import React from 'react';
import { useBasePage } from './BasePage';
import FormConnect from '../FormConnect';
import FormSection from '../FormSection';
import NavLinks from '../sections/NavLinks';
import ListGroup from '../components/ListGroup';
import { getDataSet } from './mockData';
import { translate } from '../components/AppConfig';
import './ApplicationDemo.scss';

export class ApplicationDemo extends React.Component {

    static defaultProps = {
        name: 'appDemo',
        //path: 'dealsPage'
        wrap: true,
        applicationNumber: '666'
    };

    constructor (props) {
        super(props);
        const { applicationNumber } = this.props;
        this.appNumber = applicationNumber === '666' ? Date.now() * Math.random() & 0xFFFFF : applicationNumber;
        this.dataSet = getDataSet(this.appNumber);
    }

    parties () {
        return this.dataSet.involvedParties.map((row, index) => {
            const id = 'INV' + index;
            return (
                <div id={id} key={id}>
                    <small>{translate(row.type)}{': '}</small>
                    <br/>{row.fullName}
                </div>
            );
        })

    }

    render () {
        const state = this.state || {};
        const parts = this.parties();
        // const { applicationNumber = '616629873' } = this.props;

        // state.selectedTopLevel - APP, INV0 ... INV4, ADD
        const { selectedTopLevel = 'APP' } = state;

        return (
            <>
                <header className="App-header">
                    <NavLinks owner={this} page={this.props.page}/>
                    <h1 className="App-title">
                        {translate('Application Demo')}
                    </h1>
                </header>

                <div className="appDemo">

                    <div className={'appDemoLeftPanel'}>
                        <ListGroup value={selectedTopLevel} onClick={(v) => this.setState({ selectedTopLevel: v })}>
                            <div id="APP">
                                <small>{translate('Application')} {this.appNumber}</small>
                                <br/>
                                {this.dataSet.application.address}
                            </div>
                            {parts}
                            <div id="ADD">
                                {translate('addApplicant')}
                                <br/>
                                <small>{translate('addApplicant2')}</small>
                            </div>
                        </ListGroup>
                    </div>

                    <div className={'appDemoRightPanel'}>
                        {selectedTopLevel}
                    </div>

                </div>

                {/*<pre style={{textAlign: 'left', margin: '12px'}}>*/}
                {/*    {JSON.stringify(dataSet, null, ' ')}*/}
                {/*</pre>*/}
            </>
        );
    }

}

export default useBasePage(FormConnect(FormSection(ApplicationDemo)));
