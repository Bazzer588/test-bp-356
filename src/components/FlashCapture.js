import React from "react";
import './FlashCapture.scss';


window.Webcam = {
    flashNotify: (a,b,c,d) => {
        console.log('flashNotify',a,b,c,d);
        if (a==='error') {
            const t = window.Webcam.compo;
            if (t)
                t.setState({ error: b });
        }
        // cameraLive true
    }
};

export default class FlashCapture extends React.Component {

    componentDidMount () {
    }

    getMovie () {
        // get reference to movie object/embed in DOM
        const movie = document.getElementById('webcam_movie_obj');
        if (!movie || !movie._snap) {
            return document.getElementById('webcam_movie_embed');
        }
        return movie;
    }

    retry = () => {
        this.setState({ error: '' });
    };

    render () {
        window.Webcam.compo = this;
        const { error } = (this.state || {});
        if (error) {
            return <div onClick={this.retry}>Flash error: {error}</div>;
        }

        const swfURL = '/tax-app/webcam.swf';
        const { width = 1280, height = 720, hide, invisible } = this.props;
        console.log('render',width,height,hide);
        if (hide)
            return null;
        const flashvars =
            'width=' + width +
            '&height=' + height +
            '&dest_width=' + width +
            '&dest_height=' + height +
            // '&auto_size=' + true +
            //'&flip_horiz=' + true +
            '&fps=30' +
            '&image_format=jpeg'
        ;
        const ts = invisible ? { position: 'absolute', width: '0px', left: '-2000px' } : {};
        return (
            <div className={width>height ? 'videoWrapper' : 'videoWrapperPort'} style={ts}>
            <object
                classID="clsid:d27cdb6e-ae6d-11cf-96b8-444553540000"
                type="application/x-shockwave-flash"
                codebase="http://download.macromedia.com/pub/shockwave/cabs/flash/swflash.cab#version=9,0,0,0"
                //width={'90%'}
                //height={'auto'}
                id="webcam_movie_obj"
                align="middle"
            >
                <param name="wmode" value="opaque"/>
                <param name="allowScriptAccess" value="always"/>
                <param name="allowFullScreen" value={false}/>
                <param name="movie" value={swfURL}/>
                <param name="loop" value={false}/>
                <param name="menu" value="false"/>
                <param name="quality" value="best"/>
                <param name="bgcolor" value="#ffffff"/>
                <param name="flashvars" value={flashvars}/>
                <embed
                    id="webcam_movie_embed"
                    src={swfURL}
                    wmode="opaque" loop={false} menu="false" quality="best"
                    bgcolor="#ffffff"
                    //width={width}
                    //height={height}
                    name="webcam_movie_embed" align="middle" allowscriptaccess="always" allowFullScreen={false}
                    type="application/x-shockwave-flash" pluginspage="http://www.macromedia.com/go/getflashplayer"
                    flashvars={flashvars}
                />
            </object>
            </div>
        );
    }

}
