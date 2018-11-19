import React from "react";
import FormSection from "../FormSection";

export default function makeGenericSection (name, fields) {

    function validateSection (v) {
        fields.forEach( field => v(field) );
    }

    function render (props) {
        const { path, name, renderField, renderHeading } = props;
        return (
            <div id={path+'-'+name}>
                {renderHeading && renderHeading(name,'Item')}
                {fields.map( field => renderField(field) )}
            </div>
        );
    }

    const component = FormSection(render); // wrap it in a HOC

    return { name, component, validateSection };
}
