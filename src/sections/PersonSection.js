import React from "react";
import FormSection from '../FormSection';
import {stringTypeField} from '../validation/validateString'
import {radioTypeField} from "../components/Radios";

const FullName = stringTypeField( 'fullName', { required: true });
const DateOfBirth = stringTypeField( 'dob', { type: 'tel' });
const Gender = radioTypeField('gender', { options: 'gender', required: true, className: 'horizontal' });

function validateSection (v) { // v, values, sectionProps, output, errors, path
    v(FullName);
    v(DateOfBirth);
    v(Gender);
}

class PersonSection extends React.PureComponent {

    render () {
        const { path, name, renderField, renderHeading } = this.props;
        return (
            <div id={path+'-'+name}>
                {renderHeading && renderHeading(name,'Person number')}
                {renderField(FullName)}
                {renderField(DateOfBirth)}
                {renderField(Gender)}
                <hr/>
            </div>
        );
    }

}

const component = FormSection(PersonSection); // wrap it in a HOC

export function makePersonSection (name) {
    return  { name, component, validateSection }
}
