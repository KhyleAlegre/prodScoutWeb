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
  selector: 'app-admin-logs',
  templateUrl: './admin-logs.component.html',
  styleUrls: ['./admin-logs.component.scss'],
})
export class AdminLogsComponent implements OnInit {
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
    this.profileCollection = this.afs.collection('profiles');
    this.savedProfiles = this.profileCollection.valueChanges();
    this.savedProfiles.subscribe((data) => (this.profileList = data));
  }

  getProfileLogs() {
    this.eventCollection = this.afs.collection('profileLogs', (ref) =>
      ref
        .where('profileName', '==', this.selectedProfile)
        .orderBy('logDate', 'desc')
        .limit(2500)
    );
    this.events = this.eventCollection.valueChanges();
    this.events.subscribe((data) => (this.eventList = data));
  }

  backtoDb() {
    this.router.navigateByUrl('/admin');
  }
}
