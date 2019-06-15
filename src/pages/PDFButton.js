import React from 'react';
import Button from "../components/Button";

export default function PDFButton({parent}) {

    const {pdfReady} = (parent.state || {});

    return (
        <>
            <Button onClick={() => getPDF(parent)}>Get PDF</Button>
            {(pdfReady || window.PDF_BLOB) &&
            <>
                <Button onClick={() => downloadPDF()}>Download</Button>
                {' '}
                <a href={window.PDF_URL} target="_blank">Open PDF</a>
            </>
            }
        </>
    );
}

const getPDF = (parent) => {
    //alert('PDF');

    fetch('/policy.pdf')
        .then(response => {
            debugHeaders(response.headers);
            return response.blob();
        })
        .then(blob => {
            console.log('BLOB', blob.size);
            window.PDF_BLOB = blob;
            window.PDF_URL = window.URL.createObjectURL(blob);
            console.log('PDF_URL',window.PDF_URL);
            parent.setState({pdfReady: true});
        });
};

function debugHeaders(h) {
    h.forEach((val, name) => {
        console.log(name, ':', val);
    });
}

const downloadPDF = () => {
    const blob = window.PDF_BLOB;
    // var newBlob = new Blob([blob], {type: "application/pdf"}) // is this needed ?

    if (window.navigator.msSaveOrOpenBlob) {
        window.navigator.msSaveOrOpenBlob(blob, 'downloaded.pdf');
    } else {
        const link = window.document.createElement('a');
        link.href = window.URL.createObjectURL(blob);
        console.log('OBJECT URL', link.href);
        link.download = 'policy docs.pdf';
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
        // clean up
        // setTimeout(() => window.URL.revokeObjectURL(link.href), 100 );;
    }
};

/*
    This is the blob link, not pretty:

    blob:http://localhost/4e89d69a-ac87-4473-9e18-f837a45cf9f7

 */
