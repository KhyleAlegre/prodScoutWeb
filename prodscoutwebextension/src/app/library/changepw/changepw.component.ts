import { Component, OnInit } from '@angular/core';
import {
  AngularFirestore,
  AngularFirestoreCollection,
} from '@angular/fire/compat/firestore';
import { Observable } from 'rxjs';
import { userModel } from 'src/app/models/users.model';
import { map } from 'rxjs/operators';
import { Router } from '@angular/router';
@Component({
  selector: 'app-changepw',
  templateUrl: './changepw.component.html',
  styleUrls: ['./changepw.component.scss'],
})
export class ChangepwComponent implements OnInit {
  constructor(public afs: AngularFirestore, private router: Router) {}

  noEmail: boolean = false;
  noUser: boolean = false;
  emailPrompt: any;
  userPrompt: any;
  email: any;
  username: any;
  showSpinner: boolean = false;
  showMain: boolean = true;
  showGenPage: boolean = false;
  userCredentials!: userModel[];
  userList!: userModel[];
  genPassword: any;
  userId: any;
  invalidCreds: boolean = false;
  copiedPw: any;
  displayPassword: boolean = false;

  private userCollection!: AngularFirestoreCollection<userModel>;
  users!: Observable<userModel[]>;

  private userValidationCollection!: AngularFirestoreCollection<userModel>;
  validatedUsers!: Observable<userModel[]>;

  ngOnInit(): void {
    // Retrieve User list
    this.userCollection = this.afs.collection('users');
    this.users = this.userCollection.valueChanges();
    this.users.subscribe((data) => (this.userList = data));
  }

  getChangePW() {
    if (!this.email) {
      this.noEmail = true;
      this.emailPrompt = 'Please enter your Email Address';
    } else {
      this.noEmail = false;
      this.emailPrompt = '';
    }

    if (!this.username) {
      this.noUser = true;
      this.userPrompt = 'Please enter your Username';
    } else {
      this.noUser = false;
      this.userPrompt = '';
    }

    for (let i = 0; i < this.userList.length; i++) {
      if (this.email == this.userList[i].email) {
        this.userValidationCollection = this.afs.collection('users', (ref) =>
          ref.where('email', '==', this.email)
        );

        this.validatedUsers = this.userValidationCollection
          .snapshotChanges()
          .pipe(
            map((changes) => {
              return changes.map((a) => {
                const data = a.payload.doc.data() as userModel;
                data.id = a.payload.doc.id;
                return data;
              });
            })
          );

        this.validatedUsers.subscribe((data) => {
          this.userCredentials = data;
          this.userId = this.userCredentials[0].id;
          this.genPassword = Math.random().toString(36).replace('0.', '');
        });

        this.invalidCreds = false;
        this.showMain = false;
        this.showGenPage = true;
        return;
      } else {
        this.invalidCreds = true;
        this.showMain = true;
        this.showGenPage = false;
      }
    }
  }

  copyPw() {
    this.displayPassword = true;
    this.showMain = true;
    this.afs.collection('users').doc(this.userId).update({
      password: this.genPassword,
    });
    this.afs.collection('mail').add({
      to: this.email,
      message: {
        subject: 'Password Reset Notice',
        html:
          'You recently requested a password change, here is the generated password: ' +
          this.genPassword +
          ' you may use this to temporary access your account and update your password. -Cheers!',
      },
    });

    this.showGenPage = false;
    this.email = '';
    this.username = '';
  }
}
