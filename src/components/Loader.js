import React from "react";
import './Loader.css';

export default function Loader ({ text }) {

    text = text || 'Page loading...';

    setTimeout( () => {
        const p = document.getElementById('loader-text');
        if (p) p.focus();
    }, 100);

    return (
        <div className="loader-body">
            <div className="loader-container">
                <div className="loader">
                    <div className="loader antiloader">
                        <div className="loader" style={{ animation: 'spin 0.8s linear infinite'}} />
                    </div>
                </div>
            </div>
            <span className="loader-text" aria-live="assertive" id="loader-text" tabIndex="-1">{text}</span>
        </div>
    );
}

// <span className="loader-text" aria-live="assertive" id="loader-text" role="alert" tabIndex="-1">{text}</span>

// https://www.w3schools.com/code/tryit.asp?filename=FVAC6056923W

// ovals
// https://www.w3schools.com/code/tryit.asp?filename=FVAERQGFA5PJ

// psychedelic
// https://www.w3schools.com/code/tryit.asp?filename=FVAED5JFVIO5

// delays
// https://www.w3schools.com/code/tryit.asp?filename=FVC7MNJUM92B
