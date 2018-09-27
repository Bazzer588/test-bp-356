import React from 'react';
// import logo from '../logo.svg';
import store from "../startRedux";
import BigForm from '../sections/BigForm';
import PageRouter from '../components/PageRouter';
import IconLang from './IconLang';
import Loader from '../components/Loader';
import Button from "../components/Button";

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
            PageRouter.changePage('/tax-app/checkout');
            return false;
        };

        const loading = this.state && this.state.loading;
        const dprops = loading ? { 'aria-disabled': true, 'aria-hidden': true, className: 'loader-blur' } : {};

        return (
            <div className="App bg-light">
                <div {...dprops}>
                    <header className="App-header">
                        <h1 className="App-title">
                            <IconLang style={{ verticalAlign: 'top' }}/>
                            {' '}
                            Search page
                        </h1>
                    </header>
                    <form>
                        <BigForm path="mainForm" name="bigForm" />
                        <p style={{ textAlign: 'right' }}>
                            <Button onClick={this.goHomePage} >Home page</Button>
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
