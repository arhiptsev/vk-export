import { VkProfile } from "src/export/types/vk-profile";
import { ApiProperty } from "@nestjs/swagger";

export class UserProfile {
    @ApiProperty()
    username: string;
    @ApiProperty()
    email: string;
    vk_profile?: VkProfile;
}
