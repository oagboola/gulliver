import { db } from './firebaseConfig';

const entriesApi = {
  create: (data) => {
    let key = data.id
    if(!key) {
      key = db.ref('entries').push().key
    }
    db.ref(`entries/${key}`).set({
      id: key,
      date: new Date(),
      content: data.content,
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
  },
  delete: (key) => {
    return db.ref(`entries/${key}`).remove();
  }
};

export default entriesApi;
