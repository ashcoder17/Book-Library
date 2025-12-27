import React, { useState } from 'react';

const AddBook = () => {
  const [title, setTitle] = useState('');
  const [author, setAuthor] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    alert(`Book Added: ${title} by ${author}`);
    setTitle('');
    setAuthor('');
  };

  return (
    <div>
      <h2>Add a New Book</h2>
      <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', width: '300px', gap: '10px' }}>
        <input type="text" placeholder="Book Title" value={title} onChange={(e) => setTitle(e.target.value)} required />
        <input type="text" placeholder="Author Name" value={author} onChange={(e) => setAuthor(e.target.value)} required />
        <button type="submit" style={{ cursor: 'pointer', background: '#2c3e50', color: 'white', border: 'none', padding: '10px' }}>
          Save Book
        </button>
      </form>
    </div>
  );
};

export default AddBook;