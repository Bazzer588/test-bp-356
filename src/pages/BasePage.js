import React from 'react';
// import Loader from '../components/Loader';
import Button from "../components/Button";

const disabled = { 'aria-disabled': true, 'aria-hidden': true /*, className: 'loader-blur'*/ };

export default class BasePage extends React.Component {

    setPopup (pop) {
        this.setState({ ThePopup: pop });
    }

    fadeOutPopup (fn) {
        const p = document.getElementById('exampleModalLive');
        p.classList.add('modal-hiding');
        setTimeout( () => {
            this.setPopup(null);
            if (fn) fn();
        }, 300 );
    }

    render () {
        const { children } = this.props;
        const ThePopup = this.state && this.state.ThePopup;
        const divProps = ThePopup ? disabled : {};

        return (
            <div className="App bg-light">
                <div {...divProps}>
                    {children}
                </div>
                {ThePopup && renderPopup(this,ThePopup)}
            </div>
        );
    }
}

function renderPopup (parent, { title, content, buttons, noBkClose, noCancel }) {

    function onClose () {
        parent.setState({ ThePopup: null });
        foc('ShowPopup');       // TODO this button may not exist !!!
    }

    function fadeOut () {
        parent.fadeOutPopup();
    }

    function foc (id) {
        const p = document.getElementById(id);
        if (p) p.focus();
    }

    function eat (ev) {
        ev.stopPropagation();
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
                            {content}
                        </div>
                        <div className="modal-footer">
                            {noCancel ? null : <Button id="closePop" onClick={fadeOut}>Cancel</Button>}
                            {buttons}
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
