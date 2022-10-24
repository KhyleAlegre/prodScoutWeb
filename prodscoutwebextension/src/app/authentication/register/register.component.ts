import { Component, OnInit } from '@angular/core';
import {
  AngularFirestore,
  AngularFirestoreCollection,
} from '@angular/fire/compat/firestore';
import { userModel } from 'src/app/models/users.model';
import { HttpClient } from '@angular/common/http';

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
  contactNo: any = '+63';
  isMismatched: boolean = false;
  fnCode: any;
  lnCode: any;
  rgx: any;

  // Workers
  noEmptyField: any;
  mismatchPrompt: any;
  displaySuccess: boolean = false;
  displayLogin: boolean = false;

  // API
  postSMS: any = 'https://api.semaphore.co/api/v4/messages';
  postSMSApi: any = '9d422527edba4ca2df20f3e9caa3e954';

  ngOnInit(): void {}

  signUp() {
    // Password Validation Checking

    if (this.password != this.passwordCheck) {
      this.isMismatched = true;
      this.mismatchPrompt = "Password didn't match, try again";
    } else {
      this.isMismatched = false;
      this.mismatchPrompt = '';
      return;
    }

    //Creates Username
    this.fnCode = this.firstName.slice(2);
    this.lnCode = this.lastName.slice(2);
    this.rgx = Math.floor(Math.random() * 90000) + 10000;
    this.rgx = this.rgx.toString();

    //Field Completion
    this.addUser.firstName = this.firstName;
    this.addUser.lastName = this.lastName;
    this.addUser.email = this.email;
    this.addUser.password = this.password;
    this.addUser.role = 'Standard';
    this.addUser.username = this.fnCode + this.lnCode + this.rgx;
    this.addUser.profileImage =
      'https://firebasestorage.googleapis.com/v0/b/prodscout-90022.appspot.com/o/1177568.png?alt=media&token=bcb5b1fe-fa13-4b73-9558-2840256caed0';
    //Converts number;

    //Stores to Database

    this.afs.collection('users').add(this.addUser);

    //Sends SMS to the User via SMS API

    this.http.post(this.postSMS, { title: 'Header' }).subscribe;

    //Calls Prompt;

    this.displaySuccess = true;

    //Clear Fields;

    this.firstName = '';
    this.lastName = '';
    this.email = '';
    this.password = '';
    this.contactNo = '';
  }

  openLogin() {
    this.displayLogin = true;
  }
}