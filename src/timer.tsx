import React, { useEffect, useRef, useState } from "react"
import { Sounds } from "./workingOut"

const RATE = 10

export interface Props {
  id: unknown
  on: boolean
  initalTime: number
  onTick: OnTick
  sounds: Sounds | null
}

type Interval = NodeJS.Timeout | null
type OnTick = (timeLeft: number) => void

export interface Tick {
  timeLeft: number
  lastUpdate: number | null
}

export function Timer(props: Props): JSX.Element {
  const [tick, setTick] = useState<Tick>({
    lastUpdate: null,
    timeLeft: props.initalTime,
  })

  const onTick = useRef<OnTick>(props.onTick)
  useEffect(() => {
    onTick.current = props.onTick
  }, [props.onTick])

  const interval = useRef<Interval>(null)
  const endInterval = () => {
    if (interval.current) {
      clearInterval(interval.current)
      interval.current = null
    }
  }

  useEffect(() => {
    setTick({
      lastUpdate: null,
      timeLeft: props.initalTime,
    })
  }, [props.id, props.initalTime])

  useEffect(() => {
    if (!props.on) {
      endInterval()
      setTick((lastTick) => {
        return {
          ...lastTick,
          lastUpdate: null
        }
      })
      return
    }

    if (interval.current) {
      return
    }
    interval.current = setInterval(() => {
      setTick((lastTick) => {
        const lastUpdate = Date.now()
        if (lastTick.lastUpdate === null) {
          return {
            ...lastTick,
            lastUpdate
          }
        }
        const elapsed = (lastUpdate - lastTick.lastUpdate) / 1000
        const timeLeft = Math.max(lastTick.timeLeft - elapsed, 0)
        if (lastTick.timeLeft === timeLeft) {
          return lastTick
        }
        if (props.sounds) {
          const difference = Math.floor(lastTick.timeLeft) - Math.floor(timeLeft)
          if (difference >= 1) {
            if (timeLeft < 1) {
              props.sounds.high.play()
            }
            else if (timeLeft <= 4) {
              props.sounds.low.play()
            }
          }
        }
        onTick.current(timeLeft)
        return {
          timeLeft,
          lastUpdate,
        }
      })
    }, 1000 / RATE)
  }, [props.on, props.sounds])

  useEffect(() => {
    return () => {
      endInterval()
    }
  }, [])

  return <div className="timer">
    {Math.ceil(tick.timeLeft).toLocaleString("en-ca", {
      minimumFractionDigits: 0,
    })}
  </div>
}

export default Timer
