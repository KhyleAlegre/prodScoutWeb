import { Component, OnInit } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';

@Component({
  selector: 'app-demoform',
  templateUrl: './demoform.component.html',
  styleUrls: ['./demoform.component.scss'],
})
export class DemoformComponent implements OnInit {
  name: any = '';
  email: any = '';
  date: any = '';
  demoDate!: Date;
  contactNo: any = '';
  displayContact: boolean = false;
  displaySubmit: boolean = false;

  constructor(public afs: AngularFirestore) {}

  ngOnInit(): void {}

  demoRequest() {
    // Send Email to Client
    this.afs.collection('mail').add({
      to: this.email,
      message: {
        subject: 'School or Corporate Sign Up - prodScout',
        html:
          'Hi ' +
          this.name +
          ' ,Thank you for your interest, one of our associate developer will contact you with regards on a corporate account setup and other business details - Team prodScout ',
      },
    });

    // Send Email to Devs
    this.afs.collection('mail').add({
      to: 'prodscouts2022@gmail.com',
      message: {
        subject: 'Demo Request',
        html:
          ' An individual requested for a demo, with the following details , Name: ' +
          this.name +
          ', Email: ' +
          this.email +
          ', Contact No: ' +
          this.contactNo +
          ', Demo Date: ' +
          this.demoDate +
          ', please respond',
      },
    });

    this.displaySubmit = true;
    this.name = '';
    this.email = '';
    this.contactNo = '';
  }
  enableContact() {
    this.displayContact = true;
  }
}
