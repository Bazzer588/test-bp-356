import React from "react";
import FormSection from './FormSection';

const HomePhone = { name: 'homePhone', maxLength: 12, required: false };
const MobilePhone = { name: 'mobilePhone', maxLength: 12, required: false };
const Email = { name: 'emailAddress', maxLength: 80, minLength: 10, required: false, /*autoComplete: 'never-ever',*/ htmlId: 'otherField' };

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