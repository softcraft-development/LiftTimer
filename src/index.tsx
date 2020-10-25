
import "./index.html"
import "./index.scss"
import { Provider } from "react-redux"
import { createStore } from "redux"
import React from "react"
import ReactDOM from "react-dom"
import rootReducer from "./rootReducer"
import TimerApp from "./timerApp"
import { load, save } from "./actions/load"
import { devToolsEnhancer } from "redux-devtools-extension"


const store = createStore(
  rootReducer,
  devToolsEnhancer({})
)
store.dispatch(load())

store.subscribe(() => {
  save(store.getState())
})

document.addEventListener("DOMContentLoaded", function () {
  const app = <Provider store={store}>
    <TimerApp />
  </Provider>

  const domContainer = document.getElementById("timer-app")
  ReactDOM.render(app, domContainer)
})
