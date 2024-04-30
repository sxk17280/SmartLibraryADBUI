import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ContentViewerDialogComponent } from './content-viewer-dialog.component';

describe('ContentViewerDialogComponent', () => {
  let component: ContentViewerDialogComponent;
  let fixture: ComponentFixture<ContentViewerDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ContentViewerDialogComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ContentViewerDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
