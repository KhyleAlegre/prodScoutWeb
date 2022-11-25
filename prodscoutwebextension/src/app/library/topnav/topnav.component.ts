import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-topnav',
  templateUrl: './topnav.component.html',
  styleUrls: ['./topnav.component.scss'],
})
export class TopnavComponent implements OnInit {
  constructor(private router: Router) {}

  displayModal: boolean = false;
  displayBasic: boolean = false;
  displayRegister: boolean = false;
  displayMobile: boolean = false;

  ngOnInit(): void {}

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

  openProduct() {
    this.router.navigateByUrl('/products');
  }

  openFam() {
    this.router.navigateByUrl('/families');
  }

  openSchools() {
    this.router.navigateByUrl('/schools');
  }

  openHome() {
    this.router.navigateByUrl('/home');
  }
}
