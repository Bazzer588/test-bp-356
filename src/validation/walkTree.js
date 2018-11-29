import React from "react";

export default function walkTree (thing) {
    //console.log('WALK',thing);
    const rendered = thing.render();
    //console.log('RENDER',rendered);

    //const stt = Date.now();
    const errors = [];
    tree2(rendered,errors);
    //console.log('TOOK',Date.now()-stt, 'for', errors.length);
    //console.log('TOOK',Date.now()-stt, 'for', errors.length, JSON.stringify(errors,null,' '));

    return errors;
}

function tree2 (rendered,errList) {
    //const valid = React.isValidElement(rendered);
    //console.log('T2',valid,rendered);

    if (!rendered) {
        return;
    }

    if (Array.isArray(rendered)) {
        rendered.forEach( child => {
            tree2(child,errList);
        });
        return;
    }

    const props = rendered.props;
    const Compo = rendered.type;

    if (typeof Compo==='function') {

        if (props.validator && props.path && props.name) {
            //console.log('FIELD',props.path,props.name,props.value);
            const err = props.validator(props.value,props,props.path);
            if (err && err.error) {
                //console.log('ERROR',err);
                errList.push(err);
            }
            return;
        }

        // const inst = new Compo( props ); // currentContext
        // console.log('INSTANCE',React.isValidElement(inst),inst);

        if (isClassComponent(Compo)) { // inst.render
            const inst = new Compo( props ); // currentContext
            const next = inst.render();
            tree2(next,errList);
        } else {
            tree2( Compo(props), errList );
        }
    } else if (props) {     // div, span, p etc
        if (ignore(Compo))
            return;
        React.Children.forEach( props.children, (child) => {
            tree2(child,errList);
        });
    }
}

function ignore (it) {
    switch(it) {
        case 'select':
            return true;
        default:
    }
}

function isClassComponent (Comp ) {
    return Comp.prototype && (Comp.prototype.render || Comp.prototype.isReactComponent || Comp.prototype.isPureReactComponent);
}

/*
function tree (props) {
    if (props.path && props.name) {
        console.log(props.path,props.name,props.value);
    }

    React.Children.forEach( props.children, (child) => {
        console.log(React.isValidElement(child), child);

        if (child.key==='mainForm-bigForm-workAddress') {
            const next = new child.type( child.props ).render();
            console.log('LEVEL 1',next);
            const deep = new next.type( next.props ).render(); // an array
            console.log('LEVEL 2',deep);
        }

        if (child.props)
            tree(child.props);
    });
}
*/

/*  see also
    https://github.com/ctrlplusb/react-tree-walker/blob/master/src/index.js
 */
