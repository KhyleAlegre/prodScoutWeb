import { Component, OnInit } from '@angular/core';
import {
  AngularFirestore,
  AngularFirestoreCollection,
} from '@angular/fire/compat/firestore';
import { Observable } from 'rxjs';
import { profileLogsModel } from 'src/app/models/profileLog.model';
import { profileModels } from 'src/app/models/profile.model';
@Component({
  selector: 'app-profilelogs',
  templateUrl: './profilelogs.component.html',
  styleUrls: ['./profilelogs.component.scss'],
})
export class ProfilelogsComponent implements OnInit {
  private eventCollection!: AngularFirestoreCollection<profileLogsModel>;
  events!: Observable<profileLogsModel[]>;

  eventList!: profileLogsModel[];
  storedProfileData: any;
  profileData!: profileModels;
  profileName: any;
  profilePassword: any;
  profileUsername: any;
  profileId: any;
  filterValue: any;

  constructor(public afs: AngularFirestore) {}

  ngOnInit(): void {
    this.storedProfileData = JSON.parse(localStorage.getItem('selectedData')!);
    this.profileData = this.storedProfileData;
    this.profileName = this.profileData.profileId;
    this.profilePassword = this.profileData.profilePassword;
    this.profileUsername = this.profileData.username;
    this.profileId = this.profileData.id;
    this.eventCollection = this.afs.collection('profileLogs', (ref) =>
      ref
        .where('profileName', '==', this.profileName)
        .where('userName', '==', this.profileUsername)
        .orderBy('logDate', 'desc')
        .limit(150)
    );
    this.events = this.eventCollection.valueChanges();
    this.events.subscribe((data) => (this.eventList = data));
  }
}
