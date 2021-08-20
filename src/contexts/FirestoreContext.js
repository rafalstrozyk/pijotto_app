import { createContext, useContext, useState, useEffect } from 'react';
import firebase from 'firebase/app';
import { firestore } from '../firebase/firebase';
import { useAuth } from './AuthContext';
import { sortDateArray, formateDateArray } from '../functions/sortDateArray';
import { booleanArrayFindObject } from '../functions/booleanArrayFind';

const FirestoreContext = createContext();

export function useFirestore() {
  return useContext(FirestoreContext);
}

const postsRef = firestore.collection('posts');
const usersRef = firestore.collection('users');

export function FirestoreProvider({ children }) {
  const { currentUser } = useAuth();
  const [allPosts, setAllPosts] = useState([]);
  const [userPersonalData, setUserPersonalData] = useState();

  // get all posts
  useEffect(() => {
    postsRef.onSnapshot((snapshot) => {
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
    await usersRef
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
    await usersRef.add({
      nick: user.nick,
      email: user.email,
    });
  }

  // ***POSTS***
  function sendPost(data) {
    if (currentUser) {
      postsRef.add({
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

  function editPost(post, newText) {
    if (currentUser && currentUser.uid === post.userId) {
      postsRef
        .doc(post.id)
        .update({
          text: newText,
        })
        .then(() => {
          console.log('successfully edited post!');
        })
        .catch((error) => {
          console.error('Error updating ducument: ', error);
        });
    }
  }

  function deletePost(post) {
    if (currentUser && currentUser.uid === post.userId) {
      postsRef
        .doc(post.id)
        .delete()
        .then(() => {
          console.log('Document succesfully deleted!');
        })
        .catch((error) => {
          console.log('Error removing document: ', error);
        });
    }
  }

  function likePost(post) {
    if (currentUser) {
      if (!booleanArrayFindObject(post.likers, currentUser.uid, 'userId')) {
        postsRef
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
        postsRef
          .doc(post.id)
          .update({
            likes: post.likes - 1,
            likers: firebase.firestore.FieldValue.arrayRemove({
              userId: currentUser.uid,
              nick: userPersonalData.nick,
            }),
          })
          .then(() => {
            console.log('successfully unlike it !!');
          })
          .catch((error) => {
            console.error('Error updating ducument: ', error);
          });
      }
    }
  }

  function sendCommentForPost(data) {
    postsRef
      .doc(data.postId)
      .collection('comments')
      .add({
        created: new Date(),
        content: data.content,
        userId: currentUser.uid,
        nick: userPersonalData.nick,
      })
      .then(() => console.log('succes add coment!!'))
      .catch((error) => console.error('Error add comment: ', error));
  }

  function getCommentsPost(postId, setCommentsFunc) {
    postsRef
      .doc(postId)
      .collection('comments')
      .onSnapshot((snapshot) => {
        const nonSortedArray = snapshot.docs.map((doc) => {
          return { ...doc.data(), id: doc.id };
        });
        setCommentsFunc(
          formateDateArray(
            sortDateArray(nonSortedArray),
            'dddd, MMMM Do YYYY, h:mm a'
          )
        );
      });
  }

  function editCommentsPost(data) {
    if (currentUser.uid === data.comment.userId) {
      postsRef
        .doc(data.postId)
        .collection('comments')
        .doc(data.comment.id)
        .update({ content: data.content })
        .then(() => console.log('succes edit comment!'))
        .catch((error) => console.error('error eddit comment: ', error));
    }
  }

  function deleteCommentPost(postId, comment) {
    if (currentUser.uid === comment.userId) {
      postsRef
        .doc(postId)
        .collection('comments')
        .doc(comment.id)
        .delete()
        .then(() => console.log('success delete comment'))
        .catch((error) => console.error('error on delete comment: ', error));
    }
  }

  const value = {
    editCommentsPost,
    deleteCommentPost,
    getCommentsPost,
    sendCommentForPost,
    deletePost,
    editPost,
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
