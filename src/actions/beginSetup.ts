import { Action } from "redux"

export const type = "Begin Setup"

export interface BeginSetup extends Action<string> {
  readonly type: typeof type
}

export function beginSetup(): BeginSetup {
  return { type }
}

export default beginSetup
