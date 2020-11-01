
import "./index.html"
import "./index.scss"

import React from "react"
import ReactDOM from "react-dom"
import SoundContext, { sounds } from "./soundContext"
import TimerApp from "./timerApp"


document.addEventListener("DOMContentLoaded", function () {
  const app =
    <SoundContext.Provider value={sounds}>
      <TimerApp />
    </SoundContext.Provider>
  const domContainer = document.getElementById("timer-app")
  ReactDOM.render(app, domContainer)
})
