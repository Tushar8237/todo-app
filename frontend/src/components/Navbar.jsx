// src/components/Navbar.jsx

import { useDispatch, useSelector } from "react-redux";
import { logout } from "../features/auth/authSlice";
import { useNavigate, Link } from "react-router-dom";

// Navbar component that displays app name and logout option when user is logged in

const Navbar = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { user } = useSelector((state) => state.auth);
    // const user = true

    const handleLogout = () => {
        dispatch(logout());
        navigate("/login");
    };

    return (
        <nav className="bg-white shadow-md px-4 py-3 flex justify-between items-center">
            <Link to="/" className="text-xl font-bold text-blue-600">
                ✅ TodoApp
            </Link>

            {user ? (
                <div className="flex gap-4 items-center">
                    <span className="hidden sm:inline text-gray-600">👋 {user.name}</span>
                    <button
                        onClick={handleLogout}
                        className="bg-blue-600 text-white px-4 py-1.5 rounded hover:bg-blue-700 transition text-sm"
                    >
                        Logout
                    </button>
                </div>
            ) : (
                <div className="space-x-2">
                    <Link to="/login" className="text-blue-600 hover:underline">
                        Login
                    </Link>
                    <Link to="/register" className="text-blue-600 hover:underline">
                        Register
                    </Link>
                </div>
            )}
        </nav>
    );
};

export default Navbar;
