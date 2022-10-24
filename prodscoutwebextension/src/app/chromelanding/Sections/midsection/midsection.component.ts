import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-midsection',
  templateUrl: './midsection.component.html',
  styleUrls: ['./midsection.component.scss']
})
export class MidsectionComponent implements OnInit {

  constructor() { }

  displayDemo: boolean = false;

  ngOnInit(): void {
  }

  demoRequest() {
    this.displayDemo = true;
  }


}
