
import "bulma/css/bulma.css";
import React from "react";
import { render } from "react-dom";
import { createStore, applyMiddleware } from "redux";
import { createLogger } from "redux-logger";
import { Provider } from "react-redux";
import thunk from "redux-promise";

import "./global.css";
import { config } from "./app.config";
import App from "./containers/App.jsx";
import { fetchDogs } from "./actions/api.jsx"
import rootReducer from "./reducers";


const middleware = [ thunk ]
if (config.env !== "production") {
  middleware.push(createLogger());
}

const store = createStore(
  rootReducer,
  applyMiddleware(...middleware)
);

render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById("app")
);

// failure scenario is handled by the UI components
store.dispatch(fetchDogs());
