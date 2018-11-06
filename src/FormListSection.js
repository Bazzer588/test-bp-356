import React from 'react';
import FormSection from "./FormSection";

class FormListSection extends React.PureComponent {

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
            arr.push( renderField({ ...repeatThing, name: String(n), deleteIndex: this.deleteIndex }) );
        }

        return (
            <div>
                {arr}
                {fixedList &&
                    <button className="btn btn-secondary btn-mini" onClick={this.addOne} type="button" style={{ marginTop: '12px' }}>Add another person</button>
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
