// App.jsx
import { Routes, Route } from "react-router-dom";
import Layout from "./components/Layout";
import Public from "./components/publicPage/Public";
import DashboardLayout from "./components/DashboardLayout";
import Welcome from "./features/auth/Welcome";
import SignUp from "./features/auth/SignUp";
import Login from "./features/auth/Login";
import ProtectedRoute from "./features/auth/ProtectedRoute";
import Book from "./components/Book/Book"; // Bookshelf-level view: shows books and pages
import BookView from "./components/Book/BookView"; // Book-level view: shows pages in a specific book
import Page from "./components/Page/Page"; // WYSIWYG editor

function App() {
  return (
    <Routes>
      {/* Public Routes */}
      <Route path="/" element={<Layout />}>
        <Route index element={<Public />} />
        <Route path="signup" element={<SignUp />} />
        <Route path="login" element={<Login />} />
      </Route>

      {/* Protected Routes */}
      <Route element={<ProtectedRoute />}>
        <Route path="dashboard" element={<DashboardLayout />}>
          <Route index element={<Welcome />} />

          {/* Bookshelves (Main Page) */}
          <Route path="bookshelf/:bookshelfId" element={<Book />} />

          {/* Book-level view (Inside a Bookshelf): Only pages for that book */}
          <Route path="book/:bookId" element={<BookView />} />

          {/* Page-level view: WYSIWYG editor */}
          <Route path="page/:pageId" element={<Page />} />
        </Route>
      </Route>
    </Routes>
  );
}

export default App;
