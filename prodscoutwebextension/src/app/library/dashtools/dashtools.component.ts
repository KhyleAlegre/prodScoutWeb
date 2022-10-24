import { Component, OnInit } from '@angular/core';
import { profileModels } from 'src/app/models/profile.model';
import { AngularFirestore } from '@angular/fire/compat/firestore';
@Component({
  selector: 'app-dashtools',
  templateUrl: './dashtools.component.html',
  styleUrls: ['./dashtools.component.scss'],
})
export class DashtoolsComponent implements OnInit {
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
  startSession!: Date;
  endSession!: Date;
  constructor(public afs: AngularFirestore) {}

  ngOnInit(): void {}

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
    }, 5000);

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
    }, 8000);

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
    this.loadProfile();
    if (!this.startSession) {
      return alert('Please select a Start Date');
    }

    if (!this.endSession) {
      return alert('Please select a End Date');
    }

    if (this.endSession < this.startSession) {
      return alert('Invalid Date Range');
    }
    this.afs.collection('profiles').doc(this.profileId).update({
      startSessionDate: this.startSession,
      endSessionDate: this.endSession,
    });

    alert('Scouts are now aware for the schedule');
  }

  getStartSession() {
    console.log(this.startSession);
  }

  getEndSession() {
    console.log(this.endSession);
  }

  loadProfile() {
    this.storedProfileData = JSON.parse(localStorage.getItem('selectedData')!);
    this.profileData = this.storedProfileData;
    if (!this.profileData) {
      this.displayNoData = true;
    } else {
      this.profileName = this.profileData.profileId;
      this.profilePassword = this.profileData.profilePassword;
      this.profileUsername = this.profileData.username;
      this.profileId = this.profileData.id;
      this.displayNoData = false;
    }
  }

  showLogs() {
    this.displayLogs = true;
  }
}
