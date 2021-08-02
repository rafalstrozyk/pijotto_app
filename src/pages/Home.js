import { useAuth } from '../contexts/AuthContext';

export default function Home() {
  const { logout } = useAuth();
  function handleLogout() {
    logout();

  }
  return (
    <div>
      <h1>Home</h1>

      <button onClick={handleLogout}>Logout</button>
    </div>
  );
}
