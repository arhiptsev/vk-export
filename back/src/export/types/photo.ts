import { PhotoSizes } from "./photo-sizes";

export interface Photo {
    id: number;
    album_id: number;
    owner_id: number;
    user_id: number;
    text: string;
    date: number;
    sizes: Array<PhotoSizes>;
    width: number;
    height: number;
    access_key: string;
}
