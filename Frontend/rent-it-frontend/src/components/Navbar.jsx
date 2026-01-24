import { Link, useNavigate } from "react-router-dom";
import "./Navbar.css";

function Navbar() {
  const navigate = useNavigate();

  const token = localStorage.getItem("token");
  const role = localStorage.getItem("role")
    ?.replace("ROLE_", "")
    .toUpperCase();

  const handleLogout = () => {
    localStorage.clear();
    navigate("/login");
  };

  return (
    <div className="sidebar">
      <h4 className="sidebar-logo">Rent-It</h4>

      <ul className="sidebar-menu">
        {/* Home */}
        <li>
          <Link to="/">Home</Link>
        </li>

        {/* ADMIN */}
        {token && role === "ADMIN" && (
          <li>
            <Link to="/admin">Admin Dashboard</Link>
          </li>
        )}

        {/* CUSTOMER */}
        {token && role === "CUSTOMER" && (
          <li>
            <Link to="/customer">Customer Dashboard</Link>
          </li>
        )}

        {/* OWNER */}
        {token && role === "OWNER" && (
          <li>
            <Link to="/owner">Owner Dashboard</Link>
          </li>
        )}

        {/* NOT LOGGED IN */}
        {!token && (
          <>
            <li>
              <Link to="/login">Login</Link>
            </li>
            <li>
              <Link to="/register">Register</Link>
            </li>
          </>
        )}

        {/* LOGGED IN */}
        {token && (
          <li>
            <button className="logout-btn" onClick={handleLogout}>
              Logout
            </button>
          </li>
        )}
      </ul>
    </div>
  );
}

export default Navbar;
