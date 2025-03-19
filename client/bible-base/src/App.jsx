// src/App.jsx
import { Routes, Route } from "react-router-dom";
import Layout from "./components/Layout";
import Public from "./components/publicPage/Public";
import DashboardLayout from "./components/DashboardLayout";
import Welcome from "./features/auth/Welcome";
import SignUp from "./features/auth/SignUp";
import Login from "./features/auth/Login";
import ProtectedRoute from "./features/auth/ProtectedRoute";
import Book from "./components/Book/Book";
// Import the new BookView component:
import BookView from "./components/Book/BookView";
import Page from "./components/Page/Page";

// NEW BIBLE COMPONENT
import BibleView from "./components/Bible/BibleView";

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

          {/* Library Routes */}
          <Route path="bookshelf/:bookshelfId" element={<Book />} />
          {/* Change this route: */}
          <Route path="book/:bookId" element={<BookView />} />
          {/* Add this new route for individual pages: */}
          <Route path="page/:pageId" element={<Page />} />

          {/* Bible Route */}
          <Route path="bible" element={<BibleView />} />
        </Route>
      </Route>
    </Routes>
  );
}

export default App;
