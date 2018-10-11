import React from 'react';

export default function Button ({ children, id, onClick, cnm = 'default' }) {
    return <button className={"btn btn-"+cnm} id={id} onClick={onClick} type="button">{children}</button>;
}
