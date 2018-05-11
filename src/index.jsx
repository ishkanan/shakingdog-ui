
import "bulma/css/bulma.css"
import "react-select/dist/react-select.css"
import "react-table/react-table.css";
import { fromJS } from "immutable"
import React from "react"
import { render } from "react-dom"
import { createStore, applyMiddleware } from "redux"
import { createLogger } from "redux-logger"
import { Provider } from "react-redux"
import thunk from "redux-thunk"

import "./favicon.ico"
import "./global.css"
import { config } from "./app.config"
import { fetchAuditLog, fetchDogs, fetchRelationships } from "./actions/api"
import App from "./containers/App.jsx"
import initialState from "./init.data"
import rootReducer from "./reducers"


const middleware = [ thunk ]
if (config.env !== "production") {
  middleware.push(createLogger())
}

const store = createStore(
  rootReducer,
  fromJS(initialState),
  applyMiddleware(...middleware)
)

render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById("app")
)

store.dispatch(fetchDogs())
store.dispatch(fetchRelationships())
