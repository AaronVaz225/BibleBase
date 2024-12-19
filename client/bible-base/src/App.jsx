import { useState } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import LibraryContainer from "./components/LibraryContainer/LibraryContainer";
import NavBar from "./components/NavBar/NavBar";

function App() {
  return (
    <div>
      <NavBar />
      <LibraryContainer />
    </div>
    // <Router>
    //     <Routes>
    //         <Route path="/" element={<Bookshelves />} />
    //         <Route path="/bookshelf" element={<Books />} />
    //         <Route path="/books/:id" element={<Books />} />
    //         <Route path="/pages/:id" element={<PageEditor />} />
    //     </Routes>
    // </Router>
  );
}

export default App;
