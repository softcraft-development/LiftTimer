import React, { useCallback, useEffect, useState } from "react"

const RATE = 2

export interface Props {
  id: unknown
  on: boolean
  initalTime: number
  onTick: (timeLeft: number) => void
}

type Interval = NodeJS.Timeout | null
type LastUpdate = number | null

export function Timer(props: Props): JSX.Element {
  const [timeLeft, setTimeLeft] = useState(props.initalTime)
  const [interval, setIntervalValue] = useState<Interval>(null)
  const [lastUpdate, setLastUpdate] = useState<LastUpdate>(null)

  const tick = useCallback(() => {
    const now = Date.now()
    if (lastUpdate) {
      const elapsed = now - lastUpdate
      setTimeLeft(timeLeft - elapsed)
    }
    setLastUpdate(now)
  }, [lastUpdate, timeLeft])

  const endInterval = useCallback(() => {
    if (interval) {
      clearInterval(interval)
      setIntervalValue(null)
    }
  }, [interval])

  useEffect(() => {
    setTimeLeft(props.initalTime)
    setLastUpdate(null)
    endInterval()
  }, [props.id, props.initalTime])

  useEffect(() => {
    if (!props.on && interval) {
      endInterval()
      return
    }

    if (props.on && !interval) {
      const newInterval = setInterval(tick, 1000 / RATE)
      setIntervalValue(newInterval)
      tick()
    }

    return endInterval()
  }, [props.on, interval])

  useEffect(() => {
    props.onTick(timeLeft)
    if (timeLeft <= 0) {
      endInterval()
    }
  }, [timeLeft, props.onTick])

  return <div className="timer">
    {Math.ceil(timeLeft).toLocaleString("en-ca", {
      minimumFractionDigits: 0,
    })}
  </div>
}

export default Timer
