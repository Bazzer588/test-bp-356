import React from "react";
import FormField from './FormField';

function stdOnBlurField (fieldName,newValue) {
    const { touched, name, updateRedux, parent } = this.props;
    const changed = { ...touched, [fieldName]: newValue };
    if (updateRedux)
        updateRedux({ type: 'SET', key: name+'_T', value: changed });
    if (parent) {
        parent.onBlurField(name,changed,this);
    }
}

function stdOnChangeField (fieldName,newValue) {
    const { value, name, updateRedux, parent } = this.props;
    const changed = { ...value, [fieldName]: newValue };
    if (updateRedux)
        updateRedux({ type: 'SET', key: name, value: changed });
    if (parent) {
        parent.onChangeField(name,changed,this);
    }
}

function stdRenderField (fieldProps,extraProps) {
    const Compo = fieldProps.validateSection ? fieldProps.component : FormField;
    const { path, name, touched, value, coreData } = this.props;
    return <Compo
        {...fieldProps}
        parent={this}
        path={path ? path+'-'+name : name}
        touched={touched[fieldProps.name]}
        value={value[fieldProps.name]}
        coreData={coreData}
        {...extraProps}
    />
}

function extendSection (t) {
    if (!t.renderField) {
        t.onChangeField = stdOnChangeField.bind(t);
        t.onBlurField = stdOnBlurField.bind(t);
        t.renderField = stdRenderField.bind(t);
    }
    return t.renderField;
}

export default function FormSection ({ parent, children }) {

    const renderField = extendSection(parent);

    return children(renderField);
}
