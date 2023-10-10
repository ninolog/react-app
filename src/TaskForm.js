import React, { useState, useEffect } from 'react';

// タスクを追加・編集するフォームのコンポーネント
const TaskForm = ({ onAddTask, onUpdateTask, editTask, onFinishEditing }) => {
  const [title, setTitle] = useState('');
  const [date, setDate] = useState('');
  const [comment, setComment] = useState('');
  const [time, setTime] = useState('');

  // 編集モードの場合は、フォームの初期値を設定する
  useEffect(() => {
    if (editTask) {
      setTitle(editTask.title);
      setDate(editTask.date);
      setTime(editTask.time);
      setComment(editTask.comment);
    } else {
      setTitle('');
      setDate('');
      setTime('');
      setComment('');
    }
  }, [editTask]);

  // タスクを追加・編集する
  const handleSubmit = e => {
    e.preventDefault();
    if (title.trim() !== '') {
      if (editTask) {
        // 編集モードの場合
        const updatedTask = { id: editTask.id, title, date, comment, time };
        onUpdateTask(updatedTask);
      } else {
        // 追加モードの場合
        const newTask = { id: Date.now(), title, date, comment, time };
        onAddTask(newTask);
      }
      setTitle('');
      setDate('');
      setComment('');
      setTime('');
      onFinishEditing && onFinishEditing();
    }
  };

  // フォームのレンダリング
  return (
    <form onSubmit={handleSubmit} style={styles.form}>
      <input
        type="date"
        value={date}
        onChange={e => setDate(e.target.value)}
        placeholder="日付"
        style={styles.input}
      />
      <input
        type="time"
        value={time}
        onChange={e => setTime(e.target.value)}
        placeholder="時間"
        style={styles.input}
      />
      <input
        type="text"
        value={title}
        onChange={e => setTitle(e.target.value)}
        placeholder="タスク名"
        style={styles.input}
      />
      <textarea 
        value={comment}
        onChange={e => setComment(e.target.value)}
        placeholder="詳細"
        style={styles.textArea}
      />
      <button type="submit" style={styles.submitButton}>
        {editTask ? '編集しますか？' : 'タスクを追加する'}
      </button>
    </form>
  );
};

const styles = {
  form: {
    display: 'flex',
    flexDirection: 'column',
    marginBottom: '10px',
  },
  input: {
    margin: '10px 0',
    padding: '10px',
    fontSize: '16px',
  },
  textArea: {
    margin: '10px 0',
    padding: '10px',
    fontSize: '16px',
    minHeight: '100px',
  },
  submitButton: {
    padding: '10px',
    fontSize: '16px',
    backgroundColor: '#007BFF',
    color: 'white',
    border: 'none',
    borderRadius: '4px',
    cursor: 'pointer',
    marginTop: '10px',
  },
};

export default TaskForm;
