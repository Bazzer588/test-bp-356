import React from "react";

export default class ImageCapture extends React.Component {

    componentDidMount () {
        getDevices(this);
    }

    componentWillUnmount () {
        console.log('Image Cap unmount');
        this.stopAll();
    }

    pick (index) {
        const dev = this.state.inputs[index];
        console.log('pick',dev.label);
        this.stopAll();
        this.setState({ deviceIndex: index, deviceId: dev.deviceId })
    }

    stopAll () {
        if (this.currentStream) {
            this.currentStream.getTracks().forEach( track => track.stop() );
        }
    }

    snap = () => {
        const video = document.getElementById('theImageCapture');
        const canvas = document.getElementById('theCanvas');
        const image = document.getElementById('theSnap');
        canvas.width = video.videoWidth;
        canvas.height = video.videoHeight;
        canvas.getContext('2d').drawImage(video, 0, 0);
        // Other browsers will fall back to image/png
        const data = canvas.toDataURL('image/webp');
        image.src = data;
        console.log('SNAP',video.videoWidth,video.videoHeight,'LEN',data.length);
        this.setState({ snapInfo: 'Image '+ video.videoWidth + ' x ' + video.videoHeight + ', bytes ' + data.length });
    };

    buttons (inputs) {
        if (!inputs) return null;
        const x = [];
        inputs.forEach( (inp,index) => {
            x.push(<button onClick={() => this.pick(index)} key={inp.label}>{inp.label}</button>);
        });
        /*if (this.state.deviceId) {
            x.push(' index '+this.state.deviceIndex);
        }*/
        return x;
    }

    render () {
        const state = this.state || {};
        if (state.wasError) {
            return <span>{ state.wasError.toString() }{ state.wasError.constraint || '?' }</span>;
        }

        if (!hasGetUserMedia())
            return <span>No video</span>;

        setTimeout(() => attach(this,state.deviceId), 100);

        return (
            <div style={{ width: '100%', padding: '12px', boxSizing: 'border-box' }}>
                <video
                    autoPlay
                    id="theImageCapture"
                    style={{ width: '100%' }}
                />
                <p>{this.buttons(state.inputs)}</p>
                <p><button onClick={this.snap}>Snap</button></p>
                <img id={'theSnap'} alt="" src="" style={{ maxWidth: '100%' }}/>
                <canvas id={'theCanvas'} style={{ display: 'none'}}/>
                {state.snapInfo &&
                    <p>{state.snapInfo}</p>
                }
            </div>
        );
    }
}

function attach (comp, deviceId) {
    const video = document.getElementById('theImageCapture');
    const hdConstraints = {
        // video: {width: {min: 640}, height: {min: 480}}
        video: {width: {min: 1280}, height: {min: 720}}
        // video: {width: {min: 720}, height: {min: 1280}}   // OverconstrainedError on ms webcam
    };
    if (deviceId) {
        // hdConstraints.video = {width: {min: 1920}, height: {min: 1080}};
        hdConstraints.video.deviceId = { exact: deviceId };
    } else {
        // hdConstraints.video.facingMode = { exact: 'environment' };
    }

    console.log('CONSTRAINTS',hdConstraints);

    navigator.mediaDevices.getUserMedia(hdConstraints)
        .then((stream) => {
            video.srcObject = stream;
            comp.currentStream = stream;
        })
        .catch( err => {
            console.log('V ERROR',err);
            comp.setState({ wasError: err });
        } );
}

/** devices */

function getDevices (comp) {
    if (navigator.mediaDevices && navigator.mediaDevices.enumerateDevices) {
        navigator.mediaDevices.enumerateDevices()
            .then((infos) => {
                const inputs = [];
                for (let n = 0; n < infos.length; n++) {
                    const dev = infos[n];
                    if (dev.kind === 'videoinput') {
                        console.log(n, dev);
                        inputs.push(dev);
                    }
                }
                comp.setState({inputs});
            });
    }
}

/** stop em */

/*function stopAll () {
    if (window.stream) {
        window.stream.getTracks().forEach(function (track) {
            console.log('STOPPING');
            track.stop();
        });
    }
}*/

/** base level thing */

function hasGetUserMedia() {
    return !!(navigator.mediaDevices && navigator.mediaDevices.getUserMedia);
}
