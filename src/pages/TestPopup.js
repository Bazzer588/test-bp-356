import React from 'react';
import './popup.scss';
import Button from "../components/Button";

export default function TestPop ({ parent }) {

    function eat (ev) {
        ev.stopPropagation();
    }

    function switchPopup () {
        parent.setState({ popup: 2 });
    }

    function onClose () {
        parent.setState({ popup: 0 });
        foc('ShowPopup');
    }

    function fadeOut () {
        const p = document.getElementById('exampleModalLive');
        p.classList.add('modal-hiding');
        setTimeout( () => { onClose(); }, 300 );
    }

    const title = 'Cancel this purchase?';
    const content = (
        <>
            <p>You can cancel this purchase now.</p>
            <p>Your basket will be empty of products</p>
        </>
    );

    setTimeout( () => { foc('exampleModalLive'); }, 100); // focus to modal

    return (
        <>
            <div key="bejupo" id="exampleModalLive" className="modal show" tabIndex="-1" role="dialog" aria-labelledby="exampleModalLiveLabel" style={{ display: 'block' }}
                onClick={fadeOut}
            >
                <div className="modal-dialog" role="document">
                    <div className="modal-content" onClick={eat}>
                        <div className="modal-header" tabIndex="0" onFocus={() => foc('closePop')}>
                            <h5 className="modal-title" id="exampleModalLiveLabel">{title}</h5>
                            <button type="button" className="close" aria-label="Close" onClick={onClose}>
                                <span aria-hidden="true">×</span>
                            </button>
                        </div>
                        <div className="modal-body">
                            {content}
                        </div>
                        <div className="modal-footer">
                            <Button id="closePop" onClick={fadeOut}>Cancel</Button>
                            <button type="button" className="btn btn-secondary" onClick={switchPopup}>Next</button>
                            <button type="button" className="btn btn-primary" onClick={fadeOut}>Save changes</button>
                        </div>
                    </div>
                </div>
            </div>
            <div className="modal-backdrop" tabIndex="0" onFocus={() => foc('closePop')}/>
        </>
    );
}

function foc (id) {
    const p = document.getElementById(id);
    if (p) p.focus();
}
