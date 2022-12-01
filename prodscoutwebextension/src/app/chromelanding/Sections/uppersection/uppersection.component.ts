import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
@Component({
  selector: 'app-uppersection',
  templateUrl: './uppersection.component.html',
  styleUrls: ['./uppersection.component.scss'],
})
export class UppersectionComponent implements OnInit {
  constructor(private router: Router) {}

  displayDemo: boolean = false;

  ngOnInit(): void {}

  showDemo() {
    this.displayDemo = true;
  }

  reRoute() {
    location.reload();
    this.router.navigateByUrl('/home');
  }

  getDownload() {}

  goToPlaystore() {}
}
