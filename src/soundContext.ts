import { Howl } from "howler"
import React from "react"
import "./sounds.mp3"

export const sounds = new Howl({
  src: ["/sounds.mp3"],
  sprite: {
    high: [501, 500],
    low: [0, 500],
  }
})

const SoundContext = React.createContext(sounds)

export default SoundContext