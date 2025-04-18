import { useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { login } from "./authSlice";

// Login form to authenticate user
const Login = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { user, error, loading } = useSelector((state) => state.auth);
  
  const onSubmit = (data) => {
    dispatch(login(data));
  };

  useEffect(() => {
    if (user && user.token) {
      navigate("/");
    }
  }, [user, navigate]);

  return (
    <div className="max-w-md mx-auto p-4 bg-white shadow rounded mt-8">
      <h2 className="text-2xl font-bold mb-4">Login</h2>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        <input
          placeholder="Email"
          type="email"
          {...register("email", { required: "Email is required" })}
          className="w-full border px-3 py-2 rounded"
        />
        {errors.email && (
          <p className="text-red-600 text-sm">{errors.email.message}</p>
        )}

        <input
          placeholder="Password"
          type="password"
          {...register("password", { required: "Password is required" })}
          className="w-full border px-3 py-2 rounded"
        />
        {errors.password && (
          <p className="text-red-600 text-sm">{errors.password.message}</p>
        )}

        {error && <p className="text-red-600 text-sm">{error}</p>}

        <button
          type="submit"
          className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700 transition"
          disabled={loading}
        >
          {loading ? "Logging in..." : "Login"}
        </button>
      </form>
      {/* <p className="text-sm mt-2">
        Don't have an account?{" "}
        <span
          className="text-blue-600 cursor-pointer hover:underline"
          onClick={() => navigate("/register")}
        >
          Register
        </span>
      </p> */}
    </div>
  );
};

export default Login;
