import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { UserProvider } from "@/context/UserContext";
import Login from "@/pages/Login";
import Dashboard from "@/pages/Dashboard";
import ProblemsList from "@/pages/ProblemsList";
import ProblemDetail from "@/pages/ProblemDetail";
import Leaderboard from "@/pages/Leaderboard";
import Profile from "@/pages/Profile";

const App = () => (
  <UserProvider>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Navigate to="/login" replace />} />
        <Route path="/login" element={<Login />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/problems" element={<ProblemsList />} />
        <Route path="/problem/:id" element={<ProblemDetail />} />
        <Route path="/leaderboard" element={<Leaderboard />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="*" element={<Navigate to="/login" replace />} />
      </Routes>
    </BrowserRouter>
  </UserProvider>
);

export default App;
