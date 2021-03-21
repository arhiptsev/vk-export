import { Module, HttpModule } from '@nestjs/common';
import { ExportController } from './export.controller';
import { VkRequestService } from './services/vk-request.service';
import { UserModule } from 'src/user/user.module';
import { ExportService } from './services/export.service';
import { ProfileService } from './services/profile.serivce';
import { AuthModule } from 'src/auth/auth.module';
import { AttachmentService } from './services/attahment.serivce';
import { ProfileController } from './profile.controller';

@Module({
    controllers: [
        ExportController,
        ProfileController
    ],
    imports: [
        HttpModule,
        UserModule,
        AuthModule
    ],
    providers: [
        VkRequestService,
        ExportService,
        AttachmentService,
        ProfileService
    ]

})
export class ExportModule { }
