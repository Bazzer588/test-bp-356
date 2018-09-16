import React from "react";
import FormSection from './FormSection';
import { stringTypeField, emailTypeField } from './validation/validateString'

const HomePhone = stringTypeField( 'homePhone', { maxLength: 12, required: false });
const MobilePhone = stringTypeField( 'mobilePhone', { maxLength: 12, required: false, idiot: '38439' });
const Email = emailTypeField( 'emailAddress', { maxLength: 80, minLength: 6, required: false, spellCheck: false, /*autoComplete: 'never-ever',*/ htmlId: 'otherField' });

export function validateContactSection (v) { // v, values, sectionProps, output, errors, path
    v(HomePhone);
    v(MobilePhone);
    v(Email);
}

class ContactSection extends React.PureComponent {

    render () {
        const { renderField, value = {}, touched = {} } = this.props;
        const Field = renderField;
        const v = value[HomePhone.name] || value[MobilePhone.name] || value[Email.name] ;
        const z = !!touched[HomePhone.name] && !!touched[MobilePhone.name] && !!touched[Email.name] ;
        const t = (z && !v);
        return (
            <React.Fragment>
                <Field {...HomePhone} required={t} sdtupid={87} />
                <Field {...MobilePhone} required={t} />
                <Field {...Email} required={t} />
            </React.Fragment>
        );
    }

}

export default FormSection(ContactSection);

/*
    {renderField(HomePhone,{ required: t })}
    {renderField(MobilePhone,{ required: t })}
    {renderField(Email,{ required: t })}

 */