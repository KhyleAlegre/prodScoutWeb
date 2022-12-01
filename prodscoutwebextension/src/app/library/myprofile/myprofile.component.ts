import { Component, OnInit } from '@angular/core';
import {
  AngularFirestore,
  AngularFirestoreCollection,
} from '@angular/fire/compat/firestore';
import { AngularFireStorage } from '@angular/fire/compat/storage';
import { Observable, concatWith } from 'rxjs';
import { map } from 'rxjs/operators';
import { userModel } from 'src/app/models/users.model';
import { Router } from '@angular/router';

@Component({
  selector: 'app-myprofile',
  templateUrl: './myprofile.component.html',
  styleUrls: ['./myprofile.component.scss'],
})
export class MyprofileComponent implements OnInit {
  constructor(
    public afs: AngularFirestore,
    private afsU: AngularFireStorage,
    private router: Router
  ) {}
  username: any;
  firstName: any;
  lastName: any;
  email: any;
  password: any;
  contactNo: any;
  oldPassword: any;
  newPassword: any;
  checkPassword: any;
  accountId: any;
  fieldCheckerFname: boolean = false;
  fieldCheckerLname: boolean = false;
  fieldCheckerEmail: boolean = false;
  fieldCheckerContact: boolean = false;
  fieldPrompt: any;
  validatePasswordChecker: boolean = false;
  passwordChecker: boolean = false;
  oldpasswordChecker: boolean = false;
  displayChangePassword: boolean = false;
  userList!: userModel[];
  userListComparator!: userModel[];
  storedUserData: any;
  userData!: userModel[];
  logEmail: any;
  logUsername: any;
  logProfileUrl: any;
  emailChecker: any;
  displayUpdateSuccess: any;
  displayPasswordSuccess: any;
  eventImage: any;
  imageUrl!: Observable<string>;
  imageBaseRef: any;
  imageRef: any;
  imagePathName: any;
  imageSub: any;
  userCredentials!: userModel[];
  isMinChar: boolean = false;
  minCharPrompt: any;
  isAphx: boolean = false;
  aphxPrompt: any;
  chx: any;

  private userCollection!: AngularFirestoreCollection<userModel>;
  users!: Observable<userModel[]>;

  private userValidationCollection!: AngularFirestoreCollection<userModel>;
  validatedUsers!: Observable<userModel[]>;

  ngOnInit(): void {
    this.storedUserData = JSON.parse(localStorage.getItem('userData')!);
    this.userData = this.storedUserData;
    this.logEmail = this.userData[0].email;
    this.logUsername = this.userData[0].username;
    this.logProfileUrl = this.userData[0].profileImage;
    this.userCollection = this.afs.collection('users', (ref) =>
      ref
        .where('username', '==', this.logUsername)
        .where('email', '==', this.logEmail)
    );

    this.users = this.userCollection.snapshotChanges().pipe(
      map((changes) => {
        return changes.map((a) => {
          const data = a.payload.doc.data() as userModel;
          data.id = a.payload.doc.id;
          return data;
        });
      })
    );

    this.users.subscribe((data) => {
      (this.userList = data),
        (this.accountId = this.userList[0].id),
        (this.firstName = this.userList[0].firstName),
        (this.lastName = this.userList[0].lastName),
        (this.email = this.userList[0].email),
        (this.contactNo = this.userList[0].contactNo),
        (this.username = this.userList[0].username),
        (this.password = this.userList[0].password);
    });

    this.userValidationCollection = this.afs.collection('users');
    this.validatedUsers = this.userValidationCollection.valueChanges();
    this.validatedUsers.subscribe((data) => (this.userListComparator = data));
  }

  showPasswordChange() {
    this.displayChangePassword = true;
  }

  updateProfile() {
    // Field Validation
    if (!this.firstName) {
      this.fieldCheckerFname = true;
    } else {
      this.fieldCheckerFname = false;
    }

    if (!this.lastName) {
      this.fieldCheckerLname = true;
    } else {
      this.fieldCheckerLname = false;
    }

    if (!this.email) {
      this.fieldCheckerEmail = true;
    } else {
      this.fieldCheckerEmail = false;
    }

    if (!this.contactNo) {
      this.fieldCheckerContact = true;
      return;
    } else {
      this.fieldCheckerContact = false;
    }

    // Email Validation
    for (let i = 0; i < this.userListComparator.length; i++) {
      if (this.email == this.logEmail) {
        this.emailChecker = false;
      } else if (this.email == this.userListComparator[i].email) {
        this.emailChecker = true;
        return;
      } else {
        this.emailChecker = false;
      }
    }

    // Update

    this.afs.collection('users').doc(this.accountId).update({
      firstName: this.firstName,
      lastName: this.lastName,
      email: this.email,
      contactNo: this.contactNo,
    });

    this.displayUpdateSuccess = true;
  }

  updatePassword() {
    if (this.oldPassword != this.password) {
      this.validatePasswordChecker = true;
      return;
    } else {
      this.validatePasswordChecker = false;
    }

    if (this.newPassword == this.oldPassword) {
      this.oldpasswordChecker = true;
      return;
    } else {
      this.oldpasswordChecker = false;
    }

    if (this.newPassword != this.checkPassword) {
      this.passwordChecker = true;
      return;
    } else {
      this.passwordChecker = false;
    }

    if (this.newPassword.length < 6 || this.checkPassword < 6) {
      this.isMinChar = true;
      this.minCharPrompt = 'Must be 6 characters long';
      return;
    } else {
      this.isMinChar = false;
      this.minCharPrompt = '';
    }

    this.matchPW(this.newPassword);
    this.displayUpdateSuccess = true;
    this.afs.collection('users').doc(this.accountId).update({
      password: this.newPassword,
    });

    this.users.subscribe(
      (data) => (
        (this.userCredentials = data),
        localStorage.setItem('userData', JSON.stringify(this.userCredentials)),
        setTimeout(() => {
          this.router.navigateByUrl('/myprofile');
        }, 300)
      )
    );

    this.newPassword = '';
    this.oldPassword = '';
    this.checkPassword = '';
  }

  browseImage($event: any) {
    this.eventImage = $event.files[0];
    this.uploadImage();
  }

  matchPW(value: any) {
    for (let i = 0; i < this.newPassword.length; i++) {
      this.chx = value.charCodeAt(i);
      if (
        !(this.chx > 47 && this.chx < 58) && // numeric (0-9)
        !(this.chx > 64 && this.chx < 91) && // upper alpha (A-Z)
        !(this.chx > 96 && this.chx < 123)
      ) {
        // lower alpha (a-z)
        this.isAphx = false;
        this.aphxPrompt = '';
        return;
      }
    }
    this.isAphx = true;
    this.aphxPrompt =
      'Must Contain at least one special character [/, *, <, @]';
    return;
  }

  uploadImage() {
    //Uploads the file into storage
    this.imagePathName = 'profile' + Math.random();
    this.imageRef = this.afsU.ref(this.imagePathName);

    this.imageBaseRef = this.afsU.upload(this.imagePathName, this.eventImage);
    // Gets Image Url for Subscription for real time profile image changing
    this.imageSub = this.imageBaseRef
      .snapshotChanges()
      .pipe(concatWith(this.imageRef.getDownloadURL()))
      .subscribe((url: Observable<string>) => {
        this.imageUrl = url;
        console.log(this.imageUrl);
        this.logProfileUrl = this.imageUrl;
        this.afs.collection('users').doc(this.accountId).update({
          profileImage: this.imageUrl,
        });

        //Update Local Storage
        this.users.subscribe(
          (data) => (
            (this.userCredentials = data),
            localStorage.setItem(
              'userData',
              JSON.stringify(this.userCredentials)
            ),
            setTimeout(() => {
              this.router.navigateByUrl('/myprofile');
            }, 300)
          )
        );
      });
  }

  backtoDb() {
    this.router.navigateByUrl('/dashboard');
  }
}
