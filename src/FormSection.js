import React from 'react';
import FormField from "./FormField";

export default function make (Wrapped) {

    class FormSection extends React.PureComponent {

        constructor (props) {
            super(props);
            this.myRef = React.createRef();
        }

        getWrappedInstance () {
            return this.myRef.current;
        }

        testClick = (ev) => {
            const node = this.getWrappedInstance();
            console.log('NODE', node);
            node.testHit(ev);
        };

        onBlurField = (fieldName,newValue) => {
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
            const {name, path, touched = DEF_VAL, value = DEF_VAL, coreData} = this.props;

            if (!name) {  // only sections can be nameless
                return <Compo
                    {...fieldProps}
                    {...extraProps}
                    coreData={coreData}
                    parent={this}
                    path={path}
                    touched={touched}
                    value={value}
                />
            }

            // --- it has a name ---
            const fullPath = path ? path + '-' + name : name;
            // console.log('RF',fullPath,fieldProps.name);
            return <Compo
                {...fieldProps}
                {...extraProps}
                coreData={coreData}
                key={fullPath + '-' + fieldProps.name}
                parent={this}
                path={fullPath}
                touched={touched[fieldProps.name]}
                value={value[fieldProps.name]}
            />
        };

        render () {
            return (
                <Wrapped ref={this.myRef} {...this.props} renderField={this.renderField}/>
            );
        }
    }

    FormSection.defaultProps = Wrapped.defaultProps;

    return FormSection;
}

const DEF_VAL = {};
