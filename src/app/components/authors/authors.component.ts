import { Component, OnInit } from '@angular/core';
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
  
  constructor(private sharedService: sharedService) { }

  ngOnInit(): void {
    this.sharedService.getAuthors().subscribe(x=>{
      this.dataSourceAuthors=x;
      this.showTable=true;
    })
  }

}
