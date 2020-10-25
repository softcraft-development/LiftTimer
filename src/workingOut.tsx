import React from "react"

export interface Props {
  setSetup: React.Dispatch<boolean>
}

export function WorkingOut(props: Props): JSX.Element {
  return <div className="working-out working-out--active timer-mode">
    <h1 className="working-out__heading">Workout</h1>
    <div className="controls">
      <button className="working-out__off controls__control">Stop</button>
      <button className="working-out__setup controls__control" onClick={() => props.setSetup(true)}>Setup</button>
    </div>
  </div>
}

export default WorkingOut
