export interface Video {
    id: number;
    album_id: number;
    title: string;
    description: string;
    duration: number;
    files: VideoFiles;
    owner_id: number;
    first_frame: Array<VideoImage>;
    date: number;
    adding_date: number;
    views: number;
    comments: number;
    player: string;
    platform: string;
    can_edit: boolean;
    can_add: boolean;
    is_private: boolean;
    access_key: string;
    processing: boolean;
    live: boolean;
    upcoming: boolean;
    is_favorite: boolean;
    image: Array<VideoImage>;
    type: string;

}

export interface VideoFiles {
    mp4_240?: string;
    mp4_360?: string;
    mp4_480?: string;
    mp4_720?: string;
    hls?: string;
    external?: string;
}

export interface VideoImage {
    height: number;
    width: number;
    url: string;
    with_padding?: boolean;
}
