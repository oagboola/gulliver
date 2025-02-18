class Auth {
  constructor(firebase){
    this.firebase = firebase;
    this.auth = this.firebase.auth;
  }

  localSignup({email, password}) {
    this.auth.createUserWithEmailAndPassword(email, password)
      .then(x => {
        console.log('singup succesful', x)
      })
      .catch(err => {
        console.log('error signing user up', err)
      });
  }

  localSignIn({email, password}){
    this.auth.signInWithEmailAndPassword(email, password)
      .then(x => {
        console.log('log in succesful', x)
      })
      .catch(err => {
        console.log('error siging in user', err)
      })
  }

  signOut(){
    this.auth.signOut()
      .then(() => {
        console.log('user signed out succesfully');
      })
      .catch(err => {
        console.log('error signing user out')
      })
  }

  googleAuth() {
    const provider = new this.firebase.app.auth.GoogleAuthProvider();
    this.auth.signInWithPopup(provider)
      .then(resp => {
        console.log('goggle singin succesful', resp)
      })
      .catch(err => {
        console.log('google signin failed', err)
      })
  }

  facebookAuth() {
    const provider = new this.firebase.app.auth.FacebookAuthProvider();
    this.auth.signInWithPopup(provider)
      .then(deets => {
        console.log('succesfully logged in with facebook', deets)
      })
      .catch(err => {
        console.log('error logging in user with facebook', err)
      });
  }

  currentUser() {
    return this.auth.currentUser;
  }
}

export default Auth;
