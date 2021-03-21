import { Controller, Get, UseGuards } from '@nestjs/common';
import { Observable } from 'rxjs';
import { VkGuard } from './guards/vk.guard';
import { responseVkMessage } from 'src/export/types/response-vk-messages';
import { JwtAuthGuard } from 'src/auth/guards/auth.guard'
import { ProfileService } from './services/profile.serivce';

@UseGuards(JwtAuthGuard, VkGuard)
@Controller('profile')
export class ProfileController {

    constructor(
        private profileService: ProfileService,
    ) { }

    @Get('info')
    public vkProfile(): Observable<responseVkMessage[]> {
        return this.profileService.getProfile();
    }

}
