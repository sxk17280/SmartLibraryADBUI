import { Component, OnInit, ViewChild } from '@angular/core';
import { MatMenuTrigger } from '@angular/material/menu';
import { sharedService } from 'src/app/services/sharedservice.service';

@Component({
  selector: 'app-categories',
  templateUrl: './categories.component.html',
  styleUrls: ['./categories.component.css']
})
export class CategoriesComponent implements OnInit {

  displayedColumns: string[] = ['categoryId', 'categoryName'];
  dataSourceCategories = [];
  showTable = false;
  categoryName = '';
  constructor(private sharedService: sharedService) { }
  @ViewChild(MatMenuTrigger) trigger: MatMenuTrigger;
  ngOnInit(): void {
    this.sharedService.getBookCategory().subscribe(x => {
      this.dataSourceCategories = x;
      this.showTable = true;
    })
  }
  addCategory() {
    this.trigger.closeMenu();
    this.sharedService.addcategory(this.categoryName).subscribe(x => {
      this.categoryName = '';
      this.ngOnInit();
    })
  }
}
