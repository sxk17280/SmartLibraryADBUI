import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { sharedService } from 'src/app/services/sharedservice.service';
@Component({
  selector: 'app-addbook',
  templateUrl: './addbook.component.html',
  styleUrls: ['./addbook.component.css']
})
export class AddbookComponent implements OnInit {

  constructor(private sharedService: sharedService, private _snackBar: MatSnackBar) { }
  BookId = ''
  Title = ''
  Description = ''
  Image = ''
  ISBN = ''
  Category = ''
  PublishedYear = ''
  Author = ''
  isAvailable = ''
  ngOnInit(): void {
  }
  addBook() {
    var model = {
      BookId: this.BookId,
      Title: this.Title,
      Description: this.Description,
      Image: this.Image,
      ISBN: this.ISBN,
      Category: this.Category,
      PublishedYear: this.PublishedYear,
      Author: this.Author,
      isAvailable: this.isAvailable,

    }
    this.sharedService.addBook(model).subscribe(x => {
      this._snackBar.open("user added");
    })
  }
}
