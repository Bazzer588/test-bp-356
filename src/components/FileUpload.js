import React from "react";

export default function FileUpload (props) {

    function submit (event) {
        //event.persist();
        //console.log('FileUpload onChange',event);

        const file = event.target.files[0];
        if (!file) {
            props.onChange(event);
            return;
        }

        console.log('FILE SIZE',file.size);
        if (file.size>1000000) {
            console.log('File too large');
            props.onChange(event);
            return;
        }

        console.log('FILE NAME',event.target.value);
        props.onChange(event);

        const data = new FormData();
        data.append('file', event.target.files[0]);
        //data.append('name', 'some value user types');
        //data.append('description', 'some value user types');

        fetch('/profile/avatar', {
            method: 'PUT',
            headers: new Headers({ yabbaDoo: event.target.value }), // send origin file name as a header
            body: data
        })
            // .then(response => response.json()) // parse error if not JSON of course you idiots
            .then(handleResponse)
            .catch(error => console.error('Error:', error))
            .then(response => console.log('Result:', JSON.stringify(response)))
            .catch( e2 => console.log('E2:', e2 ) );
    }

    const { preloadImage, ...rest } = props;

    let onChange;
    if (props.preloadImage) {
        onChange = preload(props)
    } else {
        onChange = submit;
    }

    // const {value, ...rest} = props;
    const lab = getFileName(props.id) || 'Please choose a file';

    return (
        <>
        <input
            {...rest}
            className="input-file"
            value={undefined}
            type="file"
            onChange={onChange}
        />
            <label
                htmlFor={props.id}
                className="btn btn-primary input-file-label"
            >
                {lab}
            </label>
            {props.preloadImage &&
                <img
                    className='preload-image'
                    id={props.id+'-img'}
                    alt="Pre-loading"
                    style={{ display: 'none' }}
                    onError={onImgError}
                />
            }
        </>
    );
}

const onImgError = (ev) => {
    ev.persist();
    console.log('IMAGE ERROR',ev);
    ev.target.style.display = 'none';
};

const preload = (props) => (event) => {
    props.onChange(event);
    const file = event.target.files[0];
    const preview = document.getElementById(props.id+'-img');
    if (file) {
        const reader = new FileReader();
        reader.addEventListener('load', () => {
            preview.src = reader.result;
            preview.style.display = ''; // un hide it
        });
        reader.readAsDataURL(file);
    } else {
        preview.style.display = 'none'; // hide it
    }
};

function getFileName (id) {
    const el = document.getElementById(id);
    if (el) {
        const file = el.files[0];
        if (file)
            return file.name;
    }
}

/*function cleanValue (v) {
    if (v) {
        v = v.replace('C:\\fakepath\\','');
        return v;
    }
}*/

function handleResponse (res) {
    if (res.status===404) {
        return 'Not found sorry';
    }
    console.log(res);
    return res.json();
}

// https://github.com/abachuk/uploading-files-react-node/blob/master/components/uploader.js

/*
https://developer.mozilla.org/en-US/docs/Web/API/Fetch_API/Using_Fetch

var formData = new FormData();
var fileField = document.querySelector("input[type='file']");

formData.append('username', 'abc123');
formData.append('avatar', fileField.files[0]);

=== https://developer.mozilla.org/en-US/docs/Web/API/FileReader

use to preload a file

*/
