import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';

@Component({
  selector: 'app-content-viewer-dialog',
  templateUrl: './content-viewer-dialog.component.html',
  styleUrls: ['./content-viewer-dialog.component.css'],
})
export class ContentViewerDialogComponent implements OnInit {
  fileType: string;
  base64Data: SafeResourceUrl;
  pdfSrc: SafeResourceUrl;
  bookTitle: string;
  fileUrl: SafeResourceUrl;

  ngOnInit(): void {}

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: any,
    private sanitizer: DomSanitizer
  ) {
    const decodedData = atob(data.data);
    switch (data.type) {
      case 'video/mp4':
        this.base64Data = 'data:video/mp4;base64,' + data.data;
        break;
      case 'audio/mpeg':
        this.base64Data = 'data:audio/mp3;base64,' + data.data;
        break;
      case 'application/pdf':
        this.base64Data = this.sanitizer.bypassSecurityTrustResourceUrl('data:application/pdf;base64,' +data.data);
        break;
      default:
        console.error('Unsupported file type');
    }
    this.fileType = data.type;
  }

 
}
