import React from 'react';

const pageRoutes = {};
const pageTitles = {};

function modPage (url, toTop, replace) {
    console.log('modPage',url,toTop);
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
        console.log('defineRoute', pathname, typeof pathname, typeof thing, title);
        if (typeof pathname === 'function') {
            // to do
        } else {
            pageRoutes[pathname] = thing;
            pageTitles[pathname] = title;
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
        console.log('POPSTATE:',ev);
        this.setState( { dt: Date.now() } ); // make react redraw
    };

    render() {
        const path = window.location.pathname;
        const Thing = pageRoutes[path] || pageRoutes['/'];
        // location.search = '?q=875848'

        const title = pageTitles[path] || pageTitles['/'];

        if (title) document.title = title;

        return (<Thing search={window.location.search} />);
    }

}
