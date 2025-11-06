import { MessageType } from "../enums/message-type"

export interface ToastFormat {
    id: string
    type: MessageType
    message: string
    duration: number
}
