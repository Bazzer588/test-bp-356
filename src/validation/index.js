
/** the entry point for validating an object
 *
 * @param sectionProps must have a method validateSection()
 * @param values will be passed to validateSection
 * @param output a {} or []
 * @param errors an array [] for errors
 * @param path the route to this in the tree, ie 'personalDetails-homeAddress' or 'additionalDriver-2-nameDetails'
 * @returns {void|boolean|*}
 */

export function validateTree (sectionProps, values, output, errors, path) {

    function validateChild (child, extraProps) {
        child = extraProps ? {...child, ...extraProps} : child; // merge optional extraProps
        const name = child.name;
        if (child.validateSection) {  // its a section, which contains fields, it can append to errors
            if (name!==undefined) {
                const childOutput = child.isArray ? [] : {};
                const r = validateTree(child, values && values[name], childOutput, errors, path + '-' + name);
                if (r!==false) {
                    output[name] = childOutput;
                }
            } else { // a nameless section - contains fields which output to it's parent
                validateTree(child, values, output, errors, path);
            }
        } else { // its a field, it can return a single error
            const fieldValue = values && values[name];
            //child.validator(fieldValue, child, output, errors, path);

            const resp = child.validator(fieldValue, child, path, output);
            if (resp && resp.error) errors.push( resp );
            return resp;
        }
    }

    return sectionProps.validateSection(validateChild, values, sectionProps, output, errors, path);
}

/** experi
 *
 * @param v
 * @param values
 * @param props
 * @param output
 * @param errors
 * @param path
 * @returns {boolean}
 */

export function validateArraySection (v, values, props, output, errors, path) {  // props: minLength, maxLength
    const len = values ? values.length : 0;
    const name = props.name;
    if (props.maxLength && len > props.maxLength) {
        errors.push({name, path, maxLength: props.maxLength});
        return false;
    }
    if (values) {
        values.forEach((row, index) => {
            v(props.foobar, {name: index}); // TODO wtf foobar
        });
    }
    if (len < props.minLength) {
        errors.push({name, path, minLength: props.minLength});
    }
}

/* Useful general validation functions */

const num = new RegExp(/^\d+$/);

export function isNumeric(value) {
    return num.test(value);
}

const alphanum = new RegExp(/^[a-z0-9]+$/i);

export function isAlphaNumeric(value) {
    return alphanum.test(value);
}
