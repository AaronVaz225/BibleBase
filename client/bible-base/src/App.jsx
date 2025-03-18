import { Routes, Route } from "react-router-dom";
import Layout from "./components/Layout";
import Public from "./components/publicPage/Public";
import DashboardLayout from "./components/DashboardLayout";
import Welcome from "./features/auth/Welcome";
import SignUp from "./features/auth/SignUp";
import Login from "./features/auth/Login";
import ProtectedRoute from "./features/auth/ProtectedRoute";
import Bookshelf from "./components/Bookshelf/Bookshelf";

function App() {
  return (
    //Public routes
    <Routes>
      <Route path="/" element={<Layout />}>
        {/*index is default of the parent (Layout). So when the path is / index gets rendered */}
        <Route index element={<Public />} />
        <Route path="signup" element={<SignUp />} />
        <Route path="login" element={<Login />} />
      </Route>

      {/*Protected Routes */}
      <Route element={<ProtectedRoute />}>
        <Route path="dashboard" element={<DashboardLayout />}>
          <Route index element={<Welcome />} />

          {/* Bookshelves (Main Page) */}
          <Route path="bookshelves" element={<Bookshelf />} />
        </Route>
      </Route>
    </Routes>
  );
}

export default App;
