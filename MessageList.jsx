import styles from '../styles/Chat.module.css';

export default function MessageList({ messages }) {
  return (
    <div className={styles.message}>
      {messages.map((msg,index) => (
        <div key={index}>
          <strong>{msg.username}: </strong>{msg.text}
        </div>
      ))}
    </div>
  );
}