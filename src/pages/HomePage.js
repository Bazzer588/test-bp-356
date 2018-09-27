import React from 'react';
import logo from '../logo.svg';
import store from "../startRedux";
import TaxForm from '../sections/TaxForm3';
import BigForm from '../sections/BigForm';
import PageRouter from '../components/PageRouter';
import Button from "../components/Button";

export default class HomePage extends React.Component {

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
                    <img src={logo} className="App-logo" alt="logo"/>
                    <h1 className="App-title">Tax calculator application</h1>
                </header>
                <form>
                    <TaxForm path="mainForm" name="personalRef" requireCountry/>
                    <TaxForm path="mainForm" name="spouseRef" allowArgentina={false}/>
                    <BigForm path="mainForm" name="bigForm" />
                    <p style={{ textAlign: 'right' }}>
                        <Button onClick={() => PageRouter.changePage('/tax-app/search')} >Search</Button>
                        <Button cnm="secondary" onClick={reset} >Reset</Button>
                        <Button cnm="primary" onClick={clk}>Continue</Button>
                    </p>
                </form>
                <p className="App-intro">
                    Thank you
                </p>
            </div>
        );
    }
}
