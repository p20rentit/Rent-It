import { Link } from "react-router-dom";

function MyBookings() {
    return (
        <div className="container-fluid">
            <h1 className="mb-4">My Bookings</h1>

            <div className="alert alert-info">
                <h5 className="alert-heading">
                    <i className="bi bi-info-circle me-2"></i>
                    Coming Soon
                </h5>
                <p>
                    This feature is under development. You'll be able to view and manage your bookings here soon!
                </p>
            </div>

            <div className="card">
                <div className="card-body text-center py-5">
                    <i className="bi bi-calendar-x" style={{ fontSize: "4rem", color: "#ccc" }}></i>
                    <h3 className="mt-3 text-muted">No Bookings Yet</h3>
                    <p className="text-muted">Browse vehicles and make your first booking!</p>
                    <Link to="/customer/vehicles" className="btn btn-primary">
                        Browse Vehicles
                    </Link>
                </div>
            </div>
        </div>
    );
}

export default MyBookings;
