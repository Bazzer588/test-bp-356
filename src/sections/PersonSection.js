import React from "react";
import FormSection from '../FormSection';
import { stringTypeField } from '../validation/validateString'
import Radios from "../components/Radios";

const FullName = stringTypeField( 'fullName', { required: true });
const DateOfBirth = stringTypeField( 'dob', { type: 'tel' });
const Gender = stringTypeField( 'gender', {component: Radios, options: 'gender', required: true, showLabel: false, label: 'Person Gender', inputClass: 'medium', className: 'horizontal' });

function validateSection (v) { // v, values, sectionProps, output, errors, path
    v(FullName);
    v(DateOfBirth);
    v(Gender);
}

class PersonSection extends React.PureComponent {

    render () {
        const { name, renderField, deleteIndex } = this.props;
        const index = parseInt(name);
        return (
            <>
                {index>=0 &&
                    <div style={{ margin: '16px 0 0 2px', fontWeight: '600', color: '#444', fontSize: '17px' }} >
                        Person number {index+1}
                        <button onClick={() => deleteIndex(index)} className="btn btn-secondary btn-mini" type="button" style={{ float: 'right' }}>Delete</button>
                    </div>
                }
                {renderField(FullName)}
                {renderField(DateOfBirth)}
                {renderField(Gender)}
                <hr/>
            </>
        );
    }

}

const component = FormSection(PersonSection);

export function makePersonSection (name) {
    return  { name, component, validateSection }
}
