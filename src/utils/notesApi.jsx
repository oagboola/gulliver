import { db } from './firebaseConfig';

const entriesApi = {
  create: (data) => {\
    const key = db.ref('entries').push().key;
    db.ref(`entries/${key}`).set({
      id: key,
      date: new Date(),
      content: data.entry,
      title: data.title
    }, (err) => {
      if(err) {
        console.log('error creating note', err);
      } else {
        console.log('note saved successfullly')
      }
    })
  },
  list: () => {
    return db.ref('entries').once('value');
  }
};

export default entriesApi;
