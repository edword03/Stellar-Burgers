import { IWSMessageBody } from "../../types"

export const WS_OPEN: 'WS_OPEN' = 'WS_OPEN'
export const WS_CLOSE: 'WS_CLOSE' = 'WS_CLOSE'
export const WS_SUCCESS: 'WS_SUCCESS' = 'WS_SUCCESS'
export const WS_ERROR: 'WS_ERROR' = 'WS_ERROR'
export const WS_MESSAGE: 'WS_MESSAGE' = 'WS_MESSAGE'
export const WS_SEND_ORDER: 'WS_SEND_ORDER' = 'WS_SEND_ORDER'

interface WSOpen {
  type: typeof WS_OPEN,
  payload: string | URL
}

interface WSClose {
  type: typeof WS_CLOSE
  payload: string
}

interface WSSuccess {
  type: typeof WS_SUCCESS
  payload: boolean
}

interface WSError {
  type: typeof WS_ERROR
  payload: boolean
}

interface WSMessage {
  type: typeof WS_MESSAGE
  payload: IWSMessageBody
}

interface WSSend {
  type: typeof WS_SEND_ORDER
  payload: any
}

export type TWsActions = WSOpen | WSClose | WSError | WSMessage | WSSuccess | WSSend | {type: null, payload: null}