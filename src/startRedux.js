import {combineReducers, createStore, compose, applyMiddleware} from 'redux';
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
    // https://github.com/zalmoxisus/redux-devtools-extension#12-advanced-store-setup
    const composeEnhancer = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

    console.log('REDUX',window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__);

    return createStore(
        rootReducer,
        composeEnhancer(applyMiddleware(thunk)),
    );

    /*
    return createStore(
        rootReducer,
        window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__(),
        applyMiddleware(thunk)
    );
    */
}

const store = configureStore();

export default store;
