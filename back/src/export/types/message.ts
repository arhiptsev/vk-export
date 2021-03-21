import { Doc } from "prettier";
import { Attachment, Audio, Link, Market, Wall } from "./attachment";
import { Photo } from "./photo";
import { Video } from "./video";

export interface ResponseMessages {
    items: Array<Message>;
    count: number;
}


export interface Message {
    id: number;
    text: string;
    user_id: number;
    from_id: number;
    peer_id: number;
    date: number;
    read_state: boolean;
    out: boolean;
    fwd_messages: Array<Message>;
    reply_message: Message;
    important: boolean;
    random_id: number;
    attachments: Array<Attachment<Photo | Video | Audio | Doc | Link | Market | Wall>>;
    is_hidden: boolean;
    conversation_message_id: number;
}