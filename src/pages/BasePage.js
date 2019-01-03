import React from 'react';
// import Loader from '../components/Loader';
import Button from "../components/Button";
import {translate} from "../components/AppConfig";

const disabled = { 'aria-disabled': true, 'aria-hidden': true /*, className: 'loader-blur'*/ };

export default class BasePage extends React.Component {

    setLoader (TheLoader) {
        this.setState({ TheLoader });
    }

    setPopup (pop) {
        this.setState({ ThePopup: pop, PopupComponent: null });
    }

    setPopupComp (cls, owner, popupProps) {
        //const vs = document.body.scrollHeight > document.body.clientHeight;
        //console.log('VS',vs, document.body.scrollHeight, document.body.clientHeight);
        const ww = window.innerWidth > document.documentElement.clientWidth;
        console.log('WW', window.innerWidth, document.documentElement.clientWidth);

        this.activePopupOnClose = null;
        const state = this.state || {};
        const curr = state.ThePopup || state.PopupComponent;
        this.setState({ ThePopup: null, PopupComponent: cls, PopupOwner: owner, PopupProps: popupProps, replace: !!curr });
        const d = document.body.classList;
        if (cls) {
            d.add(ww ? 'doc-modal-17' : 'doc-modal');
        }
        else {
            d.remove('doc-modal');
            d.remove('doc-modal-17');
        }
    }

    fadeOutPopup = (fn) => {
        if (this.activePopupOnClose) {
            this.activePopupOnClose(); // notify the popup we are closing
            this.activePopupOnClose = null;
        }
        const p = document.getElementById('exampleModalLive');
        p.classList.add('modal-hiding');
        setTimeout( () => {
            this.setPopupComp(null);
            if (fn) fn();
        }, 300 );
    };

    render () {
        const { children, Child, ...rest } = this.props;
        const state = this.state || {};
        const { ThePopup, PopupComponent, TheLoader } = state;
        const divProps = (TheLoader || ThePopup || PopupComponent) ? disabled : {};

        return (
            <div className="App bg-light">
                <div {...divProps}>
                    {children}
                    {Child && <Child page={this} {...rest} />}
                </div>
                {ThePopup && renderPopup({ page: this, ...ThePopup })}
                {PopupComponent && renderOuterPopup(this,PopupComponent,state.PopupOwner,state.PopupProps,state.replace)}
                {TheLoader && <TheLoader/>}
            </div>
        );
    }
}

/*
export const useBasePage = (Wrapped) => (props) => {
    return <BasePage Child={Wrapped} {...props}/>;
};
*/

export function useBasePage (Wrapped) {
    return function BasePageWrapper (props) { // name appears in React dev tools
        return <BasePage Child={Wrapped} {...props}/>;
    }
}

/** focus helper */

function foc (id) {
    const p = document.getElementById(id);
    if (p) p.focus();
}

function eat (ev) {
    ev.stopPropagation();
}

function renderPopup (props) {

    const { page, title, children, buttons, noBkClose, noCancel, renderButtons, popupClass = '' } = props;
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
                    <div className={'modal-content '+popupClass} onClick={eat}>
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

function renderOuterPopup (page, PopupComponent, owner, popProps, replace) {

    setTimeout( () => { foc('exampleModalLive'); }, 100); // focus to modal

    // you can apply extra styles to 'modal-dialog' below to change max width

    return (
        <>
            <div id="exampleModalLive" className="modal show" tabIndex="-1" role="dialog" aria-labelledby="exampleModalLiveLabel" style={{ display: 'block' }}
                 onClick={() => page.fadeOutPopup()}
            >
                <div className="modal-dialog" role="document">
                    <PopupComponent page={page} owner={owner} replace={replace} {...popProps} />
                </div>
            </div>
            <div className="modal-backdrop" tabIndex="0" onFocus={() => foc('closePop')}/>
        </>
    );
}

function innerPopup ({ page, owner, title, children, continueAction, buttons, renderButtons, noCancel, replace, onClose }) {

    page.activePopupOnClose = onClose;

    function doClose () {
        // page.setState({ ThePopup: null, PopupComponent: null });
        page.fadeOutPopup();
        foc('ShowPopup');       // TODO this button may not exist !!!
    }

    const cnm = 'modal-content' + (replace ? ' div-sliding' : '');
    // console.log('INNER',replace,cnm);

    if (replace) { // slide it in from the side
        setTimeout(() => {
            const p = document.getElementById('theModalContent');
            if (p) p.classList.remove('div-sliding');
        },300);
    }

    const canc = (buttons || renderButtons || continueAction) ? undefined : 'primary';

    return (
        <div id="theModalContent" className={cnm} onClick={eat}>
            <div className="modal-header" tabIndex="0" onFocus={() => foc('closePop')}>
                <h5 className="modal-title" id="exampleModalLiveLabel">{title}</h5>
                {!noCancel &&
                <button type="button" className="close" aria-label="Close" onClick={doClose}>
                    <span aria-hidden="true">×</span>
                </button>
                }
            </div>
            <div className="modal-body">
                {children}
            </div>
            <div className="modal-footer">
                {noCancel ? null : <Button id="closePop" cnm={canc} onClick={doClose}>{translate('Cancel')}</Button>}
                {buttons}
                {renderButtons && renderButtons()}
                {continueAction &&
                    <Button id="continuePop" onClick={() => continueAction()} cnm="primary">{translate('Continue')}</Button>
                }
            </div>
        </div>
    );
}

export const ModalPopup = innerPopup;


/*  find focusable elements

    var focusable = document.querySelectorAll('button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])');
    var firstFocusable = focusable[0];
    var lastFocusable = focusable[focusable.length - 1];

    is scrollbar visible?

    https://tylercipriani.com/blog/2014/07/12/crossbrowser-javascript-scrollbar-detection/

*/
