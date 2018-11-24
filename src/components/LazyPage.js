import React from 'react';
import Loader from "./Loader";

export default function openLazyPage ({ loader, label }) {

    let Loaded;
    let error;

    return function LazyPage (props) {

        if (Loaded) {
            return <Loaded {...props}/>
        }

        const {router} = props;

        setTimeout(() => {

            loader()
                .then((module) => {
                    Loaded = module.default;
                    router.setState({ok: Date.now()});
                })
                .catch((e) => {
                    console.log(e);
                    error = e;
                    router.setState({ok: Date.now()});
                });

        }, 1000);

        if (error) { // retry and back buttons ?
            return <p>There was an error loading</p>;
        }

        return <Loader text={label}/>;
    }

}

/*

    // import ('./Code_Page_1' /  * webpackChunkName: "PAGE4" *  / ).then(loaded).catch(failed);

*/
