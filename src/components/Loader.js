import React from "react";
import './Loader.css';

export default function Loader () {
    return (
        <div className="loader-container">
            <div className="loader">
                <div className="loader antiloader">
                    <div className="loader" style={{ animation: 'spin 0.8s linear infinite'}} />
                </div>
            </div>
        </div>
    );
}

// https://www.w3schools.com/code/tryit.asp?filename=FVAC6056923W

// ovals
// https://www.w3schools.com/code/tryit.asp?filename=FVAERQGFA5PJ

// psychedelic
// https://www.w3schools.com/code/tryit.asp?filename=FVAED5JFVIO5
