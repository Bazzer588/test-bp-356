import React from "react";

export default function InputText (props) {

    return (
        <input
            type="text"
            value=""
            {...props}
        />
    );
}

/**
  simple wrapper around
  <input type="text" value="" {...props} />

  props can of course override type and value

 */
