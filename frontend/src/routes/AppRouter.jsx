import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "../pages/Home";
import Register from "../pages/Register";
import Login from "../features/auth/Login";
import NotFound from "../pages/NotFound";
import ProtectedRoute from "../utils/protectedRoute";
import { useSelector } from "react-redux";
import TasksPage from "../pages/TasksPage";

const AppRouter = () => {
    const { user } = useSelector((state) => state.auth);
    
    return (
        // <BrowserRouter>
            <Routes>
                {/* Public Routes */}
                <Route path="/login" element={<Login />} />
                <Route path="/register" element={<Register />} />

                {/* Protected Route */}

                <Route
                    path="/"
                    element={
                        <ProtectedRoute>
                            <Home />
                            <TasksPage />
                        </ProtectedRoute>
                    }
                />

                {/* <Route path="/tasks" element={user ? <TasksPage /> : <Navigate to="/login" />} /> */}


                {/* {
                    user ? <Route path="/" element={ <Home />} /> : 
                    <Route path="/login" element={<Login />} />
                } */}

                {/* Fallback */}
                <Route path="*" element={<NotFound />} />
            </Routes>
        // </BrowserRouter>
    );
};


export default AppRouter;