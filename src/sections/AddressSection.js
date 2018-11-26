import React from 'react';
import {stringTypeField} from '../validation/validateString';
import FormSection from '../FormSection';
import Select from '../components/Select';
//import {translate} from "../components/AppConfig";

// name/number + street ?
const Country = stringTypeField( 'country', {component: Select, options: 'country', required: true }); // TODO selectTypeField
const Address1 = stringTypeField( 'address1', {maxLength: 35, required: true });
const Area = stringTypeField( 'address2', {maxLength: 35, required: false });
const City = stringTypeField( 'city', {maxLength: 35, required: false });
const Region = stringTypeField( 'region', {maxLength: 35, required: false, minLength: 2 });
const ZipCode = stringTypeField( 'zipCode', {maxLength: 12, autoComplete: 'postal-code', required: false, inputClass: 'narrow upper-case', minLength: 4 });

function validateSection (v) { // v, values, sectionProps, output, errors, path
    v(Country);
    v(Address1);
    v(Area);
    v(City);
    v(Region);
    v(ZipCode);
}

class AddressComponent extends React.PureComponent {

    render () {
        const { renderField, value } = this.props;
        if (value && value.country==='AX') { // Aland islands
            return ([
                renderField( Country ),
                renderField( Address1 ),
                renderField( ZipCode )
            ]);
        }
        const required = value && value.country==='AL'; // test, require city & zip for Albania...
        return ([
            renderField( Country ),
            renderField( Address1 ),
            renderField( Area ),
            renderField( City, { required } ),
            renderField( Region ),
            renderField( ZipCode, { required } )
        ]);
    }
}

const component = FormSection(AddressComponent);

export function makeAddressSection (name, props) {
    return  { name, component, validateSection, ...props };
}

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
