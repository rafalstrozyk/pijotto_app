import { createContext, useContext, useState, useEffect } from 'react';
import firebase from 'firebase/app';
import { firestore } from '../firebase/firebase';
import { useAuth } from './AuthContext';
import { sortDateArray, formateDateArray } from '../functions/sortDateArray';
import {booleanArrayFindObject} from '../functions/booleanArrayFind';

const FirestoreContext = createContext();

export function useFirestore() {
  return useContext(FirestoreContext);
}

export function FirestoreProvider({ children }) {
  const { currentUser } = useAuth();
  const [allPosts, setAllPosts] = useState([]);
  const [userPersonalData, setUserPersonalData] = useState();

  // get all posts
  useEffect(() => {
    firestore.collection('posts').onSnapshot((snapshot) => {
      const nonSortedArray = snapshot.docs.map((doc) => {
        return { ...doc.data(), id: doc.id };
      });
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

  // ***USER***
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

  // ***POSTS***
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

  function likePost(post) {
    if (currentUser) {
      if (!booleanArrayFindObject(post.likers, currentUser.uid, 'userId')) {
        firestore
          .collection('posts')
          .doc(post.id)
          .update({
            likes: post.likes + 1,
            likers: firebase.firestore.FieldValue.arrayUnion({
              userId: currentUser.uid,
              nick: userPersonalData.nick,
            }),
          })
          .then(() => {
            console.log('successfully like it !!');
          })
          .catch((error) => {
            console.error('Error updating ducument: ', error);
          });
      } else {
        console.log('You like it !!');
      }
    }
  }

  const value = {
    likePost,
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
