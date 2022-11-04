import { Component, OnInit } from '@angular/core';
import {
  AngularFirestore,
  AngularFirestoreCollection,
} from '@angular/fire/compat/firestore';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { userModel } from 'src/app/models/users.model';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit {
  constructor(public afs: AngularFirestore, private router: Router) {}

  private userCollection!: AngularFirestoreCollection<userModel>;
  users!: Observable<userModel[]>;

  email: any;
  password: any;
  displayRegister: boolean = false;
  displayForgot: boolean = false;
  noEmail: boolean = false;
  noPassword: boolean = false;
  invalidLogin: boolean = false;
  emailPrompt: any;
  pwPrompt: any;

  userList!: userModel[];
  userCredentials!: userModel[];

  ngOnInit(): void {
    // Clears Credentials
    localStorage.removeItem('userData');
    localStorage.clear();

    // Retrieve User list
    this.userCollection = this.afs.collection('users');
    this.users = this.userCollection.valueChanges();
    this.users.subscribe((data) => (this.userList = data));
  }

  showRegister() {
    this.displayRegister = true;
  }

  showForgotPW() {
    this.displayForgot = true;
  }
  logIn() {
    if (!this.email) {
      this.noEmail = true;
      this.emailPrompt = '*Email is required to Log In';
    } else {
      this.noEmail = false;
      this.emailPrompt = '';
    }

    if (!this.password) {
      this.noPassword = true;
      this.pwPrompt = '*Please put your password';
    } else {
      this.noPassword = false;
      this.pwPrompt = '';
    }

    for (let i = 0; i < this.userList.length; i++) {
      if (
        this.email == this.userList[i].email &&
        this.password == this.userList[i].password
      ) {
        this.userCollection = this.afs.collection('users', (ref) =>
          ref
            .where('email', '==', this.email)
            .where('password', '==', this.password)
        );

        this.users = this.userCollection.valueChanges();
        this.users.subscribe(
          (data) => (
            (this.userCredentials = data),
            localStorage.setItem(
              'userData',
              JSON.stringify(this.userCredentials)
            ),
            this.router.navigateByUrl('dashboard')
          )
        );
        this.invalidLogin = false;
        return;
      } else {
        this.invalidLogin = true;
      }
    }
  }
}
