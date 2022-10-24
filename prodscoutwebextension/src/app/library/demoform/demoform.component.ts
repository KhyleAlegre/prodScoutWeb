import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-demoform',
  templateUrl: './demoform.component.html',
  styleUrls: ['./demoform.component.scss']
})
export class DemoformComponent implements OnInit {

  name: any = "";
  email: any = "";
  date: any ="";
  demoDate!: Date;
  contactNo: any = "";


  constructor() { }

  ngOnInit(): void {
  }

}
