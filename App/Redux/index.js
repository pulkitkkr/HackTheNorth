import { combineReducers } from "redux";
import { persistReducer } from "redux-persist";
import configureStore from "./CreateStore";
import rootSaga from "../Sagas/";
import ReduxPersist from "../Config/ReduxPersist";

/* ------------- Assemble The Reducers ------------- */
export const reducers = combineReducers({
  nav: require("./NavigationRedux").reducer,
  github: require("./GithubRedux").reducer,
  search: require("./SearchRedux").reducer,
  customerDetails: require("./CustomerDetailRedux").reducer
});

export default () => {
  let { store, sagasManager, sagaMiddleware } = configureStore(
    reducers,
    rootSaga
  );

  if (module.hot) {
    module.hot.accept(() => {
      const nextRootReducer = require("./").reducers;
      store.replaceReducer(nextRootReducer);

      const newYieldedSagas = require("../Sagas").default;
      sagasManager.cancel();
      sagasManager.done.then(() => {
        sagasManager = sagaMiddleware(newYieldedSagas);
      });
    });
  }

  return store;
};
