import { notification } from "antd"

type NotificationType = 'success' | 'info' | 'warning' | 'error';

export const notify = (type: NotificationType, title: string, message: string) => {
    notification[type]({
        message: `${title}`,
        description: `${message}`
    })
}