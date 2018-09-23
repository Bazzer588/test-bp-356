import React from 'react';
import logo from '../logo.svg';
import store from "../startRedux";
import BigForm from '../sections/BigForm';
import PageRouter from '../components/PageRouter';
import IconLang from './IconLang';
import Loader from '../components/Loader';

export default class SearchPage extends React.Component {

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
            return false;
        };

        const loading = this.state && this.state.loading;
        const dprops = loading ? { 'aria-disabled': true, 'aria-hidden': true, className: 'loader-blur' } : {};

        return (
            <div className="App bg-light">
                <div {...dprops}>
                    <header className="App-header">
                        <img src={logo} className="App-logo" alt="logo"/>
                        <h1 className="App-title">Search page</h1>
                        {' '}
                        <IconLang/>
                    </header>
                    <form>
                        <BigForm path="mainForm" name="bigForm" />
                        <p style={{ textAlign: 'right' }}>
                            <Button onClick={this.goHomePage} >Home page</Button>
                            {' '}
                            <Button cnm="primary" onClick={clk}>Continue</Button>
                        </p>
                    </form>
                    <p className="App-intro">
                        Thank you
                    </p>
                </div>
                {loading && <Loader/>}
            </div>
        );
    }
}

function Button ({ children, onClick, cnm = 'default' }) {
    return <button className={"btn btn-"+cnm} onClick={onClick} type="button">{children}</button>;
}
