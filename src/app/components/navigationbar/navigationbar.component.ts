import { Component, OnInit } from '@angular/core';
import { sharedService } from 'src/app/services/sharedservice.service';

@Component({
  selector: 'app-navigationbar',
  templateUrl: './navigationbar.component.html',
  styleUrls: ['./navigationbar.component.css']
})
export class NavigationbarComponent implements OnInit {

  constructor(private sharedService: sharedService) { }
  currentUser: any;
  roleType = "Admin";
  ngOnInit(): void {

    this.currentUser = JSON.parse(localStorage.getItem('currentuserData'));

    this.roleType = this.currentUser.role;
  }
  logout() {
    localStorage.clear();
  }
}
