import React from 'react';

/*
export default function Button ({ children, id, onClick, cnm = 'default' }) {
    return <button className={"btn btn-"+cnm} id={id} onClick={onClick} type="button">{children}</button>;
}
*/

// 16.6.1
/*
const Button = React.memo(
    function ({ children, id, onClick, cnm = 'default' }) {
        return <button className={"btn btn-"+cnm} id={id} onClick={onClick} type="button">{children}</button>;
    }
);

export default Button;
*/

export default class Button extends React.PureComponent {
    render () {
        const { children, id, onClick, cnm = 'default' } = this.props;
        return <button className={"btn btn-"+cnm} id={id} onClick={onClick} type="button">{children}</button>;
    }
}

/** IE 11 - add a <span> to children and no shifting
 *
 */