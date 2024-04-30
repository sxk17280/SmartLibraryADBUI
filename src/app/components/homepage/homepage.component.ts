import { Component, OnInit } from '@angular/core';
import { sharedService } from 'src/app/services/sharedservice.service';

@Component({
  selector: 'app-homepage',
  templateUrl: './homepage.component.html',
  styleUrls: ['./homepage.component.css']
})
export class HomepageComponent implements OnInit {

  constructor(private sharedService: sharedService) { }
cardsData:any;
currentUser;
roleType = "Admin";
cardKeys=[];
showCards=false;
chartData: any[] = [];
colorScheme = { domain:  ['#7cb5ec', '#90ed7d', '#f7a35c', '#8085e9', '#f15c80', '#e4d354', '#2b908f', '#f45b5b', '#91e8e1'] };
  ngOnInit(): void {
    this.currentUser = JSON.parse(localStorage.getItem('currentuserData'));
    this.roleType = this.currentUser.role;
    if(this.roleType=="Admin"){
      this.sharedService.getDashBoardData().subscribe(x=>{
        this.cardsData = x;

        this.cardKeys=Object.keys(this.cardsData).filter(x=>x!='totalFine');

        this.chartData = this.cardKeys.map(key => ({ name: key, value: this.cardsData[key] }));
        this.showCards = true;
      })
    }
    
  }

}
