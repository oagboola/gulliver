class PlacesApi {
  constructor(firebase) {
    this.firebase = firebase;
    this.db = this.firebase.db;
    this.ref = this.db.ref('places');
  }

  places = (userId) => this.db.ref(`places/${userId}`);

  place = (key, userId) => this.ref.child(`${userId}/${key}`);

  add = (data, userId) => {
    const key = this.ref.push().key;
    this.ref.child(`${userId}/${key}`).set({
      id: key,
      ...data
    }, (err) => {
      if (err) {
        console.log('error adding place ', err);
      } else {
        console.log('place saved successfullly')
      }
    })
  }

  delete = (key, userId) => {
    return this.ref.child(`${userId}/${key}`).remove();
  }

}

export default PlacesApi;
