import React from 'react';
import Loader from '../components/Loader';

const disabled = { 'aria-disabled': true, 'aria-hidden': true, className: 'loader-blur' };

export default function BasePage ({ loading, message, children, popup }) {

    const dprops = loading ? disabled : {};

    return (
        <div className="App">
            <div {...dprops}>
                {children}
            </div>
            {loading && <Loader text={message} popup={popup}/>}
        </div>
    );
}
