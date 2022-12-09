import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { BookVm } from 'src/app/models/bookvm';
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
  Image = 'https://img.freepik.com/premium-vector/book-cartoon_22350-95.jpg?w=2000'
  ISBN = ''
  Category = ''
  PublishedYear:any
  Author = ''
  isAvailable = true
  categories=[];
  authors=[];
  ngOnInit(): void {
    this.sharedService.getBookCategory().subscribe(x => {
      this.categories= x.map(x=>x.categoryName);
    })
    this.sharedService.getAuthors().subscribe(x=>{
      this.authors=x.map(x=>x.name);
    })
  }
  addBook() {
    var model:BookVm = {
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
      this._snackBar.open("Book added");
      setTimeout(x=>{
        window.location.reload()
      },1500)
    },error => {
      this._snackBar.open('Some thing went wrong', 'Dismiss', {
        duration: 1500,
      });
    })
   
  }
}
