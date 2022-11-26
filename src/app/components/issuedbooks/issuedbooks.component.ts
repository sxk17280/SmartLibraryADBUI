import { Component, OnInit } from '@angular/core';
import { sharedService } from 'src/app/services/sharedservice.service';

@Component({
  selector: 'app-issuedbooks',
  templateUrl: './issuedbooks.component.html',
  styleUrls: ['./issuedbooks.component.css']
})
export class IssuedbooksComponent implements OnInit {

  displayedColumns: string[] = ['bookId', 'checkInDateTime','dueDate','userName','title','actions'];
  dataSourceIssuedBooks =[] ;
  showTable=false;
  currentUserData:any;
  constructor(private sharedService: sharedService) { }
  ngOnInit(): void {
    this.currentUserData=this.sharedService.currentUserData;
    if(this.currentUserData.isAdmin){
      this.sharedService.adminIssuedBooks().subscribe(x=>{
        this.dataSourceIssuedBooks=x;
        this.showTable=true;
      })
    }
   else{
    this.sharedService.userIssuedBooks(this.currentUserData.userId).subscribe(x=>{
      this.dataSourceIssuedBooks=x;
      this.showTable=true;
    })
   }
  }
}
