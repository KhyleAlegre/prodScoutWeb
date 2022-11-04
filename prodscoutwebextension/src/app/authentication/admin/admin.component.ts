import { Component, OnInit } from '@angular/core';
import {
  AngularFirestore,
  AngularFirestoreCollection,
} from '@angular/fire/compat/firestore';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { adminModels } from 'src/app/models/admin.model';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.scss'],
})
export class AdminComponent implements OnInit {
  constructor(public afs: AngularFirestore, private router: Router) {}

  private adminCollection!: AngularFirestoreCollection<adminModels>;
  admins!: Observable<adminModels[]>;

  noUser: boolean = false;
  userPrompt: any;
  username: any;
  noPassword: boolean = false;
  pwPrompt: any;
  password: any;
  invalidLogin: boolean = false;

  adminList!: adminModels[];
  adminCredentials!: adminModels[];
  ngOnInit(): void {
    localStorage.removeItem('adminData');
    localStorage.clear();

    this.adminCollection = this.afs.collection('adminusers');
    this.admins = this.adminCollection.valueChanges();
    this.admins.subscribe((data) => (this.adminList = data));
  }

  logIn() {
    if (!this.username) {
      this.noUser = true;
      this.userPrompt = '*Invalid Username';
    } else {
      this.noUser = false;
      this.userPrompt = '';
    }

    if (!this.password) {
      this.noPassword = true;
      this.pwPrompt = '*Please put your password';
    } else {
      this.noPassword = false;
      this.pwPrompt = '';
    }

    for (let i = 0; i < this.adminList.length; i++) {
      if (
        this.username == this.adminList[i].username &&
        this.password == this.adminList[i].password
      ) {
        this.adminCollection = this.afs.collection('adminusers', (ref) =>
          ref
            .where('username', '==', this.username)
            .where('password', '==', this.password)
        );

        this.admins = this.adminCollection.valueChanges();
        this.admins.subscribe(
          (data) => (
            (this.adminCredentials = data),
            localStorage.setItem(
              'adminData',
              JSON.stringify(this.adminCredentials)
            ),
            this.router.navigateByUrl('admin')
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
