import { Component, OnInit } from '@angular/core';
import { profileModels } from 'src/app/models/profile.model';
import {
  AngularFirestore,
  AngularFirestoreCollection,
} from '@angular/fire/compat/firestore';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { userModel } from 'src/app/models/users.model';
import { Router } from '@angular/router';

@Component({
  selector: 'app-manageprofiles',
  templateUrl: './manageprofiles.component.html',
  styleUrls: ['./manageprofiles.component.scss'],
})
export class ManageprofilesComponent implements OnInit {
  constructor(public afs: AngularFirestore, private router: Router) {}

  private profileCollection!: AngularFirestoreCollection<profileModels>;
  savedProfiles!: Observable<profileModels[]>;

  private qprofileCollection!: AngularFirestoreCollection<profileModels>;
  profiles!: Observable<profileModels[]>;

  selectedProfile: any;
  profileList!: profileModels[];
  profileId: any;
  profilePassword: any;
  accountCount: any;
  strictMode: boolean = false;
  holidayMode: boolean = false;
  startSession: any;
  endSession: any;
  displayDeletePrompt: boolean = false;
  storedUserData: any;
  userData!: userModel[];
  profileUsername: any;
  queriedProfile!: profileModels[];
  profileDocumentId: any;
  profileFirstName: any;
  profileLastName: any;
  displayUpdatePrompt: boolean = false;

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

  getProfile() {
    this.qprofileCollection = this.afs.collection('profiles', (ref) =>
      ref
        .where('profileId', '==', this.selectedProfile)
        .where('username', '==', this.profileUsername)
    );

    this.profiles = this.qprofileCollection.snapshotChanges().pipe(
      map((changes) => {
        return changes.map((a) => {
          const data = a.payload.doc.data() as profileModels;
          data.id = a.payload.doc.id;
          return data;
        });
      })
    );

    this.profiles.subscribe(
      (data) => (
        (this.queriedProfile = data),
        (this.profileId = this.queriedProfile[0].profileId),
        (this.profilePassword = this.queriedProfile[0].profilePassword),
        (this.accountCount = this.queriedProfile[0].accountCount),
        (this.holidayMode = this.queriedProfile[0].holidayMode),
        (this.strictMode = this.queriedProfile[0].strictMode),
        (this.startSession = this.queriedProfile[0].startSessionDate
          .toDate()
          .toLocaleDateString()),
        (this.endSession = this.queriedProfile[0].endSessionDate
          .toDate()
          .toLocaleDateString()),
        (this.profileDocumentId = this.queriedProfile[0].id),
        (this.profileFirstName = this.queriedProfile[0].firstName),
        (this.profileLastName = this.queriedProfile[0].lastName)
      )
    );
  }

  backtoDb() {
    this.router.navigateByUrl('/dashboard');
  }

  setStrict() {
    this.holidayMode = false;
    this.strictMode = true;
  }

  setHoliday() {
    this.strictMode = false;
    this.holidayMode = true;
  }

  updateAccount() {
    this.afs.collection('profiles').doc(this.profileDocumentId).update({
      firstName: this.profileFirstName,
      lastName: this.profileLastName,
      profilePassword: this.profilePassword,
      accountCount: this.accountCount,
      strictMode: this.strictMode,
      holidayMode: this.holidayMode,
    });
    this.displayUpdatePrompt = true;
  }
  deleteAccount() {
    this.afs.collection('profiles').doc(this.profileDocumentId).delete();
    this.displayDeletePrompt = false;
  }
  showPrompt() {
    this.displayDeletePrompt = true;
  }
  cancelDelete() {
    this.displayDeletePrompt = false;
  }
}
