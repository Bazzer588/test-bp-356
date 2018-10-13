import React from 'react';
import {stringTypeField} from '../validation/validateString';
import FormSection from '../FormSection';
import Select from '../components/Select';
//import {translate} from "../components/AppConfig";

// name/number + street ?
const Address1 = stringTypeField( 'address1', {maxLength: 35, required: true });
const Area = stringTypeField( 'address2', {maxLength: 35, required: false });
const City = stringTypeField( 'city', {maxLength: 35, required: false });
const Region = stringTypeField( 'region', {maxLength: 35, required: false, minLength: 2 });
const ZipCode = stringTypeField( 'zipCode', {maxLength: 12, autoComplete: 'postal-code', required: false, inputClass: 'narrow', minLength: 4 });
const Country = stringTypeField( 'country', {component: Select, options: 'country', required: true });

export function validateAddress (v) { // v, values, sectionProps, output, errors, path
    v(Country);
    v(Address1);
    v(Area);
    v(City);
    v(Region);
    v(ZipCode);
}

class AddressSection extends React.PureComponent {

    render () {
        //const { children } = this.props;
        const Field = this.props.renderField;
        return ([
            Field( Country ),
            Field( Address1 ),
            Field( Area ),
            Field( City ),
            Field( Region  ),
            Field( ZipCode )
        ]);
    }

}

export default FormSection(AddressSection);

/*
            <fieldset className="form-fieldset">
                <legend>{translate(this.props.name)}</legend>
                {Field( City )}
                {Field( Region )}
                {Field( ZipCode )}
                {Field( Country )}
                {children}
            </fieldset>

const nod = {
    div: { className: 'h3',
        children: [
            { heading: { kind: 'h3', text: 'props.title' } },
            { field: 'City' },
            { field: 'Region' }
        ]
    }
};
*/
