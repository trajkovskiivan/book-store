import { createStore, applyMiddleware } from "redux";
import thunk from "redux-thunk";
import rootReducer from "./reducers";
import logger from "redux-logger";

// const middlewares = [thunk];
let middlewares = [thunk, logger];
const middlewareEnhancer = applyMiddleware(...middlewares);
export default function configureStore() {
  return createStore(rootReducer, middlewareEnhancer);
}
