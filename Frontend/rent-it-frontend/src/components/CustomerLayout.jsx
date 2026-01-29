import { Outlet, Link, useLocation } from "react-router-dom";

function CustomerLayout() {
    const location = useLocation();

    const isActive = (path) => {
        return location.pathname === path ? "active" : "";
    };

    return (
        <div className="d-flex">
            {/* Sidebar */}
            <nav className="bg-dark text-white p-3" style={{ width: "250px", minHeight: "100vh" }}>
                <h4 className="mb-4">Customer Panel</h4>
                <ul className="nav flex-column">
                    <li className="nav-item mb-2">
                        <Link
                            to="/customer"
                            className={`nav-link text-white ${isActive("/customer")}`}
                        >
                            <i className="bi bi-speedometer2 me-2"></i>
                            Dashboard
                        </Link>
                    </li>
                    <li className="nav-item mb-2">
                        <Link
                            to="/customer/vehicles"
                            className={`nav-link text-white ${isActive("/customer/vehicles")}`}
                        >
                            <i className="bi bi-car-front me-2"></i>
                            Browse Vehicles
                        </Link>
                    </li>
                    <li className="nav-item mb-2">
                        <Link
                            to="/customer/bookings"
                            className={`nav-link text-white ${isActive("/customer/bookings")}`}
                        >
                            <i className="bi bi-calendar-check me-2"></i>
                            My Bookings
                        </Link>
                    </li>
                </ul>
            </nav>

            {/* Main Content */}
            <div className="flex-grow-1 p-4" style={{ backgroundColor: "#f8f9fa" }}>
                <Outlet />
            </div>
        </div>
    );
}

export default CustomerLayout;
