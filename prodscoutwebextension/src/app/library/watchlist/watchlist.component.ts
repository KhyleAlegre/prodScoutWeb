import { Component, OnInit } from '@angular/core';
import {
  AngularFirestore,
  AngularFirestoreCollection,
} from '@angular/fire/compat/firestore';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { watchlistModel } from 'src/app/models/watchlist.model';
import { userModel } from 'src/app/models/users.model';
import { Router } from '@angular/router';
import { deleteApp } from 'firebase/app';

@Component({
  selector: 'app-watchlist',
  templateUrl: './watchlist.component.html',
  styleUrls: ['./watchlist.component.scss'],
})
export class WatchlistComponent implements OnInit {
  private watchListCollection!: AngularFirestoreCollection<watchlistModel>;
  wLs!: Observable<watchlistModel[]>;

  watchList!: watchlistModel[];
  storedUserData: any;
  userData!: userModel[];
  logUsername: any;
  displayDeletePrompt: boolean = false;
  displayAddPrompt: boolean = false;
  categoryValue: any;
  categories!: any[];
  exeName: any;
  watchListDetails!: watchlistModel;

  constructor(public afs: AngularFirestore, private router: Router) {}

  ngOnInit(): void {
    this.storedUserData = JSON.parse(localStorage.getItem('userData')!);
    this.userData = this.storedUserData;
    this.logUsername = this.userData[0].username;

    this.watchListCollection = this.afs.collection('watchlist', (ref) =>
      ref.where('username', '==', this.logUsername)
    );

    this.wLs = this.watchListCollection.snapshotChanges().pipe(
      map((changes) => {
        return changes.map((a) => {
          const data = a.payload.doc.data() as watchlistModel;
          data.id = a.payload.doc.id;
          return data;
        });
      })
    );

    this.wLs.subscribe((data) => (this.watchList = data));

    this.categories = [
      { value: 'Web Browser' },
      { value: 'Office Productivity' },
      { value: 'Games' },
      { value: 'Entertainment' },
      { value: 'Multimedia' },
    ];
  }

  addApp() {
    if (!this.exeName || !this.categoryValue) {
      return alert('Please complete all details');
    }

    this.afs.collection('watchlist').add({
      applicationName: this.exeName,
      category: this.categoryValue.value,
      username: this.logUsername,
    });

    this.displayAddPrompt = true;
  }

  getApp(appDetails: watchlistModel) {
    this.watchListDetails = appDetails;
    this.displayDeletePrompt = true;
  }

  deleteApp() {
    this.afs.collection('watchlist').doc(this.watchListDetails.id).delete();
    this.displayDeletePrompt = false;
  }

  cancelDelete() {
    this.displayDeletePrompt = false;
  }

  backtoDb() {
    this.router.navigateByUrl('/dashboard');
  }
}
