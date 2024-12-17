import { useState } from "react";

import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Bookshelves from "./components/Bookshelves/Bookshelves";
import Books from "./components/Books/Books";
import Pages from "./components/Pages/Pages";
import PageEditor from "./components/PageEditor/PageEditor";

function App() {
  return (
    <Pages />
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
