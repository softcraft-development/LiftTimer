import "./index.html"
import "./index.scss"
import ReactDOM from "react-dom"
import React from "react"

document.addEventListener("DOMContentLoaded", function () {
  const domContainer = document.getElementById("timer-app")
  ReactDOM.render(<div>
    Stuff in a div
  </div>, domContainer)
})
