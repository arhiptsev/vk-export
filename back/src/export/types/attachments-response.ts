import { Attachment } from "./attachment";

export interface AttachmentsResponse<T> {
    items: Array<MessageAttachement<T>>;
    next_from: string;
    profiles: Array<any>;
}

export interface MessageAttachement<T> {
    message_id: number;
    from_id: number;
    attachment: Attachment<T>
}