class EntriesApi {
  constructor(firebase) {
    this.firebase = firebase;
    this.db = this.firebase.db;
  }

  entries = () => this.db.ref('entries');

  entry = key => this.db.ref(`entries/${key}`);

  createOrUpdate = data => {
    let key = data.id;
    if (!key) {
      key = this.db.ref('entries').push().key;
    }
    this.db.ref(`entries/${key}`).set({
      id: key,
      ...data
    }, (err) => {
      if (err) {
        console.log('error creating note', err);
      } else {
        console.log('note saved successfullly')
      }
    })
  }

  delete = key => {
    return this.db.ref(`entries/${key}`).remove();
  }

}

export default EntriesApi;
