import "./style/common.css";
import "./style/reset.css";

import { Routes, Route, Navigate } from "react-router-dom";

import Register from "./pages/register/Register";
import Login from "./pages/login/Login";
import TasksMain from "./components/tasks/tasks-main/TasksMain";
import Header from "./components/header/Header";
import AuthenticatedRoute from "./utils/routes/privateRoute/privateRoute";
import PublicRoute from "./utils/routes/publicRoute/publicRoute";

function App() {
  return (
    <div className="page">
      <Routes>
        <Route element={<AuthenticatedRoute />}>
          <Route path="/tasks" element={<TasksMain />} />
          <Route path="/" element={<Navigate to="/tasks" replace />}/>
        </Route>
        <Route element={<PublicRoute />}>
          <Route path="/register" element={<Register />} />
          <Route path="/login" element={<Login />} />
        </Route>
      </Routes>
    </div>
  );
}

export default App;
