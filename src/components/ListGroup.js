import React from 'react';
import './ListGroup.scss';
require('./ListGroup' + process.env.REACT_APP_DEFAULT_CURRENCY + '.scss');

// if (process.env.REACT_APP_DEFAULT_CURRENCY==='GBP') require('./yabadoo.scss');
// if (process.env.REACT_APP_DEFAULT_CURRENCY==='USD') require('./lgus.scss');

export default function ListGroup ({ children, id, value, onClick }) {

    //const theme = './ListGroup' + process.env.REACT_APP_DEFAULT_CURRENCY + '.scss';
    //require(theme);

    return (
        <div className="list-group" id={id} role="tablist">
            {items(children,value,onClick)}
        </div>
    );
}

function items (list, value, onClick) {
    const r = [];
    list.forEach( item => {
        if (Array.isArray(item)) {
            r.push(items(item,value,onClick));
            return;
        }
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
