import { Component, OnInit } from '@angular/core';
import { sharedService } from 'src/app/services/sharedservice.service';

@Component({
  selector: 'app-categories',
  templateUrl: './categories.component.html',
  styleUrls: ['./categories.component.css']
})
export class CategoriesComponent implements OnInit {

  displayedColumns: string[] = ['categoryId', 'categoryName'];
  dataSourceCategories =[] ;
  showTable=false;
  
  constructor(private sharedService: sharedService) { }

  ngOnInit(): void {
    this.sharedService.getBookCategory().subscribe(x=>{
      this.dataSourceCategories=x;
      this.showTable=true;
    })
  }
}
