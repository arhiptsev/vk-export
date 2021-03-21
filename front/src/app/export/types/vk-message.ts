export interface VkMessage {
    message: {
        first_name: string,
        last_name: string,
        text: string,
    },
    user: {
        first_name: string,
        last_name: string,
    },
    peer: number,
}