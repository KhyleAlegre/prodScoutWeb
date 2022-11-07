import { Component, OnInit } from '@angular/core';
import {
  AngularFirestore,
  AngularFirestoreCollection,
} from '@angular/fire/compat/firestore';
import { Route, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { userModel } from 'src/app/models/users.model';
import { map } from 'rxjs/operators';
import { adminModels } from 'src/app/models/admin.model';
import { profileModels } from 'src/app/models/profile.model';
@Component({
  selector: 'app-admindashboard',
  templateUrl: './admindashboard.component.html',
  styleUrls: ['./admindashboard.component.scss'],
})
export class AdmindashboardComponent implements OnInit {
  constructor(public afs: AngularFirestore, private router: Router) {}

  username: any;
  filter: any;
  filterUser: any;
  displayDate: any;
  userPassword: any;
  userEmail: any;
  userContact: any;
  userList!: userModel[];
  profileList!: profileModels[];
  userData!: userModel;
  storedAdminData: any;
  adminData!: adminModels[];
  adminUser: any;
  userIdKey: any;
  noNull: boolean = false;
  totalProfiles: any;
  totalUsers: any;
  updatePrompt: any;

  private userCollection!: AngularFirestoreCollection<userModel>;
  users!: Observable<userModel[]>;

  private profileCollection!: AngularFirestoreCollection<profileModels>;
  profiles!: Observable<profileModels[]>;

  ngOnInit(): void {
    this.storedAdminData = JSON.parse(localStorage.getItem('adminData')!);
    this.adminData = this.storedAdminData;
    this.username = this.adminData[0].username;
    this.displayDate = new Date();
    this.displayDate = this.displayDate.toLocaleDateString();
    this.profileCollection = this.afs.collection('profiles');
    this.profiles = this.profileCollection.valueChanges();
    this.profiles.subscribe(
      (data) => (
        (this.profileList = data),
        (this.totalProfiles = this.profileList.length)
      )
    );
    this.userCollection = this.afs.collection('users');
    this.users = this.userCollection.snapshotChanges().pipe(
      map((changes) => {
        return changes.map((a) => {
          const data = a.payload.doc.data() as userModel;
          data.id = a.payload.doc.id;
          return data;
        });
      })
    );
    this.users.subscribe(
      (data) => (
        (this.userList = data), (this.totalUsers = this.userList.length)
      )
    );
  }

  loadDetails(row: userModel) {
    this.userData = row;
    this.userPassword = this.userData.password;
    this.userContact = this.userData.contactNo;
    this.userEmail = this.userData.email;
    this.userIdKey = this.userData.id;
  }

  updateDetails() {
    if (!this.userEmail || !this.userPassword || !this.userContact) {
      this.noNull = true;
      return;
    } else {
      this.noNull = false;
    }

    this.afs.collection('users').doc(this.userIdKey).update({
      password: this.userPassword,
      contactNo: this.userContact,
      email: this.userEmail,
    });

    this.updatePrompt = 'Profile has been updated!';

    setTimeout(() => {
      this.userPassword = '';
      this.userEmail = '';
      this.userContact = '';
      this.updatePrompt = '';
    }, 2000);
  }
  openLogs() {
    this.router.navigateByUrl('/adminLogs');
  }
  logOut() {
    this.router.navigateByUrl('/rabbithole');
  }
}
