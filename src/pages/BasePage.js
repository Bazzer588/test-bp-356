import React from 'react';
// import Loader from '../components/Loader';
import Button from "../components/Button";

const disabled = { 'aria-disabled': true, 'aria-hidden': true /*, className: 'loader-blur'*/ };

export default class BasePage extends React.Component {

    setPopup (pop) {
        this.setState({ ThePopup: pop, PopupComponent: null });
    }

    setPopupComp (cls,owner) {
        this.setState({ ThePopup: null, PopupComponent: cls, PopupOwner: owner });
    }

    fadeOutPopup = (fn) => {
        const p = document.getElementById('exampleModalLive');
        p.classList.add('modal-hiding');
        setTimeout( () => {
            this.setPopup(null);
            if (fn) fn();
        }, 300 );
    };

    render () {
        const { children } = this.props;
        const state = this.state || {};
        const ThePopup = state.ThePopup;
        const PopupComponent = state.PopupComponent;
        const divProps = (ThePopup || PopupComponent) ? disabled : {};

        return (
            <div className="App bg-light">
                <div {...divProps}>
                    {children}
                </div>
                {ThePopup && renderPopup({ page: this, ...ThePopup })}
                {PopupComponent && renderOuterPopup(this,PopupComponent,state.PopupOwner)}
            </div>
        );
    }
}

function foc (id) {
    const p = document.getElementById(id);
    if (p) p.focus();
}

function eat (ev) {
    ev.stopPropagation();
}

function renderPopup (props) {

    const { page, title, children, buttons, noBkClose, noCancel, renderButtons } = props;
    console.log('RENPOP',props);

    function onClose () {
        page.setState({ ThePopup: null, PopupComponent: null });
        foc('ShowPopup');       // TODO this button may not exist !!!
    }

    function fadeOut () {
        page.fadeOutPopup();
    }

    setTimeout( () => { foc('exampleModalLive'); }, 100); // focus to modal

    return (
        <>
            <div id="exampleModalLive" className="modal show" tabIndex="-1" role="dialog" aria-labelledby="exampleModalLiveLabel" style={{ display: 'block' }}
                 onClick={noBkClose ? undefined: fadeOut}
            >
                <div className="modal-dialog" role="document">
                    <div className="modal-content" onClick={eat}>
                        <div className="modal-header" tabIndex="0" onFocus={() => foc('closePop')}>
                            <h5 className="modal-title" id="exampleModalLiveLabel">{title}</h5>
                            {!noCancel &&
                                <button type="button" className="close" aria-label="Close" onClick={onClose}>
                                    <span aria-hidden="true">×</span>
                                </button>
                            }
                        </div>
                        <div className="modal-body">
                            {children}
                        </div>
                        <div className="modal-footer">
                            {noCancel ? null : <Button id="closePop" onClick={fadeOut}>Cancel</Button>}
                            {buttons}
                            {renderButtons && renderButtons()}
                        </div>
                    </div>
                </div>
            </div>
            <div className="modal-backdrop" tabIndex="0" onFocus={() => foc('closePop')}/>
        </>
    );
}

/*
    modal-backdrop is the dark layer with 0.5 opacity
*/

function renderOuterPopup (page, Thing, owner) {

    setTimeout( () => { foc('exampleModalLive'); }, 100); // focus to modal

    return (
        <>
            <div id="exampleModalLive" className="modal show" tabIndex="-1" role="dialog" aria-labelledby="exampleModalLiveLabel" style={{ display: 'block' }}
                 onClick={() => page.fadeOutPopup()}
            >
                <div className="modal-dialog" role="document">
                    <Thing page={page} owner={owner}/>
                </div>
            </div>
            <div className="modal-backdrop" tabIndex="0" onFocus={() => foc('closePop')}/>
        </>
    );
}

function innerPopup ({ page, owner, title, children, buttons, renderButtons, noCancel }) {

    function onClose () {
        page.setState({ ThePopup: null, PopupComponent: null });
        foc('ShowPopup');       // TODO this button may not exist !!!
    }

    return (
        <div id="theModalContent" className="modal-content" onClick={eat}>
            <div className="modal-header" tabIndex="0" onFocus={() => foc('closePop')}>
                <h5 className="modal-title" id="exampleModalLiveLabel">{title}</h5>
                {!noCancel &&
                <button type="button" className="close" aria-label="Close" onClick={onClose}>
                    <span aria-hidden="true">×</span>
                </button>
                }
            </div>
            <div className="modal-body">
                {children}
            </div>
            <div className="modal-footer">
                {noCancel ? null : <Button id="closePop" onClick={() => page.fadeOutPopup()}>Cancel</Button>}
                {buttons}
                {renderButtons && renderButtons()}
            </div>
        </div>
    );
}

export const ModalPopup = innerPopup;
