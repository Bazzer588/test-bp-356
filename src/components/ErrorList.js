import React from 'react';
import {translate} from "./AppConfig";

let grab;

export default class ErrorList extends React.Component {

    shouldComponentUpdate ( nextProps, nextState, nextContext ) {
        const { errors } = this.props;

        this.grabCheck();

        if (nextProps.coreData !== this.props.coreData) { // ie language change
            return true;
        }

        if (nextProps.errors.length === errors.length) {
            const next = nextProps.errors;
            return !errors.every( (err,index) => {
                const nxt = next[index];
                return (
                    nxt.error === err.error &&
                    nxt.name === err.name &&
                    nxt.path === err.path
                    // TODO values, field
                );
            });
        }
        return true;
    }

    grabCheck () {
        if (grab) {
            grab = false;
            setTimeout( () => {
                const t = document.getElementById('theErrors');
                if (t) {
                    t.focus();
                    t.scrollIntoView({behavior: 'smooth', block: 'nearest', inline: 'nearest'});
                }
            }, 25);
        }
    }

    render () {
        // console.log('RENDER ERROS');
        this.grabCheck();
        const { errors } = this.props;
        return (
            <div id="theErrors" tabIndex="0" className="alert alert-primary">
                <p>Fix these errors</p>
                {list(errors)}
            </div>
        );
    }
}

ErrorList.autoFocusPlease = () => {
    grab = true;
};

function list (errors) {
    const r = [];
    errors.forEach( err => {
        const tx = translate(err); // {err.path}-{err.name}-{err.error}
        r.push(
            <button
                className='btn link'
                onClick={() => link(err)}
                type="button"
                key={err.path+'/'+err.name+'/'+err.error}
            >
                {tx}
            </button>
        );
    });
    return r;
}

function link (err) {
    // console.log('link',err);
    const id = err.linkToPath ? err.path : err.path+'-'+err.name;

    const x = document.querySelector("label[for='" + id + "']");

    const t = document.getElementById(id);
    if (t) {
        (x || t).scrollIntoView({behavior: 'smooth', block: 'start', inline: 'nearest'});
        setTimeout(() => {
            t.focus();
        },300);
    }
}
