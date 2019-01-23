import React from "react";
import {translate} from "./AppConfig";

export default function InputText (props) {

    return (
        <input
            type="text"
            {...props}
            placeholder={ translate(props.placeholder) }
            value={ props.value === undefined ? '' : props.value }
        />
    );
}

/**
 simple wrapper around
 <input type="text" value="" {...props} />
 props can of course override type and value

 type="text"                                            // the default type for a text input - doing it here means we don't need to do it all over the place
 {...props}                                             // the important bit
 placeholder={translate(props.placeholder)}             // only text inputs care about this, so not dealt with further up the tree
 value={props.value===undefined ? '' : props.value}     // prevents controlled component warnings - if the default should not be '' then supply one

 */
