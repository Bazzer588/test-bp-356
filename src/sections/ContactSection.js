import React from "react";
import FormSection from '../FormSection';
import { stringTypeField, emailTypeField } from '../validation/validateString'

const HomePhone = stringTypeField( 'homePhone', { maxLength: 12, type: 'tel', required: false });
const MobilePhone = stringTypeField( 'mobilePhone', { maxLength: 12, type: 'tel', required: false, idiot: '38439' });
const Email = emailTypeField( 'emailAddress', { maxLength: 80, minLength: 6, required: false, spellCheck: false, /*autoComplete: 'never-ever',*/ htmlId: 'otherField', type: 'email' });

export function validateContactSection (v) { // v, values, sectionProps, output, errors, path
    v(HomePhone);
    v(MobilePhone);
    v(Email);
}

class ContactSection extends React.PureComponent {

    render () {
        const { name, renderField, value = {}, touched = {} } = this.props;
        const Field = renderField;
        const v = value[HomePhone.name] || value[MobilePhone.name] || value[Email.name] ;
        const z = !!touched[HomePhone.name] && !!touched[MobilePhone.name] && !!touched[Email.name] ;
        const t = (z && !v);
        const index = parseInt(name);
        return (
            <>
                {index>=0 && <div style={{ margin: '16px 0 0 2px', fontWeight: '600', color: '#444', fontSize: '17px' }} >Contact number {index+1}</div>}
                <Field {...HomePhone} required={t} sdtupid={87} />
                <Field {...MobilePhone} required={t} />
                <Field {...Email} required={t} />
            </>
        );
    }

}

const Section = FormSection(ContactSection);
export default Section;

export function makeContactSection (name) {
    return  { name, component: Section, validateSection: validateContactSection }
}

/*
    {renderField(HomePhone,{ required: t })}
    {renderField(MobilePhone,{ required: t })}
    {renderField(Email,{ required: t })}

 */