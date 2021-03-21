import { Injectable, HttpService } from '@nestjs/common';
import { Observable, defer } from 'rxjs';
import { map, delay, tap, pluck, takeWhile, toArray, repeat } from 'rxjs/operators';
import { responseVkMessage } from 'src/export/types/response-vk-messages';
import { ApiResponse } from 'src/export/types/api-response';
import { ConfigService } from '@nestjs/config';
import { VkRequestService } from './vk-request.service';
import { AttachmentService } from './attahment.serivce';
import { ResponseMessages } from '../types/message';

@Injectable()
export class ExportService {

  constructor(
    private http: HttpService,
    private vkRequest: VkRequestService,
    private attachmentService: AttachmentService,
    private configService: ConfigService
  ) {
  }

  public vkLogin(username: string, password: string, code?: number): Observable<any> {
    
    const client_id = this.configService.get('VK_APP_CLIENT_ID');
    const client_secret = this.configService.get('VK_APP_CLIENT_SECRET');
    const requestUrl = this.configService.get('VK_AUTH_URL');

    const params = {
      client_id: client_id,
      client_secret: client_secret,
      username: username,
      password: password,
      v: 5.103,
      '2fa_supported': 1,
      grant_type: 'password'
    }

    if (code) {
      params['code'] = code;
    }

    return this.http.get(requestUrl, { params: params });
  }


  public getVkInfo(): Observable<responseVkMessage[]> {
    return this.getAllMessages();
  }

  private getAllMessages(): Observable<responseVkMessage[]> {

    return this.getMessagesData()
      .pipe(
        map(m => {
          const messages = [].concat(...m.map(i => i.response.items));
          const profiles = [].concat(...m.map(i => i.response.profiles));
          const response = messages.filter(m => m.conversation.peer.type === 'user')
            .map((m: any) => {
              const lmProfile = profiles.find(p => m.last_message.from_id === p.id);

              const userProfile = profiles.find(p => m.conversation.peer.id === p.id);
              return {
                message: {
                  first_name: lmProfile.first_name,
                  last_name: lmProfile.last_name,
                  text: m.last_message.text,
                },
                user: {
                  first_name: userProfile.first_name,
                  last_name: userProfile.last_name,
                },
                peer: m.conversation.peer.id,
              }

            });

          return response;
        }),
      );

  }

  private getMessagesData(): Observable<ApiResponse<any & ResponseMessages>[]> {
    
    const params = {
      count: 200,
      offset: 0,
      extended: 1
    };

    return defer(() => this.vkRequest.sendRequest<any & ResponseMessages>('messages', 'getConversations', params))
      .pipe(
        delay(300),
        pluck('data'),
        tap(() => params.offset += 200),
        repeat(),
        takeWhile(value => {
          return value.response.items.length === 200;
        }, true),
        toArray()
      )

  }

  public getAllPhotoUrls(peerId: number): Observable<any> {
    return this.attachmentService.getAttachmentUrls(peerId);
  }

}
