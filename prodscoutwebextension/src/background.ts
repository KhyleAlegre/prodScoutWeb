///<reference types="chrome"/>
//Imports
import firebase from 'firebase/compat/app';
import { getStorage } from 'firebase/storage';
import 'firebase/compat/auth';
import 'firebase/compat/firestore';
import { ref, getDownloadURL, uploadBytes } from 'firebase/storage';

// Database Configurations
var firebaseConfig = {
  apiKey: 'AIzaSyCXQUepOnbY0h3_kfUENO1izOF9pbgdPvs',
  authDomain: 'prodscout-90022.firebaseapp.com',
  projectId: 'prodscout-90022',
  storageBucket: 'prodscout-90022.appspot.com',
  messagingSenderId: '420088922412',
  appId: '1:420088922412:web:b90702f51a77e7fdbdec89',
  measurementId: 'G-SQVJ1QZ5EQ',
};

// Declarations and Initialization
firebase.initializeApp(firebaseConfig);
var afs = firebase.firestore();
var event = afs.collection('profileLogs');
var session = afs.collection('sessions');
var profileId: any;
var password: any;
var creds: any;
var profileData: any[] = [];
var eventTimeStamp: any;
var sessionTimeStamp: any;
var blackList: any[] = [];
var strictMode: any;
var holidayMode: any;
var ssUrl: any;
var ssPathName: any;
var imageRef: any;
var imageBaseRef: any;
var randomInterval: any;
var nudgeRequest: boolean = false;
var SSRequest: boolean = false;
var startSession: any;
var endSession: any;
var sessionDate: any;
//Load Profile

chrome.runtime.onInstalled.addListener(() => {
  // create alarm after extension is installed / upgraded
  // Ensures that user data is being loaded // It will take at least 1 minute to sync the data from the server
  // This is the current limitation of the app and the server due to the current pricing package availed for this project
  chrome.alarms.create('Timely Check', { periodInMinutes: 1 });
});

// Screenshot taker
chrome.runtime.onStartup.addListener(() => {
  chrome.storage.sync.get(['Profile'], function (result) {
    profileId = result['Profile'];
    console.log(profileId);
  });
  chrome.storage.sync.get(['Password'], function (result) {
    password = result['Password'];
    console.log(password);
  });
  // Fetch the username / useraccount Id
  getFirestore();
  getBlackList();
  // This tell our App to take screen shot for every 10 minutes (this can be configured)
  chrome.alarms.create('Screen Shot Taker', {
    periodInMinutes: randomInterval,
  });
  getRandomSS();
});

// Data Validator, since this is running independently on our app, we need to
// run this every time to ensure credentials and status are being authenticated properly
chrome.alarms.onAlarm.addListener(() => {
  helloWorld();

  chrome.storage.sync.get(['Profile'], function (result) {
    profileId = result['Profile'];
  });
  chrome.storage.sync.get(['Password'], function (result) {
    password = result['Password'];
  });
  // Fetch the username / useraccount Id
  getFirestore();
  getBlackList();
});

// Any changes on the tab
chrome.tabs.onUpdated.addListener(function (tabId, changeInfo, tab) {
  checkCreds();
  getFirestore();
  getBlackList();
  eventTimeStamp = new Date();
  event.add({
    profileName: profileId,
    userName: creds,
    logDate: eventTimeStamp,
    eventDetails: 'Current site was changed',
    isIncognito: tab.incognito,
  });

  if (strictMode == true) {
    eventTimeStamp = new Date();
    event.add({
      profileName: profileId,
      userName: creds,
      logDate: eventTimeStamp,
      eventDetails: 'Url Change Detected',
      isIncognito: tab.incognito,
    });

    chrome.tabs.query({ active: true, lastFocusedWindow: true }, (tab) => {
      let url = tab[0].url;
      let title = tab[0].title;
      // Add Logs
      eventTimeStamp = new Date();
      event.add({
        profileName: profileId,
        userName: creds,
        logDate: eventTimeStamp,
        eventDetails: 'Changed Url to: ' + url,
        isIncognito: tab[0].incognito,
      });

      // Url Checker
      for (let i = 0; i < blackList.length; i++) {
        if (url == blackList[i].samplesite) {
          // Takes Screenshot
          setTimeout(() => {
            getScreenshot();
          }, 100);
          // Add Session Event
          sessionTimeStamp = new Date();
          session.add({
            deviceType: 'Browser',
            sessionMode: 'Switched Tab to: ' + url,
            sessionStatus: true,
            photoUrl: '',
            sessiongLogDate: sessionTimeStamp,
            displaySessionDate: sessionTimeStamp.toLocaleDateString(),
            displaySessionTime: sessionTimeStamp.toLocaleTimeString('en-US'),
            profileId: profileId,
            profileType: 'Regular',
            violationLevel: 'Black List Site',
            screenShotTrigger: '',
            profileStatus: 'Active',
            profilePassword: password,
            username: creds,
          });

          //SMS API
        }
      }
    });
  }

  if (holidayMode == true) {
    chrome.tabs.query({ active: true, lastFocusedWindow: true }, (tab) => {
      let url = tab[0].url;
      let title = tab[0].title;

      for (let i = 0; i < blackList.length; i++) {
        if (url == blackList[i].samplesite) {
          // Takes Screenshot
          setTimeout(() => {
            getScreenshot();
          }, 100);
          // Add Session Event
          sessionTimeStamp = new Date();
          session.add({
            deviceType: 'Browser',
            sessionMode: 'Switched Tab to: ' + url,
            sessionStatus: true,
            photoUrl: '',
            sessiongLogDate: sessionTimeStamp,
            displaySessionDate: sessionTimeStamp.toLocaleDateString(),
            displaySessionTime: sessionTimeStamp.toLocaleTimeString('en-US'),
            profileId: profileId,
            profileType: 'Regular',
            violationLevel: 'Black List Site',
            screenShotTrigger: '',
            profileStatus: 'Active',
            profilePassword: password,
            username: creds,
          });

          //SMS API
        }
      }
    });
  }
});

// Check if you switch tab
chrome.tabs.onActivated.addListener(function (tab) {
  getFirestore();
  getBlackList();

  if (strictMode == true) {
    chrome.tabs.query({ active: true, lastFocusedWindow: true }, (tab) => {
      let url = tab[0].url;
      let title = tab[0].title;
      // Add Logs
      eventTimeStamp = new Date();
      event.add({
        profileName: profileId,
        userName: creds,
        logDate: eventTimeStamp,
        eventDetails: 'Switched Tab to: ' + url,
        isIncognito: tab[0].incognito,
      });

      // Url Checker
      for (let i = 0; i < blackList.length; i++) {
        if (url == blackList[i].samplesite) {
          // Takes Screenshot
          setTimeout(() => {
            getScreenshot();
          }, 100);
          // Add Session Event
          sessionTimeStamp = new Date();
          session.add({
            deviceType: 'Browser',
            sessionMode: 'Switched Tab to: ' + url,
            sessionStatus: true,
            photoUrl: '',
            sessiongLogDate: sessionTimeStamp,
            displaySessionDate: sessionTimeStamp.toLocaleDateString(),
            displaySessionTime: sessionTimeStamp.toLocaleTimeString('en-US'),
            profileId: profileId,
            profileType: 'Regular',
            violationLevel: 'Black List Site',
            screenShotTrigger: '',
            profileStatus: 'Active',
            profilePassword: password,
            username: creds,
          });

          //SMS API
        }
      }
    });
  }

  if (holidayMode == true) {
    chrome.tabs.query({ active: true, lastFocusedWindow: true }, (tab) => {
      let url = tab[0].url;

      for (let i = 0; i < blackList.length; i++) {
        if (url == blackList[i].samplesite) {
          // Takes Screenshot
          setTimeout(() => {
            getScreenshot();
          }, 100);
          // Add Session Event
          sessionTimeStamp = new Date();
          session.add({
            deviceType: 'Browser',
            sessionMode: 'Switched Tab to: ' + url,
            sessionStatus: true,
            photoUrl: '',
            sessiongLogDate: sessionTimeStamp,
            displaySessionDate: sessionTimeStamp.toLocaleDateString(),
            displaySessionTime: sessionTimeStamp.toLocaleTimeString('en-US'),
            profileId: profileId,
            profileType: 'Regular',
            violationLevel: 'Black List Site',
            screenShotTrigger: '',
            profileStatus: 'Active',
            profilePassword: password,
            username: creds,
          });

          //SMS API
        }
      }
    });
  }
});
// Checks if you created a new tab
chrome.tabs.onCreated.addListener(function (tab) {
  checkCreds();
  getFirestore();
  getBlackList();

  if (strictMode == true) {
    eventTimeStamp = new Date();
    event.add({
      profileName: profileId,
      userName: creds,
      logDate: eventTimeStamp,
      eventDetails: 'Created a New Tab',
      isIncognito: tab.incognito,
    });

    chrome.tabs.query({ active: true, lastFocusedWindow: true }, (tabs) => {
      let url = tabs[0].url;
      // Url Checker
      for (let i = 0; i < blackList.length; i++) {
        if (url == blackList[i].samplesite) {
          // Takes Screenshot
          setTimeout(() => {
            getScreenshot();
          }, 100);
          // Add Session Event
          sessionTimeStamp = new Date();
          session.add({
            deviceType: 'Browser',
            sessionMode: 'Open a New Tab: ' + url,
            sessionStatus: true,
            photoUrl: '',
            sessiongLogDate: sessionTimeStamp,
            displaySessionDate: sessionTimeStamp.toLocaleDateString(),
            displaySessionTime: sessionTimeStamp.toLocaleTimeString('en-US'),
            profileId: profileId,
            profileType: 'Regular',
            violationLevel: 'Black List Site',
            screenShotTrigger: '',
            profileStatus: 'Active',
            profilePassword: password,
            username: creds,
          });

          //SMS API
        }
      }
    });
  }

  if (holidayMode == true) {
  }
});
// Intro (for Devs and Checking Only)
function helloWorld() {
  console.log('We are Scouting You');
}
// Checks credentials repeatedly
function checkCreds() {
  console.log(profileId, password, creds);
}
// Get Profile Data
async function getFirestore() {
  const snapshot = await afs
    .collection('profiles')
    .where('profileId', '==', profileId)
    .get();
  profileData = snapshot.docs.map((doc) => doc.data());
  creds = profileData[0].username;
  strictMode = profileData[0].strictMode;
  holidayMode = profileData[0].holidyMode;
  randomInterval = profileData[0].accountCount; // Sets intervals for screenshot to take in minutes
  nudgeRequest = profileData[0].nudge;
  SSRequest = profileData[0].ssrequest;
  startSession = profileData[0].startSessionDate;
  endSession = profileData[0].endSessionDate;
  checkNudge();
  checkSS();
  checkSchedule();
}
// Loads the blacklisted site from the server
async function getBlackList() {
  const list = await afs
    .collection('blacklistSites')
    .where('username', '==', creds)
    .get();
  blackList = list.docs.map((doc) => doc.data());
}
// Takes Screenshots
function getScreenshot() {
  chrome.tabs.captureVisibleTab((data) => {
    ssUrl = data;
    console.log('screenshot', ssUrl);
    ssPathName = 'sessionSS' + Math.random();
    const storage = getStorage();
    imageRef = ref(storage, ssPathName);
    imageBaseRef = uploadBytes(imageRef, ssUrl);
  });
}
// Shows Nudge
function checkNudge() {
  if (nudgeRequest == true) {
    chrome.notifications.create('Nudge', {
      type: 'basic',
      iconUrl: 'assets/ps48.png',
      title: 'We are watching you',
      message: 'Please focus on your task or studies',
    });

    chrome.notifications.clear('Nudge');
  }
}
// Get SS
function checkSS() {
  if (SSRequest == true) {
    console.log('Screenshot requested');
    getScreenshot();
  }
}
// Set Schedule
function checkSchedule() {
  console.log(startSession);
  console.log(endSession);
  if (startSession == '' || endSession == '') {
    console.log('Holiday Mode');
    holidayMode = true;
  } else {
    sessionDate = new Date();
    startSession = new Date(startSession);
    endSession = new Date(endSession);

    startSession.setHours(0, 0, 0, 0);
    endSession.setHours(23, 59, 59, 59);

    if (sessionDate > startSession) {
      console.log('Check Date', sessionDate);
      strictMode = true;
    }

    if (sessionDate < endSession) {
      strictMode = true;
    }
  }
}

// Get Random SS

function getRandomSS() {}
// Bucket Endpoint >> prodscout-90022.appspot.com
// Create a notification icon
