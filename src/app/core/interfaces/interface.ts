export interface TaskTable {
    id: number,
    date: Date,
    title: string,
    description: string,
    status: string
}
export interface ConfirmData {
    mainTitle: string,
    content: string,
    buttonLabel: string
}
export interface Toast {
    message: string,
    type: 'Success' | 'Error',
    duration?: number
}