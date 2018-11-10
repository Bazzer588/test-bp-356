import React from 'react';
import FormSection from "./FormSection";

class FormListSection extends React.PureComponent {

    renderHeading = (index, text) => {
        index = parseInt(index);
        return (
            <div style={{ margin: '16px 0 0 2px', fontWeight: '600', color: '#444', fontSize: '17px' }} >
                {text} {index+1}
                <button onClick={() => this.deleteIndex(index)} className="btn btn-secondary btn-mini" type="button" style={{ float: 'right', marginTop: '2px' }}>
                    Delete
                </button>
            </div>
        );
    };

    addOne = (ev) => {
        const { name, path, parent, value = [], touched = [], simpleField } = this.props;
        console.log('ADD ONE',value);
        const def = simpleField ? '' : {};
        const newValue = [ ...value, def ];
        const newTouched = [ ...touched, def ];
        parent.onChangeField(name,newValue);
        parent.onBlurField(name,newTouched);
        const btn = ev.target;
        const id = path+'-'+name+'-'+value.length; // ie 'page-list-0'
        setTimeout( () => {
            btn.scrollIntoView(); // HACK scroll the add button into view
            focusTo(document.getElementById(id));
        }, 25);
    };

    deleteIndex = (i) => {
        const { name, path, parent, value = [], touched = [] } = this.props;
        console.log('deleteIndex',i,value);
        const newValue = [ ...value ];
        const newTouched = [ ...touched ];
        newValue.splice(i,1);
        newTouched.splice(i,1);
        parent.onChangeField(name,newValue);
        parent.onBlurField(name,newTouched);
        // focus
        if (i>=newValue.length) i--;
        const id = path+'-'+name+'-'+i; // ie 'page-list-0'
        //setTimeout( () => {
            focusTo(document.getElementById(id));
        //}, 25);
    };

    render () {
        const { fixedList, listLength, renderField, repeatThing, addLabel, simpleField, maxLength = 999 } = this.props;
        //const dv = simpleField ? [''] : []; // def value array
        const { value = [] } = this.props;
        const cc = fixedList ? value.length : parseInt(listLength);
        if (!cc && !fixedList)
            return null;

        // console.log('REPEAT',value);

        const arr = [];

        if (simpleField) {
            if (cc===1) { // if no delete 1
                arr.push(
                    <div key="0" className="field-repeat">
                        <div>
                            {renderField({ ...repeatThing, name: '0' })}
                        </div>
                    </div>
                );
            } else
            for(let n=0;n<cc;n++) {
                arr.push(
                    <div key={String(n)} className="field-repeat">
                        <div style={{ marginRight: '39px' }}>
                            {renderField({ ...repeatThing, name: String(n), excludeValues: value, inputClass: 'sq-right' })}
                        </div>
                        <button
                            aria-label="Delete list option"
                            onClick={() => this.deleteIndex(n)}
                            className="btn btn-default btn-mini sq-left"
                            type="button"
                            style={{ position: 'absolute', right: '0', top: '0', height: '40px', width: '40px' }}
                        >
                            &#10005;
                        </button>
                    </div>
                );
            }
        } else {
            for(let n=0;n<cc;n++) {
                arr.push( renderField({ ...repeatThing, name: String(n), deleteIndex: this.deleteIndex, renderHeading: this.renderHeading }) );
            }
        }

        const add = cc ? (addLabel || 'Add another person') : (addLabel || 'Add a person');

        return (
            <div className="form-field" style={{ position: 'relative' }}>
                {simpleField && <label htmlFor={this.props.path+'-'+this.props.name+'-0'}>{this.props.path}-{this.props.name}</label>}
                {arr}
                {fixedList && cc<maxLength &&
                    <button className="btn btn-secondary btn-mini" onClick={this.addOne} type="button" style={{ marginTop: simpleField ? '4px' : '12px' }}>{add}</button>
                }
            </div>
        );
    }
}

const component = FormSection(FormListSection,true);

function validateSection (v, value = [], sectionProps) { // v, values, sectionProps, output, errors, path
    const { listLength, fixedList, repeatThing } = sectionProps;
    const cc = fixedList ? value.length : parseInt(listLength);
    for(let n=0;n<cc;n++) {
        v( repeatThing, { name: String(n) } );
    }
    return true;
}

export function makeRepeatable (name, repeatThing, fixedList, props) {
    return { name, component, validateSection, repeatThing, fixedList, isArray: true, ...props };
}

function focusTo (el) {
    if (el) el.focus();
}
