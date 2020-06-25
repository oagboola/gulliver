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

  googleSignIn() {
    const provider = new this.firebase.app.auth.GoogleAuthProvider();
    this.auth.signInWithPopup(provider)
      .then(resp => {
        console.log('goggle singin succesful', resp)
      })
      .catch(err => {
        console.log('google signin failed'. err)
      })
  }
}

export default Auth;
