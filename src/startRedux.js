import {combineReducers, createStore, applyMiddleware} from 'redux';
import thunk from 'redux-thunk';

const DEF_STATE = {
    coreData: {
        lang: 'en',
        showAllErrors: false
    }
};

// reducer

function formState(state = DEF_STATE, action) {
    //console.log('REDX',action);
    if (action.type === 'SET') {
        return {
            ...state,
            [action.key]: action.value
        };
    }
    return state;
}

const rootReducer = combineReducers({
    formState
});

function configureStore() {
    return createStore(
        rootReducer,
        window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__(),
        applyMiddleware(thunk)
    );
}

const store = configureStore();

export default store;
