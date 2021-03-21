import { Injectable } from '@nestjs/common';
import { Observable } from 'rxjs';
import { pluck } from 'rxjs/operators';
import { VkRequestService } from './vk-request.service';
import { VkProfile } from '../types/vk-profile';

@Injectable()
export class ProfileService {

  constructor(
    private vkRequest: VkRequestService,
  ) { }

  public getProfile(): Observable<any> {
    return this.vkRequest.sendRequest<VkProfile>('account', 'getProfileInfo').pipe(
      pluck('data', 'response')
    );
  }

}
