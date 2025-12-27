// src/App.js
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/common/Navbar';
import Home from './pages/Home';
import AllBooks from './pages/AllBooks';
// Import other pages...

function App() {
  return (
    <Router>
      <Navbar />
      <div style={{ padding: '20px' }}>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/all-books" element={<AllBooks />} />
          <Route path="/add-book" element={<h2>Add a New Book Form</h2>} />
          <Route path="/book/:id" element={<h2>Book Details (Params)</h2>} />
          <Route path="/about" element={<h2>About This Library</h2>} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;