import React from 'react';
import Loader from "./Loader";
import {ModalPopup} from "../pages/BasePage";

export default function openModulePopup (props) {

    const {loader, page, owner, ...popupProps} = props;

    let wasClosed;

    setTimeout( () => {
        loader()
            .then( (module) => {
                const PopContent = module.default;
                if (!wasClosed)
                    page.setPopupComp(PopContent, owner, popupProps);
            })
            .catch( (e) => {
                console.log(e,JSON.stringify(e));
                page.setPopupComp(() => {
                    return (
                        <ModalPopup page={page} title="Popup loading error">
                            <p>There was an error loading the popup</p>
                        </ModalPopup>
                    );
                });
            });
    }, 1000 );

    page.setPopupComp(() => {
        return (
            <ModalPopup page={page} title="Loading popup" onClose={() => wasClosed = true}>
                <Loader block text={'Loading popup content'}/>
            </ModalPopup>
        );
    });
}

/*  loader must be a function like this:

    function importPopSectionForm () {
        return import ('../sections/PopSectionForm' / * webpackChunkName: "POPUP_COMPONENT" * /);
    }

*/

