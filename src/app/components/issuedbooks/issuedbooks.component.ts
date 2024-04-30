import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { DomSanitizer } from '@angular/platform-browser';
import { sharedService } from 'src/app/services/sharedservice.service';
import { ContentViewerDialogComponent } from '../content-viewer-dialog/content-viewer-dialog.component';

@Component({
  selector: 'app-issuedbooks',
  templateUrl: './issuedbooks.component.html',
  styleUrls: ['./issuedbooks.component.css'],
})
export class IssuedbooksComponent implements OnInit {
  displayedColumns: string[] = [
    'bookId',
    'checkInDateTime',
    'dueDate',
    'userName',
    'title',
    'fileType',
    'status',
    'actions',
  ];
  dataSourceIssuedBooks = [];
  showTable = false;
  users = [];
  currentUserData: any;
  unModifiedBooks = [];
  fileType: string = '';
  base64Data: string = '';
  pdfSrc: any;
  constructor(
    private dialog: MatDialog,
    private sharedService: sharedService,
    private _snackBar: MatSnackBar,
    private sanitizer: DomSanitizer
  ) {}
  ngOnInit(): void {
    this.currentUserData = this.sharedService.currentUserData;
    this.getData();
  }
  getData() {
    this.dataSourceIssuedBooks = [];
    this.sharedService.getUsers().subscribe((x) => {
      this.users = x;
      if (
        this.currentUserData.role == 'Admin' ||
        this.currentUserData.role == 'Librarian'
      ) {
        this.sharedService.adminIssuedBooks().subscribe((x) => {
          this.unModifiedBooks = x;
          this.modifyData(x);
        });
      } else {
        this.sharedService
          .userIssuedBooks(this.currentUserData.userId)
          .subscribe((x) => {
            this.unModifiedBooks = x;
            this.modifyData(x);
          });
      }
    });
  }
  modifyData(res) {
    res.forEach((element) => {
      var user = this.users.find(
        (x) => x.userId == element.bookTransactions.userId
      );
      var model = {
        bookId: element.bookId,
        checkInDateTime: element.bookTransactions.checkInDateTime,
        dueDate: element.bookTransactions.dueDate,
        userName: !!user ? user.firstName + ' ' + user.lastName : '',
        title: element.title,
        actions: true,
        transactionId:element.bookTransactions.transactionId,
       fileType:element.fileType,
        isActive: element.bookTransactions.isActive,
        status: element.bookTransactions.status,
      };
      console.log(model);
      this.dataSourceIssuedBooks.push(model);
    });
    this.showTable = true;
  }
  checkOut(eve) {
    var currentrecord = this.unModifiedBooks.find(
      (x) => x.bookId == eve.bookId
    );
    var model = {
      TransactionId: eve.transactionId,
      BookId: currentrecord.bookId,
      UserId: currentrecord.bookTransactions.userId,
      CheckInDateTime: currentrecord.bookTransactions.checkInDateTime,
      CheckOutDateTime: currentrecord.bookTransactions.checkOutDateTime,
      DueDate: currentrecord.bookTransactions.dueDate,
      Status: currentrecord.status,
      RenewalCount: currentrecord.bookTransactions.renewalCount,
      IsActive: currentrecord.bookTransactions.isActive,
    };
    this.sharedService.checkOut(model).subscribe(
      (x) => {
        this.getData();
        this.showTable = false;
        this._snackBar.open('Returned successfully', 'Dismiss', {
          duration: 2000,
        });
      },
      (error) => {
        this._snackBar.open('Some thing went wrong', 'Dismiss', {
          duration: 2000,
        });
      }
    );
  }
  viewContent(eve) {
    // var book = this.unModifiedBooks.find((x) => x.bookId == eve.bookId);
    // if (!!book) {
    //   const fileProperties = {
    //     type: book.fileType,
    //     data: book.fileData,
    //   };
    //   this.showContent(fileProperties);
    // }

    // console.log(eve);
    const book = this.unModifiedBooks.find((x) => x.bookId === eve.bookId);
    if (book) {
      console.log(book)
      const dialogRef = this.dialog.open(ContentViewerDialogComponent, {
        width: '80%',
        data: {
          type: book.fileType,
          data: book.fileData,
          bookTitle:book.title
        },
      });
    }
  }
  renew(eve) {
    var currentrecord = this.unModifiedBooks.find(
      (x) => x.bookId == eve.bookId
    );
    var model = {
      TransactionId: eve.transactionId,
      BookId: currentrecord.bookId,
      UserId: currentrecord.bookTransactions.userId,
      CheckInDateTime: currentrecord.bookTransactions.checkInDateTime,
      CheckOutDateTime: currentrecord.bookTransactions.checkOutDateTime,
      DueDate: currentrecord.bookTransactions.dueDate,
      Status: currentrecord.status,
      RenewalCount: currentrecord.bookTransactions.renewalCount,
      IsActive: currentrecord.bookTransactions.isActive,
    };
    this.sharedService.renew(model).subscribe(
      (x) => {
        this.getData();
        this.showTable = false;
        this._snackBar.open('Renewed successfully', 'Dismiss', {
          duration: 2000,
        });
      },
      (error) => {
        this._snackBar.open('LIMIT_EXCEEDED', 'Dismiss', {
          duration: 2000,
        });
      }
    );
  }
  openContentInNewWindow() {
    switch (this.fileType) {
      case 'application/pdf':
        window.open(this.pdfSrc, '_blank');
        break;
      case 'audio/mpeg':
      case 'video/mp4':
        window.open(this.base64Data, '_blank');
        break;
      default:
        console.log('Unsupported file type');
    }
  }

  showContent(fileProperties) {
    this.fileType = fileProperties.type;
    this.base64Data = fileProperties.data;
    // this.base64Data = 'data:' + this.getMimeType(fileProperties.type) + ';base64,' + fileProperties.data;

    // If the file type is PDF, set the source for iframe
    if (this.fileType === 'application/pdf') {
      this.pdfSrc = this.base64Data;
      // this.pdfSrc = this.sanitizer.bypassSecurityTrustResourceUrl(this.base64Data);
    }
    this.openContentInNewWindow();
  }

  // Function to get MIME type based on file type
  getMimeType(fileType: string): string {
    switch (fileType) {
      case 'application/pdf':
        return 'application/pdf';
      case 'audio/mpeg':
        return 'audio/mp3';
      case 'video/mp4':
        return 'video/mp4';
      default:
        return '';
    }
  }
}
