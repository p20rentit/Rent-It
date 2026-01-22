import { Link, useNavigate } from "react-router-dom";

function Navbar() {

  const navigate = useNavigate();

  const token = localStorage.getItem("token");
  const role = localStorage.getItem("role");

  const handleLogout = () => {
    localStorage.clear();
    navigate("/login");
  };

  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
      <div className="container">
        <Link className="navbar-brand" to="/">Rent-It</Link>

        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarNav"
          aria-controls="navbarNav"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>

        <div className="collapse navbar-collapse" id="navbarNav">
          <ul className="navbar-nav ms-auto">

            {/* Home */}
            <li className="nav-item">
              <Link className="nav-link" to="/">Home</Link>
            </li>

            {/* ADMIN */}
            {token && role === "ADMIN" && (
              <li className="nav-item">
                <Link className="nav-link" to="/admin">Admin</Link>
              </li>
            )}

            {/* OWNER */}
            {token && role === "OWNER" && (
              <li className="nav-item">
                <Link className="nav-link" to="/owner">Owner</Link>
              </li>
            )}

            {/* NOT LOGGED IN */}
            {!token && (
              <>
                <li className="nav-item">
                  <Link className="nav-link" to="/login">Login</Link>
                </li>
                <li className="nav-item">
                  <Link className="nav-link" to="/register">Register</Link>
                </li>
              </>
            )}

            {/* LOGGED IN */}
            {token && (
              <li className="nav-item">
                <button
                  className="btn btn-outline-light ms-2"
                  onClick={handleLogout}
                >
                  Logout
                </button>
              </li>
            )}

          </ul>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
