import React from 'react';
import { Link } from 'react-router-dom';

const Header = () => {
  const styles = {
    header: {
      backgroundColor: '#282c34',
      display: 'flex',
      justifyContent: 'space-between',
      padding: '10px 20px',
      color: 'white',
      marginBottom: '20px',
    },
    link: {
      color: 'white',
      textDecoration: 'none',
    },
  };

  return (
    <header style={styles.header}>
      <h1>タスク管理アプリ</h1>
      <nav>
        <Link style={styles.link} to="/">Home</Link>
        <span> | </span>
        <Link style={styles.link} to="/about">About</Link>
      </nav>
    </header>
  );
};

export default Header;
