///<reference types="chrome"/>
import firebase from "firebase/compat/app";
import { getStorage } from "firebase/storage";
import "firebase/compat/auth";
import "firebase/compat/firestore";
import { ref, getDownloadURL, uploadBytes } from "firebase/storage";

// Database Configurations
var firebaseConfig = {
  apiKey: "AIzaSyCXQUepOnbY0h3_kfUENO1izOF9pbgdPvs",
  authDomain: "prodscout-90022.firebaseapp.com",
  projectId: "prodscout-90022",
  storageBucket: "prodscout-90022.appspot.com",
  messagingSenderId: "420088922412",
  appId: "1:420088922412:web:b90702f51a77e7fdbdec89",
  measurementId: "G-SQVJ1QZ5EQ",
};

// Declarations and Initialization
firebase.initializeApp(firebaseConfig);
var afs = firebase.firestore();

chrome.runtime.onMessage.addListener(function (request, sender, sendReponse) {
  if (request.action === "file") {
    console.log(request.url);
    sendReponse({ urlProcessed: "test" });
    chrome.runtime.sendMessage({ action: "upatedUrl", url: "xxx" });
  }
});
