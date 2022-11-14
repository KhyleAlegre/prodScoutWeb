///<reference types="chrome"/>
//Imports
import firebase from 'firebase/compat/app';
import 'firebase/storage';
import 'firebase/compat/storage';
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
var screenshot = afs.collection('screenshots');
var gallery = afs.collection('gallery');
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
var screenshotTime: any;

//Load Profile
chrome.runtime.onInstalled.addListener(() => {
  // creates an alarm after extension is installed / upgraded
  // Ensures that user data is being loaded // It will take at least 1 minute to sync the data from the server
  // This is the current limitation of the app and the server due to the current pricing package availed for this project
  // Set an Alarm to get random screenshot for every 15 mins
  chrome.alarms.create('Run Time', { periodInMinutes: 15 });

  setInterval(() => {
    chrome.storage.sync.get(['Profile'], function (result) {
      profileId = result['Profile'];
    });
    chrome.storage.sync.get(['Password'], function (result) {
      password = result['Password'];
    });

    console.log(profileId, password);
    // Fetch the username / useraccount Id
    getFirestore();
    console.log(creds);
    getBlackList();
  }, 3000);
});

// Gets Random Screenshot on Alarm
chrome.alarms.onAlarm.addListener(() => {
  getScreenshot;
});

/*chrome.runtime.onStartup.addListener(() => {
  setInterval(() => {
    chrome.storage.sync.get(['Profile'], function (result) {
      profileId = result['Profile'];
    });
    chrome.storage.sync.get(['Password'], function (result) {
      password = result['Password'];
    });

    console.log(profileId, password);
    // Fetch the username / useraccount Id
    getFirestore();
    getBlackList();
  }, 3000);
}); */

// Detects any changes on the tab
chrome.tabs.onUpdated.addListener(function (tabId, changeInfo, tab) {
  getFirestore();
  getBlackList();
  if (strictMode == true) {
    eventTimeStamp = new Date();
    event.add({
      profileName: profileId,
      userName: creds,
      logDate: eventTimeStamp,
      eventDetails: 'Url Change Detected',
      isIncognito: tab.incognito,
    });
    // Checks Tab Information
    chrome.tabs.query({ active: true, lastFocusedWindow: true }, (tab) => {
      let url = tab[0].url;
      let title = tab[0].title;
      let tbxId = tab[0].id;
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
            sessionMode: 'Changed Tab to: ' + url,
            sessionStatus: true,
            photoUrl: ssUrl,
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

          setTimeout(() => {
            let redirectUrl = { url: 'https://prodscout.vercel.app/#/blocked' };
            chrome.tabs.query({ currentWindow: true, active: true }, () => {
              chrome.tabs.update(tabId, redirectUrl);
            });

            chrome.tabs.update(tabId, {
              url: 'https://prodscout.vercel.app/#/blocked',
            });
          }, 4000);
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
            photoUrl: ssUrl,
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
            photoUrl: ssUrl,
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

//***********FUNCTIONS ***** */

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
    screenshotTime = new Date();
    console.log('screenshot', ssUrl);
    gallery.add({
      profileId: profileId,
      userName: creds,
      ssUrl: ssUrl,
      logDate: screenshotTime,
    });
    //Set Storage for the meantime
    // ssPathName = 'sessionSS' + Math.random();
    //firebase.storage().ref(ssPathName).putString(ssUrl, 'data_url', {
    //contentType: 'image/png',
    //});

    //const storage = getStorage();
    //imageRef = ref(storage).putString();
    //imageBaseRef = uploadBytes(imageRef, ssUrl);
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
      console.log('Strict Mode is in Scheduled');
    }
  }
}
