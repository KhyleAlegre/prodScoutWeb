import { Component, OnInit } from '@angular/core';
import { MenuItem } from 'primeng/api';
import { profileModels } from 'src/app/models/profile.model';
import {
  AngularFirestore,
  AngularFirestoreCollection,
} from '@angular/fire/compat/firestore';
import { Observable } from 'rxjs';
import { profileLogsModel } from 'src/app/models/profileLog.model';

@Component({
  selector: 'app-mobiletools',
  templateUrl: './mobiletools.component.html',
  styleUrls: ['./mobiletools.component.scss'],
})
export class MobiletoolsComponent implements OnInit {
  private eventCollection!: AngularFirestoreCollection<profileLogsModel>;
  events!: Observable<profileLogsModel[]>;

  eventList!: profileLogsModel[];
  storedProfileData: any;
  profileData!: profileModels;
  profileName: any;
  profilePassword: any;
  profileUsername: any;
  profileId: any;
  displayNoData: boolean = false;
  displayNudge: boolean = false;
  displaySS: boolean = false;
  displayLogs: boolean = false;

  constructor(public afs: AngularFirestore) {}

  items!: MenuItem[];
  ngOnInit(): void {
    this.items = [
      {
        tooltip: 'Get Screenshot',
        icon: 'pi pi-file-o',
        command: () => {
          this.requestSS();
        },
      },
      {
        tooltip: 'View Activity',
        icon: 'pi pi-mobile',
        command: () => {
          this.showLogs();
        },
      },
      {
        tooltip: 'Send a Nudge',
        icon: 'pi pi-thumbs-up',
        command: () => {
          this.sendNudgeNow();
        },
      },
      {
        tooltip: 'Enable Strict Mode',
        icon: 'pi pi-star',
        command: () => {
          this.setStrict();
        },
      },
      {
        tooltip: 'Enable Holiday Mode',
        icon: 'pi pi-exclamation-triangle',
        command: () => {
          this.setHoliday();
        },
      },
      {
        tooltip: 'Monitor Schedule',
        icon: 'pi pi-id-card',
        command: () => {
          this.showScheduling();
        },
      },
    ];
  }

  loadProfile() {
    this.storedProfileData = JSON.parse(localStorage.getItem('selectedData')!);
    this.profileData = this.storedProfileData;
    this.profileName = this.profileData.profileId;
    this.profilePassword = this.profileData.profilePassword;
    this.profileUsername = this.profileData.username;
    this.profileId = this.profileData.id;
    console.log(this.profileName, this.profilePassword, this.profileUsername);
  }

  sendNudgeNow() {
    this.loadProfile();
    //Updates the Nudge Status

    this.afs.collection('profiles').doc(this.profileId).update({
      nudge: true,
    });

    setTimeout(() => {
      this.afs.collection('profiles').doc(this.profileId).update({
        nudge: false,
      });
    }, 3000);

    // Sends Notif
    this.displayNudge = true;
  }

  requestSS() {
    this.loadProfile();

    this.afs.collection('profiles').doc(this.profileId).update({
      ssrequest: true,
    });

    setTimeout(() => {
      this.afs.collection('profiles').doc(this.profileId).update({
        ssrequest: false,
      });
    }, 3000);

    // Sends Notif
    this.displaySS = true;
  }

  setStrict() {
    this.loadProfile();

    this.afs.collection('profiles').doc(this.profileId).update({
      strictMode: true,
      holidayMode: false,
    });

    alert('Strict Mode has been set');
  }

  setHoliday() {
    this.loadProfile();

    this.afs.collection('profiles').doc(this.profileId).update({
      strictMode: false,
      holidayMode: true,
    });

    alert('Holiday Mode has been set');
  }

  showScheduling() {
    alert('Scheduling is only available on Desktop');
  }

  showLogs() {
    this.displayLogs = true;
  }
}
