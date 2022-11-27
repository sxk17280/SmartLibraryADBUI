import { Component, OnInit, ViewChild } from '@angular/core';
import { MatMenuTrigger } from '@angular/material/menu';
import { sharedService } from 'src/app/services/sharedservice.service';

@Component({
  selector: 'app-authors',
  templateUrl: './authors.component.html',
  styleUrls: ['./authors.component.css']
})
export class AuthorsComponent implements OnInit {
  displayedColumns: string[] = ['authorId', 'name'];
  dataSourceAuthors =[] ;
  showTable=false;
  authorName = '';

  @ViewChild(MatMenuTrigger) trigger: MatMenuTrigger;
  constructor(private sharedService: sharedService) { }

  ngOnInit(): void {
    this.sharedService.getAuthors().subscribe(x=>{
      this.dataSourceAuthors=x;
      this.showTable=true;
    })
  }
  addAuthor() {
    this.trigger.closeMenu();
    this.sharedService.addAuthor(this.authorName).subscribe(x => {
      this.authorName = '';
      this.ngOnInit();
    })
  }
}
