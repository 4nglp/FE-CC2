import { createStore, compose, applyMiddleware, combineReducers } from "redux";
import { thunk } from "redux-thunk";
import cartReducer from "./reducers";
import throttle from "lodash.throttle";

function loadState() {
  try {
    const state = localStorage.getItem("cart");

    if (state !== null) {
      return JSON.parse(state);
    }
  } catch (e) {
    // Ignore errors
  }

  return {
    cart: [],
  };
}

function saveState(state) {
  console.log("saveState..");
  localStorage.setItem("cart", JSON.stringify(state));
}

const appReducers = combineReducers({
  cart: cartReducer,
});

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const store = createStore(
  appReducers,
  loadState(),
  composeEnhancers(applyMiddleware(thunk))
);

store.subscribe(
  throttle(() => {
    saveState(store.getState());
  }, 2000)
);

export default store;
