import React from "react";
import {connect} from "react-redux";

export class TaxForm extends React.PureComponent {

    onModField = (name,value) => {
        console.log('onModField',name,value);
        const values = this.props.values;
        const updateRedux = this.props.updateRedux;
        const changed = { ...values, [name]: value };
        updateRedux({ type: 'SET', key: this.props.name, value: changed })
    };

    TaxRef = make(this,'taxRef');
    FirstName = make(this,'firstName');
    LastName = make(this,'lastName');
    Email = make(this,'emailAddr');

    render () {
        const {TaxRef, FirstName, LastName, Email} = this;
        const v = (id) => this.props.values[id];
        return (
            <div>
                <h3>{this.props.name}</h3>
                <TaxRef value={v('taxRef')}/>
                <FirstName value={v('firstName')}/>
                <LastName value={v('lastName')}/>
                <Email value={v('emailAddr')}/>
            </div>
        );
    }
}

const DEF_VAL = {};

function mapStateToProps (state,props) {
    const values = state.formState[props.name] || DEF_VAL;
    return {
        values
    };
}

export const updateRedux = (action) => {
    return function (dispatch/*, getState*/) {
        return dispatch(action);
    };
};

export default connect(mapStateToProps,{updateRedux},null,{ withRef: true })(TaxForm);

// ***********************

function make(parent, name) {
    const full = parent.props.name + '-' + name;

    class AField extends React.PureComponent {

        onChange = (ev) => {
            const mod = ev.target.value;
            parent.onModField(name,mod,this);
        };

        render () {
            const value = this.props.value || '';
            return (
                <div className="form-field">
                    <label htmlFor={full}>{full}</label>
                    <input id={full} onChange={this.onChange} value={value}/>
                </div>
            );
    }
    }

    return AField;
}
