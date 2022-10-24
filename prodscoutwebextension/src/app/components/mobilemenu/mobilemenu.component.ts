import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-mobilemenu',
  templateUrl: './mobilemenu.component.html',
  styleUrls: ['./mobilemenu.component.scss']
})
export class MobilemenuComponent implements OnInit {

  constructor() { }
  displayBasic: boolean = false;
  displayRegister: boolean = false;
  displayModal: boolean = false;
  
  ngOnInit(): void {

  }

  openLogin() {
    this.displayModal = true;
    this.displayBasic = true;
  }

  openRegister() {
    this.displayRegister = true;
  }

}
