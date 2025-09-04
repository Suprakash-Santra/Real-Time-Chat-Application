import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import styles from '../styles/FormStyles.module.css';

export default function Register() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleRegister = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch('http://localhost/project/chat-api/register.php', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username, password }),
      });

      const data = await response.json();
      if (data.success) {
        alert('Registration successful! You can now log in.');
        navigate('/');
      } else {
        alert('Registration failed: ' + data.message);
      }
    } catch (error) {
      console.error('Registration error:', error);
    }
  };

  return (
    <div>
    <form onSubmit={handleRegister} className={styles.formContainer}>
      <h2 className={styles.formHeading}>Register</h2>
      <input
        type="text"
        placeholder="Username"
        value={username}
        onChange={(e) => setUsername(e.target.value)}
        className={styles.formInput}
        required
      /><br />
      <input
        type="password"
        placeholder="Password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        className={styles.formInput}
        required
      /><br />
      <button type="submit" className={styles.formButton}>Register</button>
    </form>
    <p className={styles.formLink}>
      Existing User ? <Link to="/" className={styles.registerLink}>Login here</Link>
    </p>
    </div>
  );
}