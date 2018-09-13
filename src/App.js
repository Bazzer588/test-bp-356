import React, {Component} from 'react';
import logo from './logo.svg';
import './App.css';
import TaxForm from './TaxForm3';
import store from './startRedux';

export default class App extends Component {
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
                    <TaxForm path="mainForm" name="personalRef"/>
                    <TaxForm path="mainForm" name="spouseRef"/>
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
