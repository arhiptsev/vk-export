import { Injectable, CanActivate, ExecutionContext, HttpException, HttpStatus } from '@nestjs/common';
import { Observable } from 'rxjs';
import { VkRequestService } from '../services/vk-request.service';
import { UserService } from 'src/user/user.service';
import { response } from 'express';

@Injectable()
export class VkGuard implements CanActivate {

  constructor(
    private vkRequest: VkRequestService,
  ) { }

  public async canActivate(
    context: ExecutionContext,
  ): Promise<boolean> {
    const request = context.switchToHttp().getRequest();

    const res = await this.vkRequest.initAccessToken(request.user.userId);
    if (!res) {
      throw new HttpException(
        { message: 'invalid_vk_token' },
        HttpStatus.BAD_REQUEST
      );
    }
    return true;
  }
}
