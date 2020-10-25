
import "./index.html"
import "./index.scss"
import React from "react"
import ReactDOM from "react-dom"
import TimerApp from "./timerApp"


document.addEventListener("DOMContentLoaded", function () {
  const app = <TimerApp />
  const domContainer = document.getElementById("timer-app")
  ReactDOM.render(app, domContainer)
})
