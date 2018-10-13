import React from 'react';
import './popup.scss';
import Select from "../components/Select";
import Button from "../components/Button";

export default function PickerPop ({ parent, popupCode }) {

    function eat (ev) {
        ev.stopPropagation();
    }

    function backPopup () {
        parent.setState({ popup: 1 });
    }

    function nextPopup () {
        parent.setState({ popup: popupCode===2 ? 3 : 2 });
    }

    function onClose () {
        parent.setState({ popup: false });
        foc('ShowPopup');
    }

    function fadeOut () {
        const p = document.getElementById('exampleModalLive');
        p.classList.add('modal-hiding');
        setTimeout( () => { onClose(); }, 300 );
    }

    function onLang (ev) {
        console.log('LANG',ev.target.value);
    }

    const title = 'Choose your language';
    const content2 = (
        <>
            <p>Pick a language</p>
            <Select options="languages" onChange={onLang}/>
        </>
    );
    const content3 = <p>Another popup</p>;

    setTimeout( () => { foc('exampleModalLive'); }, 100); // focus to modal

    return (
        <>
            <div id="exampleModalLive" className="modal show" tabIndex="-1" role="dialog" aria-labelledby="exampleModalLiveLabel" style={{ display: 'block' }}
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
                            {popupCode===2 ? content2 : content3}
                        </div>
                        <div className="modal-footer">
                            <Button id="closePop" onClick={fadeOut}>Cancel</Button>
                            <button type="button" className="btn btn-secondary" onClick={backPopup}>Back</button>
                            <button type="button" className="btn btn-secondary" onClick={nextPopup}>Next</button>
                            <button type="button" className="btn btn-primary" onClick={fadeOut}>Change language</button>
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
