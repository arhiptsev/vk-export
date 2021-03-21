import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { VkMessage } from '../types/vk-message';

@Injectable()
export class ExportService {

  constructor(
    private http: HttpClient
  ) { }

  public getMessages(): Observable<VkMessage[]> {
    return this.http.get<VkMessage[]>('api/export/messages');
  }

  public getDialogPhotosUrl(peerId: number): Observable<string[]> {
    return this.http.get<string[]>(`api/export/dialog/${peerId}/photos`);
  }

  public getPhotoFromVk(url: string): Observable<HttpResponse<ArrayBuffer>> {
    return this.http.get(url, { responseType: 'arraybuffer', observe: 'response'});
  }

}
