import { Component, OnInit } from '@angular/core';
import {
  AngularFirestore,
  AngularFirestoreCollection,
} from '@angular/fire/compat/firestore';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { blacklistmodels } from 'src/app/models/blacklist.model';
import { userModel } from 'src/app/models/users.model';
import { Router } from '@angular/router';

@Component({
  selector: 'app-blacklist',
  templateUrl: './blacklist.component.html',
  styleUrls: ['./blacklist.component.scss'],
})
export class BlacklistComponent implements OnInit {
  private blackListCollection!: AngularFirestoreCollection<blacklistmodels>;
  bls!: Observable<blacklistmodels[]>;

  blackList!: blacklistmodels[];
  storedUserData: any;
  userData!: userModel[];
  logUsername: any;
  displayDeletePrompt: boolean = false;
  displayAddPrompt: boolean = false;
  urlSite: any;
  categoryValue: any;
  categories!: any[];
  blackListDetails!: blacklistmodels;

  constructor(public afs: AngularFirestore, private router: Router) {}

  ngOnInit(): void {
    this.storedUserData = JSON.parse(localStorage.getItem('userData')!);
    this.userData = this.storedUserData;
    this.logUsername = this.userData[0].username;

    this.blackListCollection = this.afs.collection('blacklistSites', (ref) =>
      ref.where('username', '==', this.logUsername)
    );
    this.bls = this.blackListCollection.snapshotChanges().pipe(
      map((changes) => {
        return changes.map((a) => {
          const data = a.payload.doc.data() as blacklistmodels;
          data.id = a.payload.doc.id;
          return data;
        });
      })
    );
    this.bls.subscribe((data) => (this.blackList = data));

    this.categories = [
      { value: 'Social Media' },
      { value: 'Gaming' },
      { value: 'Pornography' },
      { value: 'Violence' },
      { value: 'Others' },
    ];
  }

  getSite(siteDetails: blacklistmodels) {
    this.blackListDetails = siteDetails;
    this.displayDeletePrompt = true;
  }

  addSite() {
    if (!this.urlSite || !this.categoryValue) {
      return alert('Please complete all details');
    }

    this.afs.collection('blacklistSites').add({
      samplesite: this.urlSite,
      category: this.categoryValue.value,
      username: this.logUsername,
    });

    this.displayAddPrompt = true;
  }

  deleteSite() {
    this.afs
      .collection('blacklistSites')
      .doc(this.blackListDetails.id)
      .delete();
    this.displayDeletePrompt = false;
  }

  cancelDelete() {
    this.displayDeletePrompt = false;
  }

  backtoDb() {
    this.router.navigateByUrl('/dashboard');
  }
}
