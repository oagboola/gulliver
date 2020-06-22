class EntriesApi {
  constructor(firebase) {
    this.firebase = firebase;
    this.db = this.firebase.db;
  }

  create(data) {
    let key = data.id
    if (!key) {
      key = this.db.ref('entries').push().key
    }
    this.db.ref(`entries/${key}`).set({
      id: key,
      date: new Date(),
      content: data.content,
      title: data.title
    }, (err) => {
      if (err) {
        console.log('error creating note', err);
      } else {
        console.log('note saved successfullly')
      }
    })
  }

  list() {
    return this.db.ref('entries').once('value');
  }

  delete(key) {
    return this.db.ref(`entries/${key}`).remove();
  }

}

export default EntriesApi;
