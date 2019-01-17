
function lookup (dict, names, required) {
    //console.log('LUP',names);
    for(let n=0;n<names.length;n++) {
        const r = exact(dict,names,n,required);
        if (r)
            return r;
    }
}

function exact (dict, names, index, required) {
    const name = names[index++];
    if (name) {
        //if (notNum(name)) {
        const thing = dict[name];
        if (thing) {
            if (index >= names.length) {
                if (!required && thing.$$)  // optional caption
                    return thing.$$;
                if (thing.$)                // required caption (the default)
                    return thing.$;
                return thing;
            }
            return exact(thing, names, index, required);
        }
        //} else {
        //    return exact(dict, names, index, required);
        //}
    }
}

function notNum (name) {
    const c = name.charCodeAt(0);
    return c>57 || c<48;
}

export function stripNum (a) {
    for(let n=0;n<a.length;n++) {
        if (!notNum(a[n])) {
            const b = a.slice(0,n++);
            while (n<a.length) {
                if (notNum(a[n]))
                    b.push(a[n]);
                n++;
            }
            return b;
        }
    }
    return a;
}

export function translate (t,props) {
    if (!t)
        return t;
    if (t.error) {
        // { name, path, required, error: 'invalidEmail', values: { found } };
        const { error, name, path } = t;
        const ap = stripNum(path.split('-'));
        const z = [ ...ap, name, error ];       // path + name + error
        let g = lookup(std,z,t.required) || (name+' '+error);
        // insert field name ?
        if (g.indexOf('{f}')>=0) {
            // to get {f}, combine path + name
            // const get = t.errorFieldName ? ap : [ ...ap, name ]; // is the error from a multi field?
            const get = t.typeName ? [t.typeName, name] : [ ...ap, name ]; // if multi field lookup [dateInput,day]
            const f = lookup(std,get,t.required);
            // console.log('LOOKUP ERROR',t,ap);
            g = g.replace('{f}', f || name );
            // second level for multi fields
            if (g.indexOf('{f}')>=0) {
                const f2 = lookup(std,ap,t.required);           // lookup the path without name
                g = g.replace('{f}', f2 || ap[ap.length-1] );   // f2 or the last tag in the path
            }
        }
        // replace values
        if (t.values) {
            for (const key in t.values) {
                // console.log('KEY IS',key);
                g = g.replace( '{'+key+'}', t.values[key] );
            }
        }
        //console.log('ERROR',z,g);
        return g;
    }

    // assume t is a string
    const required = props ? props.required : false;
    const r = required ? reqCache[t] : stdCache[t];
    if (r)
        return r;
    const a = t.split('-');
    const m = stripNum(a);
    const k = (a===m) ? t : m.join('-');
    if (a!==m) {
        const u = required ? reqCache[k] : stdCache[k];
        if (u)
            return u;
    }
    let x = lookup(std,m,required) || t;
    // {f}
    // if (!x || !x.indexOf) console.log('TRANISSUE',t,x);

    if (props && (typeof x === 'string') && x.indexOf('{f}')>=0) {
        if (props.id) {
            console.log('GOTOT',x,t,props.id);
            const f = translate(props.id,props);
            x = x.replace('{f}',f);
        }
    }
    // cache
    (required ? reqCache : stdCache)[k] = x;  // cache it
    return x;
}

let reqCache = {};
let stdCache = {};
let std = {};

export function setLangMap (s) {
    std = s;
    reqCache = {};
    stdCache = {};
}

export { reqCache, stdCache };
