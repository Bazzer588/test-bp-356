import {combineReducers, createStore, applyMiddleware} from 'redux';
import thunk from 'redux-thunk';

const DEF_STATE = {
    coreData: {
        lang: 'en'
    }
};

// reducer

function formState (state = DEF_STATE, action) {
    //console.log('REDX',action);

    switch(action.type) {
        case 'SET':             // { type: 'SET', key: 'myThing', value: {...} }
            return {
                ...state,
                [action.key]: action.value
            };
        case 'CORE':            // { type: 'CORE', data: { lang: 'de' } }
            return {
                ...state,
                coreData: {
                    ...state.coreData,
                    ...action.data
                }
            };
        default:
            return state;
    }
}

const rootReducer = combineReducers({
    formState
});

function configureStore () {
    return createStore(
        rootReducer,
        window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__(),
        applyMiddleware(thunk)
    );
}

const store = configureStore();

export default store;
