import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { sharedService } from 'src/app/services/sharedservice.service';

@Component({
  selector: 'app-issuedbooks',
  templateUrl: './issuedbooks.component.html',
  styleUrls: ['./issuedbooks.component.css']
})
export class IssuedbooksComponent implements OnInit {

  displayedColumns: string[] = ['bookId', 'checkInDateTime', 'dueDate', 'userName', 'title', 'fine','status', 'actions'];
  dataSourceIssuedBooks = [];
  showTable = false;
  users = []
  currentUserData: any;
  unModifiedBooks = [];
  constructor(private sharedService: sharedService, private _snackBar: MatSnackBar) { }
  ngOnInit(): void {
    this.currentUserData = this.sharedService.currentUserData;
    this.getData();

  }
  getData() {
    this.dataSourceIssuedBooks = [];
    this.sharedService.getUsers().subscribe(x => {
      this.users = x;
      if (this.currentUserData.isAdmin) {
        this.sharedService.adminIssuedBooks().subscribe(x => {
          this.unModifiedBooks = x;
          this.modifyData(x);
        })
      }
      else {
        this.sharedService.userIssuedBooks(this.currentUserData.userId).subscribe(x => {
          this.unModifiedBooks = x;
          this.modifyData(x);
        })
      }
    })
  }
  modifyData(res) {
    res.forEach(element => {
      var user = this.users.find(x => x.userId == element.bookTransactions.userId);
      var model = {
        bookId: element.bookId,
        checkInDateTime: element.bookTransactions.checkInDateTime,
        dueDate: element.bookTransactions.dueDate,
        userName: !!user ? user.firstName + ' ' + user.lastName : '',
        title: element.title,
        actions: true,
        fine: element.bookTransactions.fine,
        isActive: element.bookTransactions.isActive,
        status: element.bookTransactions.status
      }
      console.log(model)
      this.dataSourceIssuedBooks.push(model);
    });
    this.showTable = true;
  }
  checkOut(eve) {
    var currentrecord = this.unModifiedBooks.find(x => x.bookId == eve.bookId);
    var model = {
      TransactionId: currentrecord.bookTransactions.transactionId,
      BookId: currentrecord.bookId,
      UserId: currentrecord.bookTransactions.userId,
      CheckInDateTime: currentrecord.bookTransactions.checkInDateTime,
      CheckOutDateTime: currentrecord.bookTransactions.checkOutDateTime,
      DueDate: currentrecord.bookTransactions.dueDate,
      Penalty: currentrecord.bookTransactions.fine,
      Status: currentrecord.status,
      RenewalCount: currentrecord.bookTransactions.renewalCount,
      IsActive: currentrecord.bookTransactions.isActive
    }
    this.sharedService.checkOut(model).subscribe(x => {
      this.getData();
      this.showTable = false;
      this._snackBar.open('Returned successfully', 'Dismiss', {
        duration: 2000,
      });
    },
      error => {
        this._snackBar.open('Some thing went wrong', 'Dismiss', {
          duration: 2000,
        });
      },
    )
  }
  renew(eve) {
    var currentrecord = this.unModifiedBooks.find(x => x.bookId == eve.bookId);
    var model = {
      TransactionId: currentrecord.bookTransactions.transactionId,
      BookId: currentrecord.bookId,
      UserId: currentrecord.bookTransactions.userId,
      CheckInDateTime: currentrecord.bookTransactions.checkInDateTime,
      CheckOutDateTime: currentrecord.bookTransactions.checkOutDateTime,
      DueDate: currentrecord.bookTransactions.dueDate,
      Penalty: currentrecord.bookTransactions.fine,
      Status: currentrecord.status,
      RenewalCount: currentrecord.bookTransactions.renewalCount,
      IsActive: currentrecord.bookTransactions.isActive
    }
    this.sharedService.renew(model).subscribe(x => {
      this.getData();
      this.showTable = false;
      this._snackBar.open('Renewed successfully', 'Dismiss', {
        duration: 2000,
      });
    },
      error => {
        this._snackBar.open('LIMIT_EXCEEDED', 'Dismiss', {
          duration: 2000,
        });
      },
    )
  }

}
