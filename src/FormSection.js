import React from 'react';
import FormField from "./FormField";

export default function make (Wrapped) {

    class FormSection extends React.Component {

        constructor(props) {
            super(props);
            this.myRef = React.createRef();
        }

        testClick = (ev) => {
            const node = this.myRef.current;
            console.log('NODE', node);
            node.testHit(ev);
        };

        onBlurField  = (fieldName,newValue) => {
            const { touched, name, updateRedux, parent } = this.props;
            const changed = { ...touched, [fieldName]: newValue };
            if (updateRedux)
                updateRedux({ type: 'SET', key: name+'_T', value: changed });
            if (parent) {
                parent.onBlurField(name,changed,this);
            }
        };

        onChangeField = (fieldName, newValue) => {
            const {value, name, updateRedux, parent} = this.props;
            const changed = {...value, [fieldName]: newValue};
            if (updateRedux)
                updateRedux({type: 'SET', key: name, value: changed});
            if (parent) {
                parent.onChangeField(name, changed, this);
            }
        };

        renderField = (fieldProps, extraProps) => {
            const Compo = fieldProps.validateSection ? fieldProps.component : FormField;
            const {path, name, touched = {}, value = {}, coreData} = this.props;
            return <Compo
                {...fieldProps}
                parent={this}
                path={path ? path + '-' + name : name}
                touched={touched[fieldProps.name]}
                value={value[fieldProps.name]}
                coreData={coreData}
                {...extraProps}
            />
        };

        render() {
            return (
                <Wrapped ref={this.myRef} {...this.props} renderField={this.renderField}/>
            );
        }
    }

    return FormSection;
}
