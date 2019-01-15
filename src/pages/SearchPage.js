import React from 'react';
// import logo from '../logo.svg';
import store from "../startRedux";
import BigForm from '../sections/BigForm';
import PageRouter from '../components/PageRouter';
import IconLang from './IconLang';
import Loader from '../components/Loader';
import Button from "../components/Button";
import ListGroup from "../components/ListGroup";
import NavLinks from "../sections/NavLinks";
import {useBasePage} from "./BasePage";
import FormConnect from "../FormConnect";
import {translate} from "../components/AppConfig";

class SearchPage extends React.Component {

    goHomePage = () => {
        this.setState({ loading: true });
        setTimeout( () => {
            window.scrollTo(0,0);
            PageRouter.changePage('/tax-app');
        }, 3000);
    };

    render() {

        const clk = () => {
            console.log(store.getState().formState);
            PageRouter.changePage('/tax-app/checkout');
            return false;
        };

        const state = this.state || {};
        const loading = state.loading;
        const mainDivProps = loading ? { 'aria-disabled': true, 'aria-hidden': true, className: 'loader-blur' } : {};

        const ttl = translate('Search Page');

        return (
            <div className="App bg-light">
                <div {...mainDivProps}>
                    <header className="App-header">
                        <NavLinks owner={this} page={this.props.page}/>
                        <h1 className="App-title">
                            <IconLang style={{ verticalAlign: 'top' }}/>
                            {' '}
                            {ttl}
                        </h1>
                    </header>
                        <p>&nbsp;</p>
                        <div style={{ display: 'inline-block', verticalAlign: 'top', marginRight: '16px' }}>
                            <ListGroup value={state.hack} onClick={(v) => this.setState({ hack: v })}>
                                <div id="111">Some text</div>
                                <div id="222">First applicant</div>
                                <div id="333">Additional applicants</div>
                                <div id="444">Employment details<span className="fright">Error</span></div>
                                <div id="555" disabled>Summary</div>
                            </ListGroup>
                        </div>
                        <div style={{ display: 'inline-block', verticalAlign: 'top' }}>
                            <form style={{ marginTop: '-26px' }}>
                                <BigForm path="mainForm" name="bigForm" errorsAtTop />
                                <p style={{ textAlign: 'right' }}>
                                    <Button onClick={this.goHomePage} >Home page</Button>
                                    <Button cnm="primary" onClick={clk}>Continue</Button>
                                </p>
                            </form>
                        </div>
                    <p className="App-intro">
                        Thank you
                    </p>
                </div>
                {loading && <Loader/>}
            </div>
        );
    }
}

export default useBasePage( FormConnect( SearchPage ) );
