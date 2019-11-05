import React from 'react';

const pageRoutes = {};
let pageMappers = [];

function getPageRoute (path) {
    const t = pageRoutes[path];
    console.log('GPR', path, t);
    if (t)
        return t;

    const pathsplit = path.split('/'); // .splice(0,1);
    pathsplit.splice(0, 1); // remove '' from start

    for (let n = 0; n < pageMappers.length; n++) {
        console.log('PAGEMAPPER', n, pathsplit);
        const z = pageMappers[n](pathsplit);
        if (z)
            return z;
    }

    return pageRoutes['/']
}

function modPage (url, toTop, replace) {
    //console.log('modPage',url,toTop);
    if (toTop) window.scrollTo(0, 0);
    if (replace) {
        window.history.replaceState(null, '', url); // data, title
    } else {
        window.history.pushState(null, '', url); // data, title
    }

    try {
        const popStateEvent = new PopStateEvent('popstate', { state: {} });
        popStateEvent.deliberate = true;
        dispatchEvent(popStateEvent);
    } catch (err) {
        const ev = document.createEvent('Event');
        ev.initEvent('popstate', false, false);
        ev.deliberate = true;
        dispatchEvent(ev);
    }
}

let currentPage = '';

export default class PageRouter extends React.Component {

    static reset () {
        pageMappers = [];
    }

    static defineRoute (pathname, thing, title) {
        // console.log('defineRoute', pathname, typeof pathname, typeof thing, title);
        if (typeof pathname === 'function') {
            // pageMappers = []; // HACK FOR HOT LOADING // HACK
            pageMappers.push(pathname);
        } else {
            pageRoutes[pathname] = {
                Compo: thing,
                title
            };
        }
    }

    static replacePage (url, toTop = true) {
        modPage(url, toTop, true);
    }

    static changePage (url, toTop = true) {
        modPage(url, toTop);
    }

    componentDidMount () {
        window.addEventListener('popstate', this.listenForPopState);
    }

    componentWillUnmount () {
        window.removeEventListener('popstate', this.listenForPopState);
    }

    listenForPopState = (ev) => {
        let dest = '';
        if (ev.target) {
            dest = ev.target.location.pathname;
            console.log('POPSTATE', ev.deliberate, currentPage, '=>', dest);
        } else
            console.log('POPSTATE no target');

        if (!ev.deliberate) {
            if (currentPage !== dest && currentPage === '/tax-app/checkout') {
                window.history.go(1); // only do this if we clicked 'back'
                return;
            }
        }
        this.setState({ dt: Date.now() }); // make react redraw
    };

    render () {
        currentPage = window.location.pathname;
        const thing = getPageRoute(window.location.pathname);

        if (thing.title) document.title = thing.title; // TODO translate

        return (<thing.Compo search={window.location.search} {...thing.values} router={this}/>);
    }

}
