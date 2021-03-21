import { Component, OnInit } from '@angular/core';
import { ExportService } from './services/export.service';
import { MatDialog } from '@angular/material/dialog';
import { VkAuthDialogComponent } from './components/vk-auth-dialog/vk-auth-dialog.component';
import { switchMap, catchError } from 'rxjs/operators';
import { Router } from '@angular/router';
import { NotificationService } from '../common/notification.service';
import { of } from 'rxjs';
import { UntilDestroy, untilDestroyed } from '@ngneat/until-destroy';
import { VkMessage } from './types/vk-message';

@UntilDestroy()
@Component({
  selector: 'app-export',
  templateUrl: './export.component.html',
  styleUrls: ['./export.component.scss']
})
export class ExportComponent implements OnInit {

  constructor(
    private exportService: ExportService,
    private dialog: MatDialog,
    private router: Router,
    private notify: NotificationService,
  ) { }

  public messages: VkMessage[] = [];
  public loading = false;

  public ngOnInit(): void {
    this.init();
  }

  private init(): void {
    this.exportService.getMessages().pipe(
      catchError(
        (err, caught) => this.dialog.open(VkAuthDialogComponent)
          .afterClosed()
          .pipe(
            switchMap((res) => {
              if (!res) {
                this.notify.success('Доступ к разделу экспорт невозможен без учетной записи Вконтакте!!!');
                this.router.navigate(['/']);
                return of([]);
              }
              return caught;
            })
          )
      ),
      untilDestroyed(this)
    ).subscribe(res => {
      this.loading = false;
      this.messages = res
    });
    this.loading = true;
  }
}
