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

    addOne = () => {
        const { name, parent, value = [], touched = [] } = this.props;
        console.log('ADD ONE',value);
        const newValue = [ ...value, {} ];
        const newTouched = [ ...touched, {} ];
        parent.onChangeField(name,newValue);
        parent.onBlurField(name,newTouched);
    };

    deleteIndex = (i) => {
        const { name, parent, value = [], touched = [] } = this.props;
        console.log('deleteIndex',i,value);
        const newValue = [ ...value ];
        const newTouched = [ ...touched ];
        newValue.splice(i,1);
        newTouched.splice(i,1);
        parent.onChangeField(name,newValue);
        parent.onBlurField(name,newTouched);
    };

    render () {
        const { fixedList, listLength, renderField, repeatThing, value = [] } = this.props;
        const cc = fixedList ? value.length : parseInt(listLength);
        if (!cc && !fixedList)
            return null;

        const arr = [];
        for(let n=0;n<cc;n++) {
            arr.push( renderField({ ...repeatThing, name: String(n), deleteIndex: this.deleteIndex, renderHeading: this.renderHeading }) );
        }

        const add = cc ? 'Add another person' : 'Add a person';

        return (
            <div>
                {arr}
                {fixedList &&
                    <button className="btn btn-secondary btn-mini" onClick={this.addOne} type="button" style={{ marginTop: '12px' }}>{add}</button>
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

export function makeRepeatable (name, repeatThing, fixedList) {
    return { name, component, validateSection, repeatThing, fixedList, isArray: true };
}
