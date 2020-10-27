import React, { useCallback, useEffect, useMemo, useState } from "react"

const RATE = 2

export interface Props {
  done: () => void
  on: boolean
  id: unknown
  time: number
}

enum Status {
  Done = "Done",
  Paused = "Paused",
  Ready = "Ready",
  Running = "Running",
}

type Interval = NodeJS.Timeout | null
type LastUpdate = number | null

function onGo(status: Status, setStatus: React.Dispatch<Status>) {
  switch (status) {
    case Status.Ready: {
      setStatus(Status.Running)
      break
    }
    case Status.Running: {
      setStatus(Status.Paused)
      // TODO: updateTimeLeft()
      break
    }
    case Status.Paused: {
      setStatus(Status.Running)
      // TODO: Begin timer
      break
    }
    case Status.Done: {
      setStatus(Status.Running)
      // TODO: reset
    }
  }
}


function onReset(
  status: Status,
  time: number,
  setStatus: React.Dispatch<Status>,
  setTimeLeft: React.Dispatch<number>
) {
  switch (status) {
    case Status.Paused: {
      setStatus(Status.Ready)
      setTimeLeft(time)
      break
    }
  }
}


export function Timer(props: Props): JSX.Element {

  const [status, setStatus] = useState(Status.Ready)
  const [timeLeft, setTimeLeft] = useState(props.time)
  const [interval, setIntervalValue] = useState<Interval>(null)
  const [lastUpdate, setLastUpdate] = useState<LastUpdate>(null)

  useEffect(() => {
    setStatus(Status.Ready)
    setTimeLeft(props.time)
  }, [props.id, props.time])

  const tick = useCallback(() => {
    if (lastUpdate) {
      const now = Date.now()
      const elapsed = now - lastUpdate
      setLastUpdate(now)
      setTimeLeft(timeLeft - elapsed)
    }
  }, [lastUpdate, timeLeft])

  const endInterval = useCallback(() => {
    if (interval) {
      clearInterval(interval)
      setIntervalValue(null)
    }
  }, [interval])

  useEffect(() => {
    if (status === Status.Running && !interval) {
      const newInterval = setInterval(tick, 1000 / RATE)

      setIntervalValue(newInterval)
      setLastUpdate(Date.now())
      return endInterval
    }
    if (interval) {
      tick()
    }
    endInterval()
  }, [status, interval])

  const go = useCallback(() => {
    onGo(status, setStatus)
  }, [status])

  const reset = useCallback(() => {
    onReset(status, props.time, setStatus, setTimeLeft)
  }, [status, props.time])

  const goText = useMemo(() => {
    switch (status) {
      case Status.Running:
        return "⏸️"
      default:
        return "▶️"
    }
  }, [status])

  return <div className="timer">
    <div className="timer__time-left">
      {Math.ceil(timeLeft).toLocaleString("en-ca", {
        minimumFractionDigits: 0,
      })}
    </div>
    <div className="timer__controls">
      <button className="timer__go" onClick={go}>
        {goText}
      </button>
      <button className="timer__reset" onClick={reset}>
        ⏮️
      </button>
    </div>
  </div>
}

export default Timer
