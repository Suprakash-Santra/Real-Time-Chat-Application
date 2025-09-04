import React, { useEffect, useState } from 'react';
import MessageList from '../components/MessageList';
import MessageInput from '../components/MessageInput';
import { useNavigate } from 'react-router-dom';
import styles from '../styles/Chat.module.css';

export default function Chat() {
  const [messages, setMessages] = useState([]);
  const [room, setRoom] = useState('alpha room');
  const [username, setUsername] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    const storedUsername = localStorage.getItem('username');
    if (storedUsername) {
      setUsername(storedUsername);
    } else {
      navigate('/');
    }
  }, [navigate]);

  useEffect(() => {
    const interval = setInterval(() => {
      fetch(`http://localhost/project/chat-api/get-messages.php?room=${room}`)
        .then((res) => res.json())
        .then((data) => setMessages(data))
        .catch((error) => console.error('Error fetching messages:', error));
    }, 1000);
    return () => clearInterval(interval);
  }, [room]);

  const sendMessage = (text) => {
    fetch('http://localhost/project/chat-api/send-messages.php', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ text, username, room }),
    });
  };

  const handleLogout = async () => {
    await fetch('http://localhost/project/chat-api/logout.php', {
      method: 'POST',
    });
    localStorage.removeItem('username');
    navigate('/');
  };

  return (
    <div className={styles.chatContainer}>
      <div className={styles.header}>
        <h2>Chatting Buddies</h2>
        <button onClick={handleLogout} className={styles.logoutButton}>Logout</button>
      </div>
      <h2 className={styles.welcome}>Welcome {username}</h2>
      <select
        onChange={(e) => setRoom(e.target.value)}
        value={room}
        className={styles.roomSelector}>
        <option value="alpha room">Alpha Room</option>
        <option value="beta room">Beta Room</option>
        <option value="gamma room">Gamma Room</option>
      </select>
      <div className={styles.messageList}>
        <MessageList messages={messages} />
      </div>
      <div className={styles.messageInputContainer}>
        <MessageInput onSend={sendMessage} />
      </div>
    </div>
  );
}