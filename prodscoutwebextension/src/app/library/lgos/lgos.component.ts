import { Component, OnInit } from '@angular/core';
import { profileModels } from 'src/app/models/profile.model';
import { profileLogsModel } from 'src/app/models/profileLog.model';
import {
  AngularFirestore,
  AngularFirestoreCollection,
} from '@angular/fire/compat/firestore';
import { Observable } from 'rxjs';
import { Router } from '@angular/router';
import { userModel } from 'src/app/models/users.model';

@Component({
  selector: 'app-lgos',
  templateUrl: './lgos.component.html',
  styleUrls: ['./lgos.component.scss'],
})
export class LgosComponent implements OnInit {
  constructor(public afs: AngularFirestore, private router: Router) {}

  private eventCollection!: AngularFirestoreCollection<profileLogsModel>;
  events!: Observable<profileLogsModel[]>;

  private profileCollection!: AngularFirestoreCollection<profileModels>;
  savedProfiles!: Observable<profileModels[]>;

  selectedProfile: any;
  filterValue: any;
  eventList!: profileLogsModel[];
  profileList!: profileModels[];
  profileUsername: any;
  storedUserData: any;
  userData!: userModel[];

  ngOnInit(): void {
    this.storedUserData = JSON.parse(localStorage.getItem('userData')!);
    this.userData = this.storedUserData;
    this.profileUsername = this.userData[0].username;

    this.profileCollection = this.afs.collection('profiles', (ref) =>
      ref.where('username', '==', this.profileUsername)
    );

    this.savedProfiles = this.profileCollection.valueChanges();
    this.savedProfiles.subscribe((data) => (this.profileList = data));
  }

  getProfileLogs() {
    this.eventCollection = this.afs.collection('profileLogs', (ref) =>
      ref
        .where('profileName', '==', this.selectedProfile)
        .where('userName', '==', this.profileUsername)
        .orderBy('logDate', 'desc')
        .limit(500)
    );
    this.events = this.eventCollection.valueChanges();
    this.events.subscribe((data) => (this.eventList = data));
  }

  backtoDb() {
    this.router.navigateByUrl('/dashboard');
  }
}
