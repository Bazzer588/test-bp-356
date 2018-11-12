import React from 'react';

const pageRoutes = {};
let pageMappers = [];

function getPageRoute (path) {
    const t = pageRoutes[path];
    if (t)
        return t;

    const pathsplit = path.split('/'); // .splice(0,1);
    pathsplit.splice(0,1); // remove '' from start

    for (let n=0;n<pageMappers.length;n++) {
        const z = pageMappers[n](pathsplit);
        if (z)
            return z;
    }

    return pageRoutes['/']
}

function modPage (url, toTop, replace) {
    //console.log('modPage',url,toTop);
    if (toTop) window.scrollTo(0,0);
    if (replace) {
        window.history.replaceState(null, '', url); // data, title
    } else {
        window.history.pushState(null, '', url); // data, title
    }

    try {
        const popStateEvent = new PopStateEvent('popstate', {state: {}});
        dispatchEvent(popStateEvent);
    } catch (err) {
        const ev = document.createEvent('Event');
        ev.initEvent('popstate', false, false);
        dispatchEvent(ev);
    }
}

export default class PageRouter extends React.Component {

    static defineRoute (pathname, thing, title) {
        // console.log('defineRoute', pathname, typeof pathname, typeof thing, title);
        if (typeof pathname === 'function') {
            pageMappers = []; // HACK FOR HOT LOADING // HACK
            pageMappers.push(pathname);
        } else {
            pageRoutes[pathname] = {
                Compo: thing,
                title
            };
        }
    }

    static replacePage (url, toTop = true) {
        modPage(url,toTop,true);
    }

    static changePage (url, toTop = true) {
        modPage(url,toTop);
    }

    componentDidMount () {
        window.addEventListener('popstate', this.listenForPopState );
    }

    componentWillUnmount () {
        window.removeEventListener('popstate', this.listenForPopState );
    }

    listenForPopState = (ev) => {
        // console.log('POPSTATE:',ev);
        this.setState( { dt: Date.now() } ); // make react redraw
    };

    render() {
        const thing = getPageRoute(window.location.pathname);

        if (thing.title) document.title = thing.title; // TODO translate

        return (<thing.Compo search={window.location.search} {...thing.values} />);
    }

}
