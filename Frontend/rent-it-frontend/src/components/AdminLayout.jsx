import { Outlet, Link, useLocation } from "react-router-dom";
import { useSelector } from "react-redux";

function AdminLayout() {
    const location = useLocation();
    const { userId } = useSelector((state) => state.auth);

    // Helper function to check if link is active
    const isActive = (path) => {
        return location.pathname === path ? "active" : "";
    };

    return (
        <div className="container-fluid">
            <div className="row">
                {/* Vertical Sidebar */}
                <nav className="col-md-3 col-lg-2 d-md-block bg-dark text-white sidebar vh-100 position-sticky top-0">
                    <div className="position-sticky pt-3">
                        <h5 className="px-3 mb-3 text-warning">
                            <i className="bi bi-shield-check me-2"></i>
                            Admin Panel
                        </h5>

                        <hr className="text-white" />

                        {/* User Management Section */}
                        <div className="px-3 mb-2">
                            <small className="text-muted">USER MANAGEMENT</small>
                        </div>
                        <ul className="nav flex-column">
                            <li className="nav-item">
                                <Link
                                    className={`nav-link text-white ${isActive("/admin/users/customers")}`}
                                    to="/admin/users/customers"
                                >
                                    <i className="bi bi-people me-2"></i>
                                    Customers
                                </Link>
                            </li>
                            <li className="nav-item">
                                <Link
                                    className={`nav-link text-white ${isActive("/admin/users/owners")}`}
                                    to="/admin/users/owners"
                                >
                                    <i className="bi bi-person-badge me-2"></i>
                                    Owners
                                </Link>
                            </li>
                        </ul>

                        <hr className="text-white" />

                        {/* Vehicle Management Section */}
                        <div className="px-3 mb-2">
                            <small className="text-muted">VEHICLE MANAGEMENT</small>
                        </div>
                        <ul className="nav flex-column">
                            <li className="nav-item">
                                <Link
                                    className={`nav-link text-white ${isActive("/admin/vehicles")}`}
                                    to="/admin/vehicles"
                                >
                                    <i className="bi bi-car-front-fill me-2"></i>
                                    All Vehicles
                                </Link>
                            </li>
                        </ul>

                        <hr className="text-white" />

                        {/* Dashboard Link */}
                        <ul className="nav flex-column">
                            <li className="nav-item">
                                <Link
                                    className={`nav-link text-white ${isActive("/admin")}`}
                                    to="/admin"
                                >
                                    <i className="bi bi-speedometer2 me-2"></i>
                                    Dashboard
                                </Link>
                            </li>
                        </ul>

                        <hr className="text-white" />

                        {/* Admin Info */}
                        <div className="px-3">
                            <small className="text-muted">ADMIN INFO</small>
                            <p className="mb-1 mt-2">
                                <small className="text-white">
                                    <strong>Admin ID:</strong> {userId}
                                </small>
                            </p>
                        </div>
                    </div>
                </nav>

                {/* Main Content */}
                <main className="col-md-9 ms-sm-auto col-lg-10 px-md-4 py-4">
                    <Outlet />
                </main>
            </div>
        </div>
    );
}

export default AdminLayout;
