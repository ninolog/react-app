import React, { useEffect, useState } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Modal from 'react-modal';
import TaskList from './TaskList';
import TaskForm from './TaskForm';
import Header from './Header';
import About from './About';

// モーダルのスタイル
Modal.setAppElement('#root');

// アプリのメインコンポーネント
const App = () => {
  const [tasks, setTasks] = useState([]);

  // アプリが最初にレンダリングされた時に、ローカルストレージからタスクを取り出す
  useEffect(() => {
    const storedTasks = localStorage.getItem('tasks');
    if (storedTasks) {
      setTasks(JSON.parse(storedTasks));
    }
  }, []);

  // タスクが更新されたときに、新しいタスクリストをローカルストレージに保存する
  useEffect(() => {
    localStorage.setItem('tasks', JSON.stringify(tasks));
  }, [tasks]);

  // 編集中のタスクを管理する
  const [editTask, setEditTask] = useState(null);

  // タスクを追加する
  const handleAddTask = newTask => {
    setTasks([...tasks, newTask]);
  };

  // タスクを削除する
  const handleDeleteTask = taskId => {
    setTasks(tasks.filter(task => task.id !== taskId));
  };

  // タスクを編集する
  const handleEditTask = task => {
    setEditTask(task);
  };

  // タスクを更新する
  const handleUpdateTask = updatedTask => {
    setTasks(tasks.map(task => (task.id === updatedTask.id ? updatedTask : task)));
    setEditTask(null);
  };

  // ルーティングの設定
  return (
    <Router basename="/">
      <div style={styles.container}>
        <Header />
        <Routes>
          <Route path="/" element={ <div> 
            <TaskForm 
              onAddTask={handleAddTask} 
              onUpdateTask={handleUpdateTask} 
              editTask={editTask} 
            />
            <TaskList 
              tasks={tasks} 
              onDeleteTask={handleDeleteTask} 
              onEditTask={handleEditTask} 
              onUpdateTask={handleUpdateTask} 
            />
          </div> } />
          <Route path="/about" element={ <About /> } />
        </Routes>
      </div>
    </Router>
  );
};

const styles = {
  container: {
    width: '600px',
    margin: '0 auto',
    backgroundColor: '#f7f7f7',
    padding: '30px',
    borderRadius: '8px',
  },
  header: {
    textAlign: 'center',
    marginBottom: '30px',
  },
};

export default App;
