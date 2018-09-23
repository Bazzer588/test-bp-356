import React from 'react';
import logo from './logo.svg';
import './App.css';
import TaxForm from './sections/TaxForm3';
import BigForm from './sections/BigForm';
import store from './startRedux';
import PageRouter from './components/PageRouter';

export default class App extends React.Component {

    render() {

        const clk = () => {
            console.log(store.getState().formState);
            return false;
        };

        return (
            <div className="App bg-light">
                <header className="App-header">
                    <img src={logo} className="App-logo" alt="logo"/>
                    <h1 className="App-title">Tax calculator app</h1>
                </header>
                <form>
                    <TaxForm path="mainForm" name="personalRef" requireCountry/>
                    <TaxForm path="mainForm" name="spouseRef" allowArgentina={false}/>
                    <BigForm path="mainForm" name="bigForm" />
                    <p style={{ textAlign: 'right' }}>
                        <Button onClick={clk} >Reset</Button>
                        {' '}
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

function Button ({ children, onClick, cnm = 'default' }) {
    return <button className={"btn btn-"+cnm} onClick={onClick} type="button">{children}</button>;
}

/*
    wrap with this to see warnings
    <React.StrictMode>

 */
