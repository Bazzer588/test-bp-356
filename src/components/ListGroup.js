import React from 'react';
import './ListGroup.scss';

export default function ListGroup ({ children, id, value, onClick }) {
    return (
        <div className="list-group" id={id} role="tablist">
            {items(children,value,onClick)}
        </div>
    );
}

function items (list, value, onClick) {
    const r = [];
    list.forEach( item => {
        const { id, children, disabled } = item.props;
        const selected = id===value;
        const clk = (ev) => {
            if (ev.target) ev.target.focus();
            onClick(id);
        };
        r.push(
            <button
                className={disabled ? "list-group-item disabled" : selected ? "list-group-item active" : "list-group-item"}
                key={id}
                onClick={disabled ? () => null : clk}
                role="tab"
                type="button"
            >
                {children}
            </button>
        );
    });
    return r;
}

/*
    The attribute aria-selected is not supported by the role button. This role is implicit on the element button  jsx-a11y/role-supports-aria-props
*/
