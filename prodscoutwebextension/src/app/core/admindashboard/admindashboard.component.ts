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
  userList!: userModel[];
  storedAdminData: any;
  adminData!: adminModels[];
  adminUser: any;

  private userCollection!: AngularFirestoreCollection<userModel>;
  users!: Observable<userModel[]>;

  ngOnInit(): void {
    this.storedAdminData = JSON.parse(localStorage.getItem('adminData')!);
    this.adminData = this.storedAdminData;
    this.username = this.adminData[0].username;
    this.displayDate = new Date();
    this.displayDate = this.displayDate.toLocaleDateString();
    this.userCollection = this.afs.collection('users');
    this.users = this.userCollection.valueChanges();
    this.users.subscribe((data) => (this.userList = data));
  }

  logOut() {
    this.router.navigateByUrl('/rabbithole');
  }
}
