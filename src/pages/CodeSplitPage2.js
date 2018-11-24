import React from 'react';
import Loader from "../components/Loader";

let Loaded;
let error;

export default function CodeSplitPage2 (props) {

    if (Loaded) {
        return <Loaded {...props}/>
    }

    const {router} = props;

    setTimeout( () => {

        import ('./Code_Page_2' /* webpackChunkName: "CODE_PAGE_2" */)
            .then( (module) => {
                Loaded = module.default;
                router.setState({ ok: Date.now() });
            })
            .catch( (e) => {
                console.log(e);
                error = e;
                router.setState({ ok: Date.now() });
            });

    }, 1000);

    if (error) { // retry and back buttons ?
        return <p>There was an error loading</p>;
    }

    return <Loader text={'Loading code split page 2'}/>;
}

/*

    // import ('./Code_Page_1' /  * webpackChunkName: "PAGE4" *  / ).then(loaded).catch(failed);

*/
