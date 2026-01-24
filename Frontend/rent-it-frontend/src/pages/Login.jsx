import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";

import { loginUser } from "../services/authService";
import { loginSuccess } from "../redux/authSlice";

function Login() {
  // ---------- State ----------
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");

  const navigate = useNavigate();
  const dispatch = useDispatch();

  // ---------- Handle Login ----------
  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    try {
      // Call login API
      const response = await loginUser(email, password);

      // Normalize role
      const role = response.data.role
        .replace("ROLE_", "")
        .toUpperCase();

      // ✅ Save to Redux
      dispatch(
        loginSuccess({
          token: response.data.token,
          role: role,
          userId: response.data.userId,
        })
      );

      // ✅ Persist to localStorage
      localStorage.setItem("token", response.data.token);
      localStorage.setItem("role", role);
      localStorage.setItem("userId", response.data.userId);

      // Redirect user based on role
      switch (role) {
        case "ADMIN":
          navigate("/admin");
          break;
        case "CUSTOMER":
          navigate("/customer");
          break;
        case "OWNER":
          navigate("/owner");
          break;
        default:
          navigate("/unauthorized");
      }
    } catch (err) {
      setError("Invalid email or password");
    }
  };

  // ---------- UI ----------
  return (
    <div className="container d-flex justify-content-center align-items-center vh-100">
      <div className="card p-4 shadow" style={{ width: "350px" }}>
        <h3 className="text-center mb-3">Login</h3>

        {error && <div className="alert alert-danger">{error}</div>}

        <form onSubmit={handleSubmit}>
          {/* Email */}
          <div className="mb-3">
            <label className="form-label">Email</label>
            <input
              type="email"
              className="form-control"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>

          {/* Password */}
          <div className="mb-3">
            <label className="form-label">Password</label>
            <div className="input-group">
              <input
                type={showPassword ? "text" : "password"}
                className="form-control"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
              <button
                type="button"
                className="btn btn-outline-secondary"
                onClick={() => setShowPassword(!showPassword)}
              >
                {showPassword ? "Hide" : "Show"}
              </button>
            </div>
          </div>

          {/* Submit */}
          <button type="submit" className="btn btn-dark w-100">
            Login
          </button>
        </form>
      </div>
    </div>
  );
}

export default Login;
