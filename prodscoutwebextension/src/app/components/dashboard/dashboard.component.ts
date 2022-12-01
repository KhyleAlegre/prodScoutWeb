import { Component, OnInit } from '@angular/core';
import { MenuItem } from 'primeng/api';
import { userModel } from 'src/app/models/users.model';
import { profileModels } from 'src/app/models/profile.model';
import {
  AngularFirestore,
  AngularFirestoreCollection,
} from '@angular/fire/compat/firestore';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { sessionModels } from 'src/app/models/session.model';
import { Router } from '@angular/router';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss'],
})
export class DashboardComponent implements OnInit {
  constructor(public afs: AngularFirestore, private router: Router) {}

  items!: MenuItem[];
  storedUserData: any;
  userData!: userModel[];
  logUser: any;
  logRole: any;
  logUserName: any;
  logProfileUrl: any;
  displayAddProfile: boolean = false;
  profileList!: profileModels[];
  profileDetails!: profileModels;
  eventList!: sessionModels[];
  selectedProfile!: any;
  displayName: any;
  profileData: any;
  profileUsername: any;

  private profileCollection!: AngularFirestoreCollection<profileModels>;
  savedProfiles!: Observable<profileModels[]>;

  private eventCollection!: AngularFirestoreCollection<sessionModels>;
  sessions!: Observable<sessionModels[]>;

  ngOnInit(): void {
    // Load Profile
    this.storedUserData = JSON.parse(localStorage.getItem('userData')!);
    if (!this.storedUserData) {
      this.router.navigateByUrl('/home');
    }
    this.userData = this.storedUserData;
    this.logUser = this.userData[0].firstName;
    this.logRole = this.userData[0].role;
    this.logUserName = this.userData[0].username;
    this.logProfileUrl = this.userData[0].profileImage;
    // Load Navigation Menu
    this.items = [
      {
        label: 'Profiles',
        icon: 'pi pi-fw pi-user',
        items: [
          {
            label: 'Manage Profiles',
            icon: 'pi pi-fw pi-user-plus',
            command: () => {
              this.router.navigateByUrl('/profiles');
            },
          },
        ],
      },
      {
        label: 'Screenshot Gallery',
        icon: 'pi pi-images',
        command: () => {
          this.router.navigateByUrl('/gallery');
        },
      },
      {
        label: 'Logs',
        icon: 'pi pi-fw pi-calendar',
        command: () => {
          this.router.navigateByUrl('/logs');
        },
      },
      {
        label: 'Tools',
        icon: 'pi pi-fw pi-cog',
        items: [
          {
            label: 'Blacklist Sites',
            icon: 'pi pi-fw pi-exclamation-triangle',
            command: () => {
              this.router.navigateByUrl('/blacklist');
            },
          },
          {
            label: 'Desktop Watchlist',
            icon: 'pi pi-fw pi-desktop',
            command: () => {
              this.router.navigateByUrl('/watchlist');
            },
          },
        ],
      },
    ];

    //Get Profiles
    this.profileCollection = this.afs.collection('profiles', (ref) =>
      ref.where('username', '==', this.logUserName)
    );
    this.savedProfiles = this.profileCollection.snapshotChanges().pipe(
      map((changes) => {
        return changes.map((a) => {
          const data = a.payload.doc.data() as profileModels;
          data.id = a.payload.doc.id;
          return data;
        });
      })
    );
    this.savedProfiles.subscribe((data) => (this.profileList = data));
  }

  addNewProfile() {
    this.displayAddProfile = true;
  }

  loadActivities(profile: profileModels) {
    this.profileDetails = profile;
    this.profileData = this.profileDetails;
    localStorage.setItem('selectedData', JSON.stringify(this.profileData));
    this.selectedProfile = this.profileDetails.profileId;
    this.profileUsername = this.profileDetails.username;
    this.displayName = ' - ' + this.profileDetails.firstName;
    //Load All Activities from Database

    this.eventCollection = this.afs.collection('sessions', (ref) =>
      ref
        .where('profileId', '==', this.selectedProfile)
        .where('username', '==', this.profileUsername)
        .limit(150)
        .orderBy('sessiongLogDate', 'desc')
    );

    this.sessions = this.eventCollection.valueChanges();
    this.sessions.subscribe((data) => (this.eventList = data));
  }

  logOut() {
    localStorage.removeItem('userData');
    this.router.navigateByUrl('/home');
  }

  openProfile() {
    this.router.navigateByUrl('/myprofile');
  }
}
