import { Routes, Route } from "react-router-dom";
import Layout from "./components/Layout";
import Public from "./components/publicPage/Public";
import DashboardLayout from "./components/DashboardLayout";
import Welcome from "./features/auth/Welcome";

function App() {
  return (
    //Public routes
    <Routes>
      <Route path="/" element={<Layout />}>
        {/*index is default of the parent (Layout). So when the path is / index gets rendered */}
        <Route index element={<Public />} />
      </Route>

      {/*Protected Routes */}
      <Route path="dashboard" element={<DashboardLayout />}>
        <Route index element={<Welcome />} />
      </Route>
    </Routes>
  );
}

export default App;
