class EntriesApi {
  constructor(firebase) {
    this.firebase = firebase;
    this.db = this.firebase.db;
    this.ref = this.db.ref('entries');
  }

  entries = (userId) => this.db.ref(`entries/${userId}`);

  entry = (key, userId) => this.db.ref(`entries/${userId}/${key}`);

  createOrUpdate = (data, userId) => {
    let key = data.id;
    if (!key) {
      key = this.db.ref('entries').push().key;
    }
    this.db.ref(`entries/${userId}/${key}`).set({
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

  update = (userId, entryId, data) => {
    this.ref.child(`${userId}/${entryId}`).update(data)
  }

  addImage = (image) => {
    let key
  }

  delete = (key, userId) => {
    return this.db.ref(`entries/${userId}/${key}`).remove();
  }

}

export default EntriesApi;
