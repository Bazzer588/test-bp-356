import React from "react";
import PageRouter from "../components/PageRouter";

export class NavLinks extends React.PureComponent {

    docClick = () => {
        console.log('DOC CLICK');
        this.setState({ pop: false });
        document.removeEventListener('click',this.docClick);
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
                    <div className="telpopup" style={{ right: '0px', top: '30px', maxHeight: '990px' }}>
                        <button className="list-item" onClick={() => PageRouter.changePage('/tax-app/home')}>Home Page</button>
                        <button className="list-item" onClick={() => PageRouter.changePage('/tax-app/search')}>Search</button>
                        <button className="list-item" onClick={() => PageRouter.changePage('/tax-app/checkout')}>Checkout</button>
                        <hr/>
                        <button className="list-item" onClick={() => PageRouter.changePage('/tax-app/payment/837463')}>Order 1</button>
                        <button className="list-item" onClick={() => PageRouter.changePage('/tax-app/payment/716226')}>Order 2</button>
                        <hr/>
                        <button className="list-item" onClick={() => PageRouter.changePage('/tax-app/deals')}>Deals</button>
                    </div>
                }
            </div>
        );
    }
}
