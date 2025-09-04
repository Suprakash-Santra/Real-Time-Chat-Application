import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import styles from '../styles/FormStyles.module.css';

export default function Login() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch('http://localhost/project/chat-api/login.php', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username, password }),
      });
      
      const data = await response.json();
      if (data.success) {
        localStorage.setItem('username', data.username);
        navigate('/chat');
      } else {
        alert('Login failed: ' + data.message);
      }
    } catch (error) {
      console.error('Login error:', error);
    }
  };

  return (
    <div>
      <form onSubmit={handleLogin} className={styles.formContainer}>
        <h2 className={styles.formHeading}>Login</h2>
        <input
          type="text"
          placeholder="Username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          className={styles.formInput} required
        />
        <br />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className={styles.formInput} required
        />
        <br />
        <button type="submit" className={styles.formButton}>Login</button>
      </form>
      <p className={styles.formLink}>
        New User ? <Link to="/register" className={styles.registerLink}>Register here</Link>
      </p>
    </div>
  );
}