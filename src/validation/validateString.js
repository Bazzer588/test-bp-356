
/** basic string validation using props:
 *
 * @param value a string, or could be undefined
 * @param props name, required, minLength, maxLength, pattern
 * @param path path to field in the tree
 * @param output clean output if valid
 * @returns {boolean|*} true if output value was set, an error object if there was an error
 */

export default function validateString (value, props, path, output) {
    const { name, required } = props;
    //console.log('VS',props.name,value);

    if (value) {
        if (typeof value === 'string') {
            value = value.trim();
            if (value) {
                const { minLength, maxLength, pattern, nextValidator } = props;
                const len = value.length;
                if (minLength && len < minLength) {
                    return {name, path, required, error: 'minLength', values: { minLength } };
                }
                if (maxLength && len > maxLength) {
                    return {name, path, required, error: 'maxLength', values: { maxLength } };
                }
                if (pattern) {
                    const reg = new RegExp(pattern); // ie ^[0-9]+$
                    if (!reg.test(value)) {
                        return {name, path, required, error: 'pattern' };
                    }
                }
                // todo numeric ? alpha ? decimal ?
                if (nextValidator) {
                    const r = nextValidator(value,props,path,output);
                    if (r) {
                        return r;
                    }
                }
                if (output) {
                    output[name] = value;
                }
                return true;
            }
        } else {
            // value is not a string - this is presumably invalid
            return { name, path, required, error: 'invalidString' };
        }
    }

    // there is no value
    if (required) {
        return { name, path, required, error: 'required' };
    } else {
        if (output) {
            output[name] = '';
        }
    }
}

export const stringTypeField = (name,props) => { return { name, ...props, validator: validateString } };


export function validateEmail (value, props, path, output) {
    const err = validateString(value,props,path);
    if (err===true) {
        const { name, required } = props;
        value = value.trim();

        // invalid character sequences
        const bad = [' ','..','.@','@.'];
        const found = bad.find( (t) => value.indexOf(t)>=0 );
        if (found) {
            return { name, path, required, error: 'invalidEmail', values: { found } };
        }

        // general format, xxxx.xxx@xxx.xxx
        const len = value.length;
        const at1 = value.indexOf('@');
        const at2 = value.lastIndexOf('@');
        const dot = value.lastIndexOf('.');
        if (dot===len-1 || at1<0 || at1<at2 || dot<at2) {
            return { name, path, required, error: 'invalidEmail' };
        }
        if (output) {
            output[name] = value;
        }
        return true;
    }
    return err;
}

export const emailTypeField = (name,props) => { return { name, ...props, validator: validateEmail } };
