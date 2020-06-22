import app from 'firebase/app';

class firebase {
  constructor() {
    this.config = {
      apiKey: process.env.REACT_APP_API_KEY,
      authDomain: process.env.REACT_APP_AUTH_DOMAIN,
      databaseURL: process.env.REACT_APP_DATABASE_URL
    }
    this.app = app;
    this.app.initializeApp(config);
  }

  db() {
    return this.app.database();
  }

  auth() {
    return this.app.auth
  }
}

export default firebase;
