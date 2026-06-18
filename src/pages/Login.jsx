import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { findUser, setSession } from '../store';

export default function Login() {
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  function handleSubmit(ev) {
    ev.preventDefault();
    const user = findUser(email, password);
    if (!user) {
      setError('No account matches that email and password. Try again or create an account.');
      return;
    }
    setSession(user.email);
    navigate('/profile');
  }

  const isComplete = email && password;

  return (
    <div className="screen">
      <form className="auth" onSubmit={handleSubmit} noValidate>
        <h1>
          Signin to your
          <br />
          PopX account
        </h1>
        <p className="subtitle">Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p>

        <div className="field">
          <label htmlFor="email">Email Address</label>
          <input
            id="email"
            type="email"
            placeholder="Enter email address"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>

        <div className="field">
          <label htmlFor="password">Password</label>
          <input
            id="password"
            type="password"
            placeholder="Enter password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>

        {error && <div className="field-error" style={{ marginBottom: 16 }}>{error}</div>}

        <button className="btn-primary" type="submit" disabled={!isComplete}>
          Login
        </button>
      </form>
    </div>
  );
}
