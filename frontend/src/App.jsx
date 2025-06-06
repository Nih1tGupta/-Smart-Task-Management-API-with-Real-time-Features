import React, { useContext } from 'react'
import { BrowserRouter as Router, Routes, Route, Outlet, Navigate, useParams } from "react-router-dom";
import { AnimatePresence } from 'framer-motion';

import Dashboard from './pages/Admin/Dashboard.jsx';
import Login from './pages/Auth/Login.jsx';
import SignUp from './pages/Auth/SignUp.jsx';
import ManageTasks from './pages/Admin/ManageTasks.jsx';
import CreateTask from './pages/Admin/CreateTask.jsx';
import UserDashboard from './pages/User/UserDashboard.jsx';
import MyTasks from './pages/User/MyTasks.jsx';
import ViewTaskDetails from './pages/User/ViewTaskDetails.jsx';

import PrivateRoute from './routes/PrivateRoutes.jsx';
import UserProvider, { UserContext } from './context/userContext.jsx';
import { Toaster } from 'react-hot-toast';
import Chat from './pages/Common/Chat.jsx';
import Footer from './components/Footer.jsx';



const App = () => {
  return (
    <UserProvider>
      <div>
        <Router>
          <Routes>
            <Route path='/login' element={<Login />} />
            <Route path='/signup' element={<SignUp />} />

            {/* Admin Routes */}
            <Route element={<PrivateRoute allowedRoles={["admin"]} />}>
              <Route path='/admin/dashboard' element={<Dashboard />} />
              <Route path='/admin/tasks' element={<ManageTasks />} />
              <Route path='/admin/create-task' element={<CreateTask />} />
              <Route path='/admin/messages' element={<Chat />} />

            </Route>

            {/* User Routes */}
            <Route element={<PrivateRoute allowedRoles={["user"]} />}>
              <Route path='/user/dashboard' element={<UserDashboard />} />
              <Route path='/user/tasks' element={<MyTasks />} />
              {/* <Route path="/user/meeting" element={<MeetingPage />} /> */}
              <Route path='/user/task-details/:id' element={<ViewTaskDetails />} />
              <Route path='/user/messages' element={<Chat />} />
          

            </Route>

            {/* Default Route */}
            <Route path='/' element={<Root />} />
          </Routes>
          <AnimatePresence />
        </Router>
      </div>

      <Toaster
        toastOptions={{
          className: "",
          style: { fontSize: "13px" },
        }}
      />
      <Footer />
    </UserProvider>
  );
};

export default App;

const Root = () => {
  const { user, loading } = useContext(UserContext);

  if (loading) return <Outlet />;

  if (!user) {
    return <Navigate to="/login" />;
  }
  return user.role === "admin"
    ? <Navigate to="/admin/dashboard" />
    : <Navigate to="/user/dashboard" />;
};
