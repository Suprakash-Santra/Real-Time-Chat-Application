import { useState } from 'react';
import styles from '../styles/Chat.module.css';

export default function MessageInput({ onSend }) {
  const [text, setText] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (text.trim()==='') return;
      onSend(text);
      setText('');
  };
  return (
    <form onSubmit={handleSubmit}>
      <input
        type="text"
        value={text}
        onChange={(e) => setText(e.target.value)}
        placeholder="Type a message..."
        className={styles.messageInput}
      />
      <button type="submit" className={styles.sendButton}>Send</button>
    </form>
  );
}