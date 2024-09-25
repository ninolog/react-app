import React, { useState } from 'react';
import TaskList from './TaskList';
import TaskForm from './TaskForm';

const App = () => {
  const [tasks, setTasks] = useState([]);
  const [editTask, setEditTask] = useState(null); // 追加: setEditTaskの定義

  const handleAddTask = newTask => {
    setTasks([...tasks, newTask]);
  };

  const handleDeleteTask = taskId => {
    setTasks(tasks.filter(task => task.id !== taskId));
  };

  const handleEditTask = task => {
    setEditTask(task);
  };

  const handleUpdateTask = updatedTask => {
    setTasks(tasks.map(task => (task.id === updatedTask.id ? updatedTask : task)));
    setEditTask(null);
  };

  return (
    <div style={styles.container}>
      <h1 style={styles.header}>タスク管理（React）</h1>
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
    </div>
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
