import {connect} from "react-redux";

const DEF_VAL = {};

function mapStateToProps (state, props) {
    const value = state.formState[props.name] || DEF_VAL;
    const touched = state.formState[props.name+'_T'] || DEF_VAL;
    return {
        value,
        touched,
        coreData: state.formState.coreData // language etc
    };
}

const updateRedux = (action) => (dispatch) => {   // (dispatch, getState)
    return dispatch(action);
};

export default function FormConnect (reactClass) {
    return connect(mapStateToProps,{updateRedux},null,{ withRef: true })(reactClass);
}
