import React from "react";
import {translate} from "./AppConfig";

export default function InputText (props) {

    return (
        <input
            type="text"
            {...props}
            placeholder={translate(props.placeholder)}
            value={props.value || ''}
        />
    );
}

/**
  simple wrapper around
  <input type="text" value="" {...props} />

  props can of course override type and value

 */
