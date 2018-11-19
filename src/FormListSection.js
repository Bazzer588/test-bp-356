import React from 'react';
import FormSection from "./FormSection";

/*  TODO
    popup to confirm delete of section?
    slide in alert on delete? with undo option?
*/

class FormListSection extends React.PureComponent {

    constructor (props) {
        super(props);
        this.state = { keys: [] };
    }

    renderHeading = (index, text) => {
        index = parseInt(index);
        return (
            <div style={{ padding: '16px 0 0 2px', fontWeight: '600', color: '#444', fontSize: '17px' }} >
                {text} {index+1}
                <button onClick={() => this.deleteFade(index)} className="btn btn-secondary btn-mini" type="button"
                    style={{ float: 'right', marginTop: '-1px', zIndex: '2', position: 'relative' }}
                >
                    Delete
                </button>
            </div>
        );
    };

    deleteFade = (i) => {   // sets CSS class for the animation, then calls deleteIndex
        const { name, path } = this.props;
        const id = path+'-'+name+'-'+i;
        const p = document.getElementById(id);
        p.classList.add('div-deleting');
        setTimeout(() => {
            p.classList.remove('div-deleting');
            this.deleteIndex(i);
        },300);
    };

    baseArray () {
        if (this.props.simpleField) return [''];
        return [];
    }

    addOne = (ev) => {
        const base = this.baseArray();
        const { name, path, parent, value = base, touched = base, simpleField } = this.props;
        console.log('ADD ONE',value);
        const def = simpleField ? '' : {};
        const newValue = [ ...value, def ];
        const newTouched = [ ...touched, def ];
        parent.onChangeField(name,newValue);
        parent.onBlurField(name,newTouched);
        const btn = ev.target;
        setTimeout( () => {
            if (simpleField) {
                const id = path+'-'+name+'-'+value.length; // ie 'page-list-0'
                focusTo(document.getElementById(id));
            } else {
                // const thing = document.getElementById(id);
                // this works on Chrome - scrolls the parent div of the button into view at bottom
                // on IE11 + Edge it scrolls the damned thing to the top
                // btn.parentNode.scrollIntoView({behavior: 'smooth', block: 'nearest', inline: 'nearest'}); // HACK scroll the add button into view
                calcScrollToView(btn.parentNode);
                //focusTo(btn);
            }
        }, 25);
    };

    deleteIndex = (i) => {
        const base = this.baseArray();
        const { name, path, parent, value = base, touched = base, simpleField } = this.props;
        //console.log('deleteIndex',i,value);
        const newValue = [ ...value ];
        const newTouched = [ ...touched ];
        newValue.splice(i,1);
        newTouched.splice(i,1);
        parent.onChangeField(name,newValue);
        parent.onBlurField(name,newTouched);
        // focus
        if (i>=newValue.length) i--;
        const id = path+'-'+name+'-'+i; // ie 'page-list-0'
        // hack
        //const y = window.scrollY;
        //window.scrollBy(0,-1);  // chrome make scroll down
        setTimeout( () => {
            const t = document.getElementById(id);
            if (t) {
                if (simpleField)
                    focusTo(t);
                else
                    // t.scrollIntoView({behavior: 'smooth', block: 'nearest', inline: 'nearest'});
                    calcScrollToView(t);
            }
            if (i<0) {
                console.log('ALL GONE');
                const a = document.getElementById(path+'-'+name+'-addOne');
                focusTo(a);  // NOTE always focus BEFORE scroll
                // if (a) a.parentNode.scrollIntoView({behavior: 'smooth', block: 'center'});
                centerScroll(a);
                // if (a) calcScrollToView(a.parentNode);
            }
        }, 25);
    };

    render () {
        const { name, path, fixedList, listLength, renderField, repeatThing, addLabel, simpleField, maxLength = 999 } = this.props;
        const base = this.baseArray();
        const { value = base } = this.props;
        const cc = fixedList ? value.length : parseInt(listLength);
        if (!cc && !fixedList)
            return null;

        // console.log('REPEAT',value);

        const arr = [];

        if (simpleField) {
            for(let n=0;n<cc;n++) {
                arr.push( fieldWithDeleteButton(n,value,cc>1 ? this.deleteIndex : null, renderField, repeatThing) );
            }
        } else { // a section
            for(let n=0;n<cc;n++) {
                arr.push( renderField({ ...repeatThing, name: String(n), deleteIndex: this.deleteIndex, renderHeading: this.renderHeading }) );
            }
        }

        const add = cc ? (addLabel || 'Add another person') : (addLabel || 'Add a person');

        return (
            <div className="form-field">
                {simpleField &&
                    <label htmlFor={path+'-'+name+'-0'}>{path}-{name}</label>
                }
                {arr}
                {fixedList && cc<maxLength &&
                    <div style={{ paddingBottom: '8px' }}>
                    <button
                        id={path+'-'+name+'-addOne'}
                        className="btn btn-default btn-mini"
                        onClick={this.addOne} type="button"
                        style={{ marginTop: simpleField ? '4px' : '12px' }}
                    >
                        {add}
                    </button>
                    </div>
                }
            </div>
        );
    }
}

const component = FormSection(FormListSection,true);

function validateSection (v, value = [], sectionProps) { // v, values, sectionProps, output, errors, path
    const { listLength, fixedList, repeatThing, simpleField } = sectionProps;
    // const cc = fixedList ? value.length : parseInt(listLength);
    const cc = fixedList ? (simpleField ? Math.max(value.length,1) : value.length) : parseInt(listLength); // at least one field
    for(let n=0;n<cc;n++) {
        v( repeatThing, { name: String(n) } );
    }
    return true;
}

/** make a field or section into a repeating array
 *
 * @param name - ie 'listOfThings'
 * @param repeatThing - the component to repeat
 * @param fixedList - true if list is of a fixed size
 * @param [props] - props for this ie maxLength: 10, simpleList: true
 * @return object - props for the repeating section
 */

export function makeRepeatable (name, repeatThing, fixedList, props) {
    return { name, component, validateSection, repeatThing, fixedList, isArray: true, ...props };
}

// helper

function focusTo (el) {
    if (el) { el.focus(); return true; }
}

/** class to render an OriginalComp component with a delete button to the right */

class FieldWithDelete extends React.Component {

    trapBlur = (ev) => {
        if (!this.stopBlur) {
            this.props.onBlur(ev);
        }
        this.stopBlur = false;
    };

    render () {
        const { index, deleteIndex, OriginalComp, ...rest } = this.props;

        // note: ...rest will have onChange, onBlur etc
        return (
            <>
                <div style={{ marginRight: deleteIndex ? '39px' : '0' }}>
                    <OriginalComp
                        {...rest}
                        onBlur={this.trapBlur}
                    />
                </div>
                {deleteIndex &&
                    <button
                        aria-label="Delete list option"
                        onClick={() => deleteIndex(index)}
                        className="btn btn-default btn-mini sq-left"
                        type="button"
                        style={{position: 'absolute', right: '0', top: '0', height: '40px', width: '40px'}}
                        onMouseDown={() => {
                            this.stopBlur = true;
                        }}
                    >
                        &#10005;
                    </button>
                }
            </>
        );
    }
}

/** returns props to render a field with index and a delete button */

function fieldWithDeleteButton (index, excludeValues, deleteIndex, renderField, fieldProps) {

    const { component } = fieldProps;
    const OriginalComp = component || 'input';

    return renderField({
        ...fieldProps,
        index,
        name: String(index),
        excludeValues,
        deleteIndex,
        component: FieldWithDelete,
        OriginalComp,
        inputClass: deleteIndex ? 'sq-right' : undefined,
        fieldClass: 'rep-no-label',
        showLabel: false
    });
    /*
    const { component } = repeatProps;
    const Comp = component || 'input';

    let okBlur = true;

    function compTrapBlur (props) {
        function trapBlur (ev) {
            console.log('HEY MY BLUR');
            if (okBlur) props.onBlur(ev);
            okBlur = true;
        }
        return <Comp key={'TIEM'+n} {...props} onBlur={trapBlur}/>;
    }

    return (
        <div key={'XXX'+String(n)} className="field-repeat">
            <div style={{ marginRight: '39px' }}>
                {renderField({ ...repeatProps, name: String(n), excludeValues: value, inputClass: 'sq-right', component: compTrapBlur })}
            </div>
            <button
                aria-label="Delete list option"
                onClick={() => deleteIndex(n)}
                className="btn btn-default btn-mini sq-left"
                type="button"
                style={{ position: 'absolute', right: '0', top: '0', height: '40px', width: '40px' }}
                onFocus={() => { console.log('BFOCUS',n); }}
                onMouseDown={() => { okBlur=false; console.log('MOUSE DOWN',n); }}
                onMouseUp={() => { console.log('MOUSE UP CAP',n); }}
            >
                &#10005;
            </button>
        </div>
    );
    */
}

function calcScrollToView (it) {
    if (!it) return;
    const r = it.getBoundingClientRect();
    if (r.top<0) {
        scrollBy(r.top); // scroll up
        //return window.pageYOffset + r.top;
    }
    const h = document.documentElement.clientHeight;
    const d = (r.top+r.height) - h;
    if (d>0) {
        scrollBy(d);
        //return window.pageYOffset + d;
    }
}

function centerScroll (it) {
    if (!it) return;
    const r = it.getBoundingClientRect();
    const h = document.documentElement.clientHeight;
    // const d = ((r.top*2+r.height) / 2) - (h / 2);
    const d = (r.top + (r.height/2)) - (h / 2);
    scrollBy(d);
}

function scrollBy (d) {
    window.scrollBy({ top: d, left: 0, behavior: 'smooth' });
}
