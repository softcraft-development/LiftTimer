import "./index.html"
import "./index.scss"
import ReactDOM from "react-dom"
import React from "react"
import TimerApp from "./timerApp"

document.addEventListener("DOMContentLoaded", function () {
  const domContainer = document.getElementById("timer-app")
  ReactDOM.render(<TimerApp />, domContainer)
})
