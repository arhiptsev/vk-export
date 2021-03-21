import { Component, OnInit, Inject } from '@angular/core';
import { ExportService } from '../../services/export.service';
import JSZip from 'jszip';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { switchMap, concatMap, tap, } from 'rxjs/operators';
import { from, forkJoin, Observable, throwError } from 'rxjs';
import { UntilDestroy, untilDestroyed } from '@ngneat/until-destroy';

type exportStatus = 'request' | 'download' | 'arhive' | 'success';

@UntilDestroy()
@Component({
  selector: 'app-export-photos-dialog',
  templateUrl: './export-photos-dialog.component.html',
  styleUrls: ['./export-photos-dialog.component.scss']
})
export class ExportPhotosDialogComponent implements OnInit {

  public status: exportStatus;
  public error: string;
  public progress = 0;
  public archiveUrl;
  public zip = new JSZip();


  constructor(
    private exportService: ExportService,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) { }

  ngOnInit(): void {
    this.status = 'request';

    forkJoin([
      this.exportService.getDialogPhotosUrl(this.data.peerId)
        .pipe(
          switchMap(res => res.length
            ? this.downloadPhotos(res)
            : throwError('В выбранном диалоге не найдено вложения типа "Фото"')),
        )
    ])
      .pipe(
        switchMap(() => {
          this.status = 'arhive';
          return from(this.zip.generateAsync(
            { type: 'blob' },
            metadata => Math.floor(this.progress = metadata.percent)
          ));
        }),
        untilDestroyed(this)
      )
      .subscribe(
        (res: ArrayBuffer) => this.createAndOpenArchiveUrl(res),
        (res: any) => this.error = res,
      );
  }

  public downloadArchive() {
    window.open(this.archiveUrl);
  }

  private createAndOpenArchiveUrl(archive: ArrayBuffer) {
    this.archiveUrl = window.URL.createObjectURL(archive);
    this.status = 'success';
    this.downloadArchive();
  }

  private downloadPhotos(urlList: string[]): Observable<any> {
    const countPhotos = urlList.length;
    let countDownloaded = 0;
    this.status = 'download';

    return from(urlList)
      .pipe(
        concatMap(item => this.exportService.getPhotoFromVk(item)),
        tap(res => {
          this.progress = Math.floor(++countDownloaded / (countPhotos / 100));
          this.zip.file(res.url.split('/').pop(), res.body, { base64: true });
        })
      );
  }

}
