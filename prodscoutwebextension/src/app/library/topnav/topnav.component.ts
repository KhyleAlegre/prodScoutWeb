import { Component, OnInit } from '@angular/core';



@Component({
  selector: 'app-topnav',
  templateUrl: './topnav.component.html',
  styleUrls: ['./topnav.component.scss']
})
export class TopnavComponent implements OnInit {
 

  constructor() { }

  displayModal: boolean = false;
  displayBasic: boolean = false;
  displayRegister: boolean = false;
  displayMobile: boolean = false;

  ngOnInit(): void {
   
  }

  showLogIn() {
    this.displayModal = true;
    this.displayBasic = true;
   
  }

  showRegister() {
    this.displayRegister = true;
  }

  showMobileMenu() {
    this.displayMobile = true;
  }

}
