import { applyMiddleware, createStore, compose } from "redux";
import reduxPromise from "redux-promise";
import reduxThunk from "redux-thunk";
import reducer from "./reducers";


const store = createStore(
    reducer,
    compose(
        applyMiddleware(reduxPromise, reduxThunk),
        window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__(),
    )
    );

export default store;