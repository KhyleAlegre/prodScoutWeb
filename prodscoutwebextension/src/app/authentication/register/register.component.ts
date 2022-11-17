import { Component, OnInit } from '@angular/core';
import {
  AngularFirestore,
  AngularFirestoreCollection,
} from '@angular/fire/compat/firestore';
import { userModel } from 'src/app/models/users.model';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { smsModel } from 'src/app/models/sms.model';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss'],
})
export class RegisterComponent implements OnInit {
  addUser: userModel = {
    firstName: '',
    lastName: '',
    email: '',
    contactNo: '',
    username: '',
    password: '',
    role: '',
    profileImage: '',
  };

  constructor(public afs: AngularFirestore, private http: HttpClient) {}

  // Form
  firstName: any;
  lastName: any;
  email: any;
  password: any;
  passwordCheck: any;
  contactNo!: any;
  isMismatched: boolean = false;
  fnCode: any;
  lnCode: any;
  rgx: any;
  chx: any;

  // Workers
  noEmptyField: any;
  mismatchPrompt: any;
  displaySuccess: boolean = false;
  displayLogin: boolean = false;
  isAphx: boolean = false;
  aphxPrompt: any;
  isMinChar: boolean = false;
  minCharPrompt: any;

  // API
  postSMS: any = 'https://api.semaphore.co/api/v4/messages';
  postSMSApi: any = '63da0d82e426e76ee3bccf27622cbe83';

  smsApi: smsModel = {
    apikey: this.postSMSApi,
    number: this.contactNo,
    message:
      'You have successfully registered this mobile number to prodScout, SMS updates for your profile are sent here.',
  };

  ngOnInit(): void {}

  matchPW(value: any) {
    for (let i = 0; i < this.password.length; i++) {
      this.chx = value.charCodeAt(i);
      if (
        !(this.chx > 47 && this.chx < 58) && // numeric (0-9)
        !(this.chx > 64 && this.chx < 91) && // upper alpha (A-Z)
        !(this.chx > 96 && this.chx < 123)
      ) {
        // lower alpha (a-z)
        this.isAphx = false;
        this.aphxPrompt = '';
        console.log('char apx');
        return;
      }
    }
    this.isAphx = true;
    this.aphxPrompt =
      'Must Contain at least one special character [/, *, <, @]';
    return;
  }

  signUp() {
    // Password Validation Checking
    if (this.password.length < 6 || this.passwordCheck.length < 6) {
      this.isMinChar = true;
      this.minCharPrompt = 'Must be 6 characters long';
      return;
    } else {
      this.isMinChar = false;
      this.minCharPrompt = '';
    }

    if (this.password == this.passwordCheck) {
      this.isMismatched = false;
      this.mismatchPrompt = '';
    } else {
      this.isMismatched = true;
      this.mismatchPrompt = "Password didn't match, try again";
      return;
    }

    this.matchPW(this.password);

    //Creates Username
    this.fnCode = this.firstName.slice(2);
    this.lnCode = this.lastName.slice(2);
    this.rgx = Math.floor(Math.random() * 90000) + 10000;
    this.rgx = this.rgx.toString();

    //Converts number;
    this.contactNo = this.contactNo.slice(1);
    this.contactNo = '+63' + this.contactNo;

    //Field Completion
    this.addUser.firstName = this.firstName;
    this.addUser.lastName = this.lastName;
    this.addUser.email = this.email;
    this.addUser.password = this.password;
    this.addUser.role = 'Standard';
    this.addUser.username = this.fnCode + this.lnCode + this.rgx;
    this.addUser.contactNo = this.contactNo;
    this.addUser.profileImage =
      'https://firebasestorage.googleapis.com/v0/b/prodscout-90022.appspot.com/o/1177568.png?alt=media&token=bcb5b1fe-fa13-4b73-9558-2840256caed0';

    //Stores to Database
    this.afs.collection('users').add(this.addUser);

    // Sends SMS

    // Send Email
    this.afs.collection('mail').add({
      to: this.email,
      message: {
        subject: 'Welcome to prodScout',
        html:
          'Hi ' +
          this.firstName +
          ' ,Thank you for registering to our App, your username for this account is: ' +
          this.addUser.username +
          ' , please remember this as this will be used as part of your logging credentials in all of our scouting apps, thank you! - prodScout Team',
      },
    });

    this.displaySuccess = true;

    //Clear Fields;

    this.firstName = '';
    this.lastName = '';
    this.email = '';
    this.password = '';
    this.contactNo = '';
    this.passwordCheck = '';
  }

  openLogin() {
    this.displayLogin = true;
  }
}
