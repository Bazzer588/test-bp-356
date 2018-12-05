import React from "react";
import PageRouter from "../components/PageRouter";

export class NavLinks extends React.PureComponent {

    docClick = () => {
        console.log('DOC CLICK');
        this.setState({ pop: false });
        document.removeEventListener('click',this.docClick);
    };

    link = (path) => {
        this.setState({ pop: false });
        document.removeEventListener('click',this.docClick);
        setTimeout( () => {
            PageRouter.changePage(path);
        }, 25 );
    };

    btn = () => {
        const state = this.state || {};
        this.setState({ pop: !state.pop });
        if (!state.pop) {
            document.addEventListener('click',this.docClick);
        }
    };

    render () {
        const pop = this.state && this.state.pop;
        return (
            <div className="phone-input" style={{ position: 'absolute', right: '12px', top: '20px' }}>
                <button onClick={this.btn} className="btn btn-secondary btn-mini" type="button" style={{ float: 'right', padding: '0 6px' }}>&#9776;</button>
                {pop &&
                    <div className="telpopup" style={{ right: '0px', top: '30px', maxHeight: '990px', borderColor: '#777' }}>
                        <button className="list-item" onClick={() => this.link('/tax-app/home')}>Home Page</button>
                        <button className="list-item" onClick={() => this.link('/tax-app/search')}>Search</button>
                        <button className="list-item" onClick={() => this.link('/tax-app/checkout')}>Checkout</button>
                        <hr role="presentation"/>
                        <button className="list-item" onClick={() => this.link('/tax-app/payment/837463')}>Order 1</button>
                        <button className="list-item" onClick={() => this.link('/tax-app/payment/716226')}>Order 2</button>
                        <button className="list-item" onClick={() => this.link('/tax-app/repeat')}>Repeat</button>
                        <hr role="presentation"/>
                        <button className="list-item" onClick={() => this.link('/tax-app/deals')}>Deals</button>
                        <button className="list-item" onClick={() => this.link('/tax-app/another')}>Another Page</button>
                        <hr role="presentation"/>
                        <button className="list-item" onClick={() => this.link('/tax-app/code-split')}>Code Split 1</button>
                        <button className="list-item" onClick={() => this.link('/tax-app/code-split2')}>Code Split 2</button>
                    </div>
                }
            </div>
        );
    }
}
