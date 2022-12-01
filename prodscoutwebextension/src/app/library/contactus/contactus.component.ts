import { Component, OnInit } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';

@Component({
  selector: 'app-contactus',
  templateUrl: './contactus.component.html',
  styleUrls: ['./contactus.component.scss'],
})
export class ContactusComponent implements OnInit {
  schoolName: any;
  name: any;
  email: any;
  demoDate: any;
  contactNo: any;
  displaySubmit: boolean = false;
  constructor(public afs: AngularFirestore) {}

  ngOnInit(): void {}

  sendSignUp() {
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
        subject: 'School or Corporate Sign Up Request',
        html:
          'An Institution or Corporate Account wishes to contact with you with the following details ' +
          'Business Name: ' +
          this.schoolName +
          ' , Name: ' +
          this.name +
          ', Email: ' +
          this.email +
          ', Contact No: ' +
          this.contactNo +
          ', please respond',
      },
    });

    this.displaySubmit = true;
    this.schoolName = '';
    this.name = '';
    this.contactNo = '';
    this.email = '';
  }
}
