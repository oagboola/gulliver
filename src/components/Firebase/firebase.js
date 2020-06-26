import app from 'firebase/app';
import 'firebase/auth';
import 'firebase/database';


class Firebase {
  constructor() {
    this.config = {
      apiKey: process.env.REACT_APP_API_KEY,
      authDomain: process.env.REACT_APP_AUTH_DOMAIN,
      databaseURL: process.env.REACT_APP_DATABASE_URL
    }
    this.app = app;
    this.app.initializeApp(this.config);
    this.auth = this.app.auth();
    this.db = this.app.database();
  }
}

export default Firebase;
