import { Injectable } from '@nestjs/common';
import { Observable, defer } from 'rxjs';
import { map, delay, tap, pluck, takeWhile, toArray, repeat } from 'rxjs/operators';
import { medialType } from 'src/export/types/response-vk-messages';
import { Attachment } from 'src/export/types/attachment';
import { Photo } from 'src/export/types/photo';
import { VkRequestService } from './vk-request.service';

@Injectable()
export class AttachmentService {

    constructor(
        private vkRequest: VkRequestService,
    ) { }

    public getAttachmentUrls(peerId: number): Observable<any> {
        return this.getAllAttachments(peerId)
            .pipe(
                map(res => {
                    return res.map(i =>
                        this.getPhotoBestResolutionLink(i.photo));
                })
            );
    }

    private getAllAttachments(
        peerId: number,
        media_type: medialType = 'photo'): Observable<Attachment<Photo>[]> {

        const params = {
            count: 200,
            start_from: 0,
            peer_id: peerId,
            media_type: media_type
        }

        return defer(() => this.vkRequest.sendRequest('messages', 'getHistoryAttachments', params))
            .pipe(
                delay(300),
                pluck('data', 'response'),
                tap(res => params.start_from = res.next_from),
                map(res => res.items.map(i => i.attachment)),
                repeat(),
                takeWhile(value => value.length === 200, true),
                toArray(),
                map(res => res.reduce((acc, val) => acc.concat(val), []))
            );
    }

    private getPhotoBestResolutionLink(photo: Photo): string {
        let link = "";
        const sizePriority = ["w", "z", "y", "x", "m", "s"];
        for (let size of sizePriority) {
            if (photo.sizes.find(i => i.type == size) !== undefined) {
                link = photo.sizes.find(i => i.type == size).url;
                break;
            }
        }
        return link;
    }

}
