///<reference types="chrome"/>
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-watcher',
  templateUrl: './watcher.component.html',
  styleUrls: ['./watcher.component.scss'],
})
export class WatcherComponent implements OnInit {
  constructor() {}

  profId: any;
  password: any;
  profilePrompt: any;
  passwordPrompt: any;
  noId: boolean = false;
  noPassword: boolean = false;
  invalidCredential: boolean = false;
  invalidCredentialPrompt: any;
  showWatcher: boolean = false;

  ngOnInit(): void {}

  showForm() {
    this.showWatcher = true;
  }

  login() {
    if (!this.profId) {
      this.noId = true;
      this.profilePrompt = '* Profile Id is required';
    } else {
      this.noId = false;
      this.profilePrompt = '';
    }

    if (!this.password) {
      this.noPassword = true;
      this.passwordPrompt = '* Please put your password';
    } else {
      this.noPassword = false;
      this.passwordPrompt = '';
    }

    if (!this.profId && !this.password) {
      this.invalidCredentialPrompt = 'Please enter your details';
    } else {
      chrome.storage.sync.set({ Profile: this.profId });
      chrome.storage.sync.set({ Password: this.password });
      alert("We're now connecting you to our Scouts, please wait");

      this.profId = '';
      this.password = '';
    }
  }
}
