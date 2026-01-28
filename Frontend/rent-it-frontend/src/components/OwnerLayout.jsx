import { Outlet, Link, useLocation } from "react-router-dom";
import { useSelector } from "react-redux";

function OwnerLayout() {
    const location = useLocation();
    const { userId } = useSelector((state) => state.auth);

    // Helper function to check if link is active
    const isActive = (path) => {
        return location.pathname === path ? "active" : "";
    };

    return (
        <div className="container-fluid">
            <div className="row">
                {/* Sidebar */}
                <nav className="col-md-3 col-lg-2 d-md-block bg-light sidebar vh-100 position-sticky top-0">
                    <div className="position-sticky pt-3">
                        <h5 className="px-3 mb-3 text-primary">Owner Dashboard</h5>
                        <ul className="nav flex-column">
                            <li className="nav-item">
                                <Link
                                    className={`nav-link ${isActive("/owner/vehicles")}`}
                                    to="/owner/vehicles"
                                >
                                    <i className="bi bi-car-front me-2"></i>
                                    My Vehicles
                                </Link>
                            </li>
                            <li className="nav-item">
                                <Link
                                    className={`nav-link ${isActive("/owner/vehicles/add")}`}
                                    to="/owner/vehicles/add"
                                >
                                    <i className="bi bi-plus-circle me-2"></i>
                                    Add Vehicle
                                </Link>
                            </li>
                        </ul>

                        <hr />

                        <div className="px-3">
                            <small className="text-muted">Quick Actions</small>
                            <ul className="nav flex-column mt-2">
                                <li className="nav-item">
                                    <span className="nav-link text-muted">
                                        <i className="bi bi-pencil-square me-2"></i>
                                        Update Vehicle
                                        <br />
                                        <small className="text-muted ms-4">
                                            (Click Edit on any vehicle)
                                        </small>
                                    </span>
                                </li>
                            </ul>
                        </div>

                        <hr />

                        <div className="px-3">
                            <small className="text-muted">User Info</small>
                            <p className="mb-1 mt-2">
                                <small>
                                    <strong>Owner ID:</strong> {userId}
                                </small>
                            </p>
                        </div>
                    </div>
                </nav>

                {/* Main Content */}
                <main className="col-md-9 ms-sm-auto col-lg-10 px-md-4">
                    <Outlet />
                </main>
            </div>
        </div>
    );
}

export default OwnerLayout;
