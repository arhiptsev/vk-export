import { ChangeDetectionStrategy, Component, Input, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { UntilDestroy, untilDestroyed } from '@ngneat/until-destroy';
import { VkMessage } from '../../types/vk-message';
import { ExportPhotosDialogComponent } from '../export-photos-dialog/export-photos-dialog.component';

@UntilDestroy()
@Component({
  selector: 'app-messages',
  templateUrl: './messages.component.html',
  styleUrls: ['./messages.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class MessagesComponent implements OnInit {

  constructor(
    private dialog: MatDialog,
  ) { }

  @Input() public messages: VkMessage[] = [];
  public displayedColumns: string[] = ['name', 'actions'];
  public blockActions = false;

  ngOnInit(): void {

  }

  public exportPhotos(peerId: number) {
    this.blockActions = true;
    this.dialog.open(ExportPhotosDialogComponent, {width: '400px', data: { peerId: peerId } })
      .afterClosed()
      .pipe(untilDestroyed(this))
      .subscribe(() => {this.blockActions = false});
  }

}
