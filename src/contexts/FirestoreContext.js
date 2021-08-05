import { createContext, useContext, useState, useEffect } from 'react';
import { firestore } from '../firebase/firebase';
import { useAuth } from './AuthContext';
import { sortDateArray, formateDateArray } from '../functions/sortDateArray';

const FirestoreContext = createContext();

export function useFirestore() {
  return useContext(FirestoreContext);
}

export function FirestoreProvider({ children }) {
  const { currentUser } = useAuth();
  const [allPosts, setAllPosts] = useState([]);
  const [userPersonalData, setUserPersonalData] = useState();

  useEffect(() => {
    firestore.collection('posts').onSnapshot((snapshot) => {
      const nonSortedArray = snapshot.docs.map((doc) => doc.data());
      setAllPosts(
        formateDateArray(
          sortDateArray(nonSortedArray),
          'dddd, MMMM Do YYYY, h:mm a'
        )
      );
    });
  }, []);

  useEffect(() => {
    if (currentUser) {
      getUserPersonalData(currentUser.email);
    }
  }, [currentUser]);

  async function getUserPersonalData(email) {
    setUserPersonalData();
    await firestore
      .collection('users')
      .where('email', '==', email)
      .limit(1)
      .get()
      .then((querySnapshot) => {
        querySnapshot.forEach((doc) => {
          setUserPersonalData(doc.data());
        });
      });
  }

  function clearUserPersonalData() {
    setUserPersonalData();
  }

  async function createUser(user) {
    setUserPersonalData();
    await firestore.collection('users').add({
      nick: user.nick,
      email: user.email,
    });
  }

  function sendPost(data) {
    if (currentUser) {
      firestore.collection('posts').add({
        created: new Date(),
        ...data,
        userId: currentUser.uid,
        nick: userPersonalData.nick,
        likes: 0,
        likers: [],
        coments: {},
      });
    }
  }

  const value = {
    sendPost,
    allPosts,
    createUser,
    userPersonalData,
    getUserPersonalData,
    clearUserPersonalData,
  };

  return (
    <FirestoreContext.Provider value={value}>
      {children}
    </FirestoreContext.Provider>
  );
}
