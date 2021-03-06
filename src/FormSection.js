import React from 'react';
import FormField from "./FormField";

export default function make (Wrapped, isArray) {

    const DEF = isArray ? DEF_ARR : DEF_VAL;
    const wrap = Wrapped.defaultProps && Wrapped.defaultProps.wrap;

    class FormSection extends React.PureComponent {

        constructor (props) {
            super(props);
            this.myRef = React.createRef();
            this.state = {};
        }

        getWrappedInstance () {
            return this.myRef.current;
        }

        setShowErrors = (showErrors) => {
            console.log('CALLED setShowErrors',this);
            this.setState({ showErrors });
        };

        /*testClick = (ev) => {
            const node = this.getWrappedInstance();
            console.log('NODE', node);
            node.testHit(ev);
        };*/

        onBlurField = (fieldName,newValue) => {
            const { touched, name, updateRedux, parent } = this.props;

            //const changed = { ...touched, [fieldName]: newValue };
            let changed;
            if (isArray) {
                changed = touched ? [...touched] : [];
                changed[fieldName] = newValue;
            } else {
                changed = {...touched, [fieldName]: newValue};
            }

            if (updateRedux)
                updateRedux({ type: 'SET', key: name+'_T', value: changed });
            if (parent) {
                parent.onBlurField(name,changed,this);
            }
        };

        onChangeField = (fieldName, newValue) => {
            const {value, name, updateRedux, parent} = this.props;

            // const changed = {...value, [fieldName]: newValue};
            let changed;
            if (isArray) {
                changed = value ? [...value] : [];
                changed[fieldName] = newValue;
            } else {
                changed = {...value, [fieldName]: newValue};
            }

            const w = this.getWrappedInstance();
            if (w && w.onDataChange) {
                w.onDataChange(changed,this.state.showErrors || this.props.showErrors,fieldName);
            }

            if (updateRedux)
                updateRedux({type: 'SET', key: name, value: changed});
            if (parent) {
                parent.onChangeField(name, changed, this);
            }
        };

        renderField = (fieldProps, extraProps) => {

            // const stt = this.getWrappedInstance().state;
            // console.log('renderField',fieldProps);

            const Compo = fieldProps.validateSection ? fieldProps.component : FormField;
            const {name, path, touched = DEF, value = DEF, coreData} = this.props;
            const showErrors = this.state.showErrors || this.props.showErrors;

            if (!name) {  // only sections can be nameless
                return <Compo
                    {...fieldProps}
                    {...extraProps}
                    coreData={coreData}
                    parent={this}
                    path={path}
                    showErrors={showErrors}
                    touched={touched}
                    value={value}
                />
            }

            // --- it has a name ---
            const fullPath = path ? path + '-' + name : name;   // ie 'myForm-roomList-2-roomNumber'
            // console.log('RF',fullPath,fieldProps.name);
            return <Compo
                {...fieldProps}
                {...extraProps}
                coreData={coreData}
                key={fullPath + '-' + fieldProps.name}
                parent={this}
                path={fullPath}
                showErrors={showErrors}
                touched={touched[fieldProps.name]}
                value={value[fieldProps.name]}
            />
        };

        render () {
            // console.log('REND',this.props.name,this.state.showErrors);

            // ref={this.myRef}   // this does not work if Wrapped is a functional component
            return (
                <Wrapped
                    showErrorsWrap={this.state.showErrors}
                    {...this.props}
                    renderField={this.renderField}
                    setShowErrors={this.setShowErrors}
                    ref={wrap ? this.myRef : undefined}
                />
            );
        }
    }

    FormSection.defaultProps = Wrapped.defaultProps;

    return FormSection;
}

const DEF_VAL = {};
const DEF_ARR = [];
