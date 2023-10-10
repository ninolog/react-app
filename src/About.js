import React from 'react';

// アプリの説明を表示するコンポーネント
const About = () => {
  return (
    <di class="use-container">
      <h1>タスク管理アプリについて</h1>
      <p>タスク管理アプリは、タスクを管理するためのアプリです。</p>
      <div class="use-wrap">
        <h2>【使い方】</h2>
        <ul>
          <li>タスクを追加するには、「タスクを追加する」ボタンを押します。</li>
          <li>タスクを編集するには、タスクのタイトルをクリックします。</li>
          <li>タスクを削除するには、タスクの削除ボタンを押します。</li>
        </ul> 
      </div>
    </di>
  );
};

export default About;
