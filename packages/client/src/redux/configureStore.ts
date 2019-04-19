import { applyMiddleware, createStore, Middleware, Store } from "redux";
import createSagaMiddleware, { Task } from "redux-saga";
import { defaultFareMatrix } from "../defaults";
import localKeys from "../localStorageKeys";
import rootReducer from "./reducer";
import rootSaga from "./saga";

const sagaMiddleware = createSagaMiddleware();

const bindMiddleware = (middleware: Middleware[]) => {
  if (process.env.NODE_ENV !== "production") {
    const { composeWithDevTools } = require("redux-devtools-extension");
    return composeWithDevTools(applyMiddleware(...middleware));
  }
  return applyMiddleware(...middleware);
};

interface SagaStore<T> extends Store<T> {
  runSagaTask?: () => void;
  sagaTask?: Task;
}

function configureStore(initialState: {}) {
  const store: SagaStore<{}> = createStore(
    rootReducer,
    initialState,
    bindMiddleware([sagaMiddleware])
  );

  store.runSagaTask = () => {
    initLocalStorage();
    store.sagaTask = sagaMiddleware.run(rootSaga);
  };

  store.runSagaTask();
  return store;
}

function initLocalStorage() {
  if (typeof localStorage !== "undefined") {
    if (!localStorage.getItem(localKeys.fareMatrix)) {
      localStorage.setItem(
        localKeys.fareMatrix,
        JSON.stringify(defaultFareMatrix)
      );
    }
    if (!localStorage.getItem(localKeys.rideIds)) {
      localStorage.setItem(localKeys.rideIds, JSON.stringify([]));
    }
  }
}

export default configureStore;
