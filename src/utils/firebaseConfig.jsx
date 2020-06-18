import firebase from 'firebase';

const config = {
  apiKey: "AIzaSyCrrvzpzU9T6UCCnzDyWomlkAmijJpN0SI",
  authDomain: "gulliver-c29d6.firebaseapp.com",
  databaseURL: "https://gulliver-c29d6.firebaseio.com"
};

firebase.initializeApp(config);

export const auth = firebase.auth;
export const db = firebase.database();
