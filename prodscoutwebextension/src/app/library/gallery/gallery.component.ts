import { Component, OnInit } from '@angular/core';
import {
  AngularFirestore,
  AngularFirestoreCollection,
} from '@angular/fire/compat/firestore';
import { Observable } from 'rxjs';
import { Router } from '@angular/router';
import { userModel } from 'src/app/models/users.model';
import { profileModels } from 'src/app/models/profile.model';
import { galleryModels } from 'src/app/models/gallery.model';
@Component({
  selector: 'app-gallery',
  templateUrl: './gallery.component.html',
  styleUrls: ['./gallery.component.scss'],
})
export class GalleryComponent implements OnInit {
  constructor(public afs: AngularFirestore, private router: Router) {}

  private profileCollection!: AngularFirestoreCollection<profileModels>;
  savedProfiles!: Observable<profileModels[]>;

  private galleryCollection!: AngularFirestoreCollection<galleryModels>;
  galleries!: Observable<galleryModels[]>;

  selectedProfile: any;
  profileList!: profileModels[];
  profileUsername: any;
  storedUserData: any;
  userData!: userModel[];
  galleryList!: galleryModels[];

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

  getGallery() {
    this.galleryCollection = this.afs.collection('gallery', (ref) =>
      ref
        .where('profileId', '==', this.selectedProfile)
        .where('userName', '==', this.profileUsername)
        .orderBy('logDate', 'desc')
        .limit(500)
    );

    this.galleries = this.galleryCollection.valueChanges();
    this.galleries.subscribe((data) => (this.galleryList = data));
  }

  backtoDb() {
    this.router.navigateByUrl('/dashboard');
  }
}
