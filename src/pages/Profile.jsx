import { useEffect, useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { getSession, clearSession, getUsers } from '../store';

const USERS_KEY = 'popx_users';

export default function Profile() {
  const navigate = useNavigate();
  const fileRef = useRef(null);
  const [user, setUser] = useState(null);

  useEffect(() => {
    const session = getSession();
    if (!session) {
      navigate('/login');
      return;
    }
    setUser(session);
  }, [navigate]);

  function handlePhotoChange(ev) {
    const file = ev.target.files?.[0];
    if (!file || !user) return;
    const reader = new FileReader();
    reader.onload = () => {
      const updatedUsers = getUsers().map((u) =>
        u.email.toLowerCase() === user.email.toLowerCase() ? { ...u, photo: reader.result } : u
      );
      localStorage.setItem(USERS_KEY, JSON.stringify(updatedUsers));
      setUser((u) => ({ ...u, photo: reader.result }));
    };
    reader.readAsDataURL(file);
  }

  function handleLogout() {
    clearSession();
    navigate('/login');
  }

  if (!user) return null;

  const initial = user.fullName?.[0]?.toUpperCase() || '?';

  return (
    <div className="screen">
      <div className="profile-header">
        <h2>Account Settings</h2>
      </div>

      <div className="profile-body">
        <div className="profile-top">
          <div className="avatar-wrap">
            {user.photo ? (
              <img src={user.photo} alt="" className="avatar" />
            ) : (
              <div className="avatar-fallback">{initial}</div>
            )}
            <button
              className="avatar-edit"
              type="button"
              aria-label="Change profile photo"
              onClick={() => fileRef.current?.click()}
            >
              <svg viewBox="0 0 24 24"><path d="M3 17.25V21h3.75L17.81 9.94l-3.75-3.75L3 17.25zM20.71 7.04a1 1 0 0 0 0-1.41l-2.34-2.34a1 1 0 0 0-1.41 0l-1.83 1.83 3.75 3.75 1.83-1.83z"/></svg>
            </button>
            <input
              ref={fileRef}
              type="file"
              accept="image/*"
              hidden
              onChange={handlePhotoChange}
            />
          </div>
          <div>
            <div className="profile-name">{user.fullName}</div>
            <div className="profile-email">{user.email}</div>
          </div>
        </div>

        <p className="profile-lorem">
          Lorem Ipsum Dolor Sit Amet, Consetetur Sadipscing Elitr, Sed Diam Nonumy Eirmod Tempor
          Invidunt Ut Labore Et Dolore Magna Aliquyam Erat, Sed Diam
        </p>

        <div className="profile-logout">
          <button type="button" onClick={handleLogout}>Logout</button>
        </div>
      </div>
    </div>
  );
}
