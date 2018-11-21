import React from 'react';
import Loader from "../components/Loader";

let Loaded;

export default class CodeSplitPage2 extends React.Component {

    render () {
        if (Loaded) {
            return <Loaded/>
        }

        setTimeout( () => {

            import ('./Code_Page_2' /* webpackChunkName: "CODE_PAGE_2" */)
                .then( (module) => {
                    Loaded = module.default;
                    this.setState({ ok: Date.now() })
                })
                .catch( (e) => {
                    console.log(e);
                    this.setState({ error: Date.now() })
                });

        }, 1000);

        const state = this.state || {};

        if (state.error) {
            return <p>There was an error loading</p>;
        }

        return <Loader text={'Loading code split page 2'}/>;
    }
}

/*

    // import ('./Code_Page_1' /  * webpackChunkName: "PAGE4" *  / ).then(loaded).catch(failed);

*/
