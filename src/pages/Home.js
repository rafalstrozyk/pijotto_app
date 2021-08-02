import { useState, useEffect } from 'react';
import { useAuth } from '../contexts/AuthContext';
import { useFirestore } from '../contexts/FirestoreContext';
import NewPostForm from '../components/inputs/NewPostForm';

export default function Home() {
  const { logout, currentUser } = useAuth();
  const { getData, allPosts } = useFirestore();

  function handleTest() {
    getData();
  }
  function handleLogout() {
    logout();
  }
  return (
    <div>
      <h1>Home</h1>
      {console.log(JSON.stringify(currentUser.uid))}
      <button onClick={handleTest}>Test</button>
      <button onClick={handleLogout}>Logout</button>
      <NewPostForm />
      {allPosts.length > 0 &&
        allPosts.map((item) => <p key={item.id}>{item.id}</p>)}
    </div>
  );
}
