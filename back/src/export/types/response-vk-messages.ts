import { ApiProperty } from "@nestjs/swagger";

export  class responseVkMessage  {
    @ApiProperty()
    message: {
        first_name: string,
        last_name: string,
        text: string,
    };
    @ApiProperty()
    user: {
        first_name: string,
        last_name: string,
    };
    @ApiProperty()
    peer: number;
}

export type medialType = 'photo' | 'video';