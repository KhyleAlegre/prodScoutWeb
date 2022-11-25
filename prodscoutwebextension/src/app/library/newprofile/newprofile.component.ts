import { Component, OnInit } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { profileModels } from 'src/app/models/profile.model';
import { userModel } from 'src/app/models/users.model';

@Component({
  selector: 'app-newprofile',
  templateUrl: './newprofile.component.html',
  styleUrls: ['./newprofile.component.scss'],
})
export class NewprofileComponent implements OnInit {
  profile: profileModels = {
    profileId: '',
    firstName: '',
    lastName: '',
    accountCount: '',
    profileType: '',
    strictMode: true,
    holidayMode: false,
    profilePassword: '',
    profileUrl: '',
    username: '',
    nudge: false,
    ssrequest: false,
    startSessionDate: '',
    endSessionDate: '',
  };

  constructor(public afs: AngularFirestore) {}

  profileId: any;
  firstName: any;
  lastName: any;
  password: any;
  avPrompt: any;
  displaySuccess: any;
  // Workers
  isMismatched: boolean = false;
  noSelectedAV: boolean = false;
  //Avatar
  avSelect: any;
  avBoy: any;
  avGirl!: any;
  //Accounts
  storedUserData: any;
  userData!: userModel[];
  logUser: any;
  logRole: any;
  logUserName: any;
  ngOnInit(): void {
    this.storedUserData = JSON.parse(localStorage.getItem('userData')!);
    this.userData = this.storedUserData;
    this.logUser = this.userData[0].firstName;
    this.logRole = this.userData[0].role;
    this.logUserName = this.userData[0].username;

    this.avBoy =
      'https://firebasestorage.googleapis.com/v0/b/prodscout-90022.appspot.com/o/2880690.png?alt=media&token=3b695e30-0c8c-47a4-85d1-ff9058717206';
    this.avGirl =
      'https://firebasestorage.googleapis.com/v0/b/prodscout-90022.appspot.com/o/2880587.png?alt=media&token=8262c3ad-b166-4d83-afed-19530dff6236';
  }

  selectAvb() {
    document.getElementById('maleDiv')!.style.backgroundColor = '#5F9DF7';
    document.getElementById('femaleDiv')!.style.backgroundColor = 'transparent';
    this.avSelect = this.avBoy;
  }

  selectAvg() {
    document.getElementById('femaleDiv')!.style.backgroundColor = '#FFD6EC';
    document.getElementById('maleDiv')!.style.backgroundColor = 'transparent';
    this.avSelect = this.avGirl;
  }

  addProfile() {
    // Field Completion
    this.profile.profileId = this.profileId;
    this.profile.firstName = this.firstName;
    this.profile.lastName = this.lastName;
    this.profile.profilePassword = this.password;
    this.profile.profileUrl = this.avSelect;
    this.profile.username = this.logUserName;
    this.profile.strictMode = true;
    this.profile.accountCount = 1;
    this.profile.startSessionDate = '';
    this.profile.endSessionDate = '';
    // Stores to Database
    this.afs.collection('profiles').add(this.profile);

    //Calls Prompt
    this.displaySuccess = true;

    //Clear Fields
    this.profileId = '';
    this.firstName = '';
    this.lastName = '';
    this.password = '';
  }
}
