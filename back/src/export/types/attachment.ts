import { Photo } from "./photo";
import { Video } from "./video";

export interface Attachment<T extends Photo | Video | Audio | Doc | Link | Market | Wall> {
    type: attachmentType;
    photo?: T;
    video?: T;
    audio?: T;
    doc?: T;
    link?: T;
    market?: T;
    wall?: T;
}

export type attachmentType = "photo" | "video" | "audio" | "doc" | "link" | "market" | "wall";

export interface Audio {

}

export interface Doc {

}

export interface Link {

}

export interface Market {

}

export interface Wall {

}