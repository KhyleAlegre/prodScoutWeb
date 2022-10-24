import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-uppersection',
  templateUrl: './uppersection.component.html',
  styleUrls: ['./uppersection.component.scss']
})
export class UppersectionComponent implements OnInit {

  constructor() { }

  displayDemo: boolean = false;

  ngOnInit(): void {
  }

  showDemo() {
    this.displayDemo = true;
  }

}
