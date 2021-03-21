import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { VkAuthDialogComponent } from './components/vk-auth-dialog/vk-auth-dialog.component';
import { ExportComponent } from './export.component';
import { ExportService } from './services/export.service';
import { MatInputModule } from '@angular/material/input';
import { MatDialogModule } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatButtonModule } from '@angular/material/button';
import { MatTableModule } from '@angular/material/table';
import { ExportPhotosDialogComponent } from './components/export-photos-dialog/export-photos-dialog.component';
import {MatProgressSpinnerModule} from '@angular/material/progress-spinner';
import {MatProgressBarModule} from '@angular/material/progress-bar';
import { MessagesComponent } from './components/messages/messages.component';



@NgModule({
  declarations: [
    VkAuthDialogComponent,
    ExportComponent,
    ExportPhotosDialogComponent,
    MessagesComponent,
  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    MatInputModule,
    MatDialogModule,
    MatFormFieldModule,
    MatButtonModule,
    MatTableModule,
    MatProgressSpinnerModule,
    MatProgressBarModule,
  ],
  providers: [
    ExportService
  ]
})
export class ExportModule { }
