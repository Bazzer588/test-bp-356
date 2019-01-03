import {connect} from "react-redux";

const DEF_VAL = {};

const updateRedux = (action) => (dispatch) => {   // (dispatch, getState)
    return dispatch(action);
};

export default function FormConnect (reactClass) {
    const defaultName = reactClass.defaultProps && reactClass.defaultProps.name;

    // props param below appears to ignore defaultProps

    function mapStateToProps (state, props) {
        const name = props.name || defaultName;
        const value = state.formState[name] || DEF_VAL;
        const touched = state.formState[name+'_T'] || DEF_VAL;
        return {
            value,
            touched,
            coreData: state.formState.coreData // language etc
        };
    }

    // return connect(mapStateToProps,{updateRedux},null,{ withRef: true })(reactClass);
    return connect(mapStateToProps,{updateRedux})(reactClass);
}

/** connect something which is not a form */

export function justConnect (reactClass) {

    function mapStateToProps (state) {
        return {
            coreData: state.formState.coreData // language etc
        };
    }

    //return connect(mapStateToProps,{updateRedux},null,{ withRef: true })(reactClass);
    return connect(mapStateToProps,{updateRedux})(reactClass);
}
