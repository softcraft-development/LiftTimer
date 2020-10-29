import React, { useCallback, useEffect, useMemo, useState } from "react"
import Timer from "./timer"

export interface Props {
  done: () => void
  id: unknown
  initialStyle: Style,
  time: number
}

enum Status {
  Done = "Done",
  Paused = "Paused",
  Ready = "Ready",
  Running = "Running",
}

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

export enum Style {
  Active = "timer-controls--active",
  Inactive = "timer-controls--inactive",
  Transition = "timer-controls--transition",
}

export function TimerControls(props: Props): JSX.Element {

  const [status, setStatus] = useState(Status.Ready)
  const [attempt, setAttempt] = useState(1)
  const [style, setStyle] = useState(props.initialStyle)

  useEffect(() => {
    setStatus(Status.Ready)
  }, [props.id, props.time])

  useEffect(() => {
    setStyle(props.initialStyle)
  }, [props.initialStyle])

  const go = useCallback(() => {
    onGo(status, setStatus)
  }, [status])

  const reset = useCallback(() => {
    setStatus(Status.Ready)
    setStyle(props.initialStyle)
    setAttempt(attempt + 1)
  }, [props.initialStyle, attempt])

  const goText = useMemo(() => {
    switch (status) {
      case Status.Running:
        return "⏸️"
      default:
        return "▶️"
    }
  }, [status])

  const id = useMemo(() => {
    return `${props.id}:${attempt}`
  }, [props.id, attempt])

  const onTick = useCallback((timeLeft: number) => {
    if (timeLeft <= 0) {
      props.done()
      return
    }
    if (timeLeft <= 4) {
      setStyle(Style.Transition)
      return
    }
  }, [props.done])

  const on = useMemo(() => {
    return status == Status.Running
  }, [status])

  return <div className={`timer-controls ${style}`}>
    <Timer
      id={id}
      initalTime={props.time}
      on={on}
      onTick={onTick}
    />
    <div className="timer-controls__controls">
      <button className="timer__go" onClick={go}>
        {goText}
      </button>
      <button className="timer__reset" onClick={reset}>
        ⏮️
      </button>
    </div>
  </div>
}

export default TimerControls
