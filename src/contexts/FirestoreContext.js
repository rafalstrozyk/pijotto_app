import { createContext, useContext, useState, useEffect } from 'react';
import { firestore } from '../firebase/firebase';

const FirestoreContext = createContext();

export function useFirestore() {
  return useContext(FirestoreContext);
}

export function FirestoreProvider({ children }) {
  const [allPosts, setAllPosts] = useState([]);

  async function getData() {
    await firestore
      .collection('posts')
      .limit(25)
      .onSnapshot((snapshot) => {
        setAllPosts([]);
        const newArray = [];
        snapshot.forEach((doc) => {
          newArray.push({ ...doc.data(), id: doc.id });
        });
        setAllPosts(newArray);
      });
  }

  function sendPost(data, idUser) {
    firestore.collection('posts').add({
      created: new Date(),
      ...data,
      idUser,
    });
  }

  const value = {
    getData,
    sendPost,
    allPosts,
  };

  return (
    <FirestoreContext.Provider value={value}>
      {children}
    </FirestoreContext.Provider>
  );
}
