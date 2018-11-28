import React from 'react';

let grab;

export default class ErrorList extends React.Component {

    shouldComponentUpdate ( nextProps, nextState, nextContext ) {
        const { errors } = this.props;
        if (nextProps.errors.length === errors.length) {
            // TODO have to check each as error code may have changed
            const next = nextProps.errors;
            return !errors.every( (err,index) => {
                const nxt = next[index];
                return nxt.error === err.error && nxt.name === err.name;
            });
        }
        return true;
    }

    render () {
        console.log('RENDER ERROS');
        const { errors } = this.props;
        if (grab) {
            grab = false;
            setTimeout( () => {
                document.getElementById('theErrors').focus();
            }, 25);
        }
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
        r.push(
            <button
                className='btn link'
                onClick={() => link(err)}
                type="button"
                key={err.path+'/'+err.name+'/'+err.error}
            >
                {err.path}-{err.name}-{err.error}
            </button>
        );
    });
    return r;
}

function link (err) {
    console.log('link',err);
    const id = err.path+'-'+err.name;
    const t = document.getElementById(id);
    if (t) {
        t.focus();
        return;
    }
}
