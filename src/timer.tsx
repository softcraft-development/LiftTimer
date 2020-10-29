import React, { useEffect, useRef, useState } from "react"

const RATE = 10

export interface Props {
  id: unknown
  on: boolean
  initalTime: number
  onTick: (timeLeft: number) => void
}

type Interval = NodeJS.Timeout | null

export function Timer(props: Props): JSX.Element {
  const [timeLeft, setTimeLeft] = useState(props.initalTime)
  const interval = useRef<Interval>(null)

  const endInterval = () => {
    if (interval.current) {
      clearInterval(interval.current)
      interval.current = null
    }
  }

  useEffect(() => {
    setTimeLeft(props.initalTime)
    endInterval()
  }, [props.id, props.initalTime])

  useEffect(() => {
    if (!props.on && interval.current) {
      endInterval()
      return
    }

    if (props.on && !interval.current) {
      let lastUpdate = Date.now()
      let left = timeLeft
      interval.current = setInterval(() => {
        const now = Date.now()
        const elapsed = (now - lastUpdate) / 1000
        left = Math.max(left - elapsed, 0)
        if (timeLeft <= 0) {
          endInterval()
        }
        props.onTick(left)
        setTimeLeft(left)
        lastUpdate = now
      }, 1000 / RATE)
    }
  }, [props.on, props.onTick])

  useEffect(() => {
    return () => {
      endInterval()
    }
  }, [])

  return <div className="timer">
    {Math.ceil(timeLeft).toLocaleString("en-ca", {
      minimumFractionDigits: 0,
    })}
  </div>
}

export default Timer
