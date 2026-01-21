import { BrowserRouter, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import Home from "./pages/Home";
import AllBooks from "./pages/AllBooks";
import AddBook from "./pages/AddBooks";
import BookDetails from "./pages/BookDetails";
import About from "./pages/About";
import MyBooks from "./pages/MyBooks";

import { ThemeProvider } from "./components/ThemeContext";

function App() {
  return (
    <ThemeProvider> 
      <BrowserRouter>
        <Navbar />

        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/books" element={<AllBooks />} />
          <Route path="/book/:id" element={<BookDetails />} />
          <Route path="/add" element={<AddBook />} />
          <Route path="/about" element={<About />} />
          <Route path="/mybooks" element={<MyBooks />} />
        </Routes>
      </BrowserRouter>
    </ThemeProvider>
  );
}

export default App;
