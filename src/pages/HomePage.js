import React from 'react';
import logo from '../logo.svg';
import store from "../startRedux";
import TaxForm from '../sections/TaxForm3';
import BigForm from '../sections/BigForm';
import PageRouter from '../components/PageRouter';
import Button from "../components/Button";
import NavLinks from "../sections/NavLinks";
import {useBasePage} from "./BasePage";
import {translate} from "../components/AppConfig";
// import walkTree from "../validation/walkTree";

class HomePage extends React.Component {

    constructor (props) {
        super(props);
        this.bigFormRef = React.createRef();
        this.things = {};
    }

    setRef = (name,it) => {
        this.things[name] = it;
    };

    render() {

        const clk = () => {
            console.log(store.getState().formState);
            PageRouter.changePage('/tax-app/search');
            return false;
        };

        function reset () {
            console.log(store.getState().formState);
            alert('reset todo');
        }

        return (
            <div className="App bg-light">
                <header className="App-header">
                    <NavLinks page={this.props.page}/>
                    <img src={logo} className="App-logo" alt="logo"/>
                    <h1 className="App-title">{translate('Home page title')}</h1>
                </header>
                <form autoComplete="off">
                    <TaxForm path="mainForm" name="personalRef" requireCountry/>
                    <TaxForm path="mainForm" name="spouseRef" allowArgentina={false}/>
                    <BigForm path="mainForm" name="bigForm" ref={this.bigFormRef} owner={this} setRef={this.setRef}/>
                    <p style={{ textAlign: 'right' }}>
                        <Button onClick={() => this.things.bigForm.checkErrors()} >Errors</Button>
                        <Button onClick={() => PageRouter.changePage('/tax-app/search')} >Search</Button>
                        <Button cnm="secondary" onClick={reset} >Reset</Button>
                        <Button cnm="primary" onClick={clk}>Continue</Button>
                    </p>
                </form>
                <p className="App-intro">
                    Thank you.
                </p>
            </div>
        );
    }
}

export default useBasePage(HomePage);
