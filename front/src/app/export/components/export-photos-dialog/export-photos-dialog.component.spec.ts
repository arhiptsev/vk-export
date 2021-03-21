import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ExportPhotosDialogComponent } from './export-photos-dialog.component';

describe('ExportPhotosDialogComponent', () => {
  let component: ExportPhotosDialogComponent;
  let fixture: ComponentFixture<ExportPhotosDialogComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ExportPhotosDialogComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ExportPhotosDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
