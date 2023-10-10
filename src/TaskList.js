import React, { useState } from "react";
import TaskForm from "./TaskForm";
import { confirmAlert } from "react-confirm-alert";
import Modal from "react-modal";
import "react-confirm-alert/src/react-confirm-alert.css";

// タスクのリストを表示するコンポーネント
const TaskList = ({ tasks, onDeleteTask, onEditTask, onUpdateTask }) => {
  const [editTaskId, setEditTaskId] = useState(null);
  const [modalIsOpen, setModalIsOpen] = useState(false);

  // タスクを編集する
  const handleEditTask = (taskId) => {
    setEditTaskId(taskId);
    setModalIsOpen(true);
  };

  // モーダルを閉じる
  const closeModal = () => {
    setModalIsOpen(false);
    setEditTaskId(null);
  };

  // タスクのレンダリング
  return (
    <ul style={styles.list}>
      {tasks
        .slice()
        .sort((a, b) => {
          const dateDiff = new Date(a.date) - new Date(b.date);
          if (dateDiff !== 0) {
            return dateDiff;
          } else {
            const [aHours, aMinutes] = a.time.split(":");
            const [bHours, bMinutes] = b.time.split(":");
            return aHours * 60 + aMinutes - (bHours * 60 + bMinutes);
          }
        })
        .map((task) => (
          <li key={task.id} style={styles.listItem}>
            <div style={styles.taskContent}>
              {task.date && <p style={styles.taskDate}>{task.date} {task.time}</p>}
              {task.title && <p style={styles.taskTitle}>{task.title}</p>}
              {task.comment && <p style={styles.taskComment} dangerouslySetInnerHTML={{ __html: task.comment.replace(/\n/g, '<br />') }}></p>}
              <div>
                <button
                  onClick={() => handleEditTask(task.id)}
                  style={styles.editButton}
                >
                  編集
                </button>
                <button
                  onClick={() =>
                    confirmAlert({
                      title: "タスクを削除しますか？",
                      message: "",
                      buttons: [
                        {
                          label: "はい",
                          onClick: () => onDeleteTask(task.id),
                        },
                        {
                          label: "いいえ",
                        },
                      ],
                    })
                  }
                  style={styles.deleteButton}
                >
                  削除
                </button>
              </div>
            </div>
            <Modal
              isOpen={modalIsOpen}
              onRequestClose={closeModal}
              style={customStyles}
              contentLabel="タスク編集画面"
            >
              {editTaskId && (
                <TaskForm
                  onUpdateTask={onUpdateTask}
                  editTask={tasks.find((task) => task.id === editTaskId)}
                  isEditing={true}
                  onFinishEditing={closeModal}
                />
              )}
              <button onClick={closeModal} style={styles.closeButton}>
                閉じる
              </button>
            </Modal>
          </li>
        ))}
    </ul>
  );
};

const customStyles = {
  content: {
    top: "50%",
    left: "50%",
    right: "auto",
    bottom: "auto",
    marginRight: "-50%",
    transform: "translate(-50%, -50%)",
  },
};

const styles = {
  list: {
    listStyleType: "none",
    padding: "0",
  },
  listItem: {
    border: "1px solid #CCC",
    padding: "15px",
    marginBottom: "10px",
    borderRadius: "4px",
  },
  taskContent: {
    display: "flex",
    flexDirection: "column",
  },
  taskDate: {
    fontSize: "12px",
    margin: "0",
  },
  taskTitle: {
    fontSize: "20px",
    margin: "10px 0",
  },
  taskComment: {
    fontSize: "16px",
    margin: "10px 0 30px",
  },
  editButton: {
    marginRight: "10px",
    padding: "5px 10px",
    fontSize: "14px",
    backgroundColor: "#007BFF",
    color: "white",
    border: "none",
    borderRadius: "4px",
    cursor: "pointer",
  },
  deleteButton: {
    padding: "5px 10px",
    fontSize: "14px",
    backgroundColor: "#dc3545",
    color: "white",
    border: "none",
    borderRadius: "4px",
    cursor: "pointer",
  },
  closeButton: {
    padding: "5px 10px",
    fontSize: "14px",
    backgroundColor: "#6c757d",
    color: "white",
    border: "none",
    borderRadius: "4px",
    cursor: "pointer",
    marginTop: "10px",
    width: "100%",
  },
};

export default TaskList;
