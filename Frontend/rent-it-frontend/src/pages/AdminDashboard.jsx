import { Link } from "react-router-dom";

function AdminDashboard() {
  return (
    <div>
      <h1 className="mb-4">
        <i className="bi bi-speedometer2 me-2"></i>
        Admin Dashboard
      </h1>

      <div className="row g-4">
        {/* User Management Card */}
        <div className="col-md-6">
          <div className="card shadow-sm h-100">
            <div className="card-body">
              <h5 className="card-title">
                <i className="bi bi-people me-2 text-primary"></i>
                User Management
              </h5>
              <p className="card-text text-muted">
                Manage customers and owners. Approve or reject user registrations.
              </p>
              <div className="d-grid gap-2">
                <Link to="/admin/users/customers" className="btn btn-outline-primary">
                  <i className="bi bi-people me-2"></i>
                  View Customers
                </Link>
                <Link to="/admin/users/owners" className="btn btn-outline-primary">
                  <i className="bi bi-person-badge me-2"></i>
                  View Owners
                </Link>
              </div>
            </div>
          </div>
        </div>

        {/* Vehicle Management Card */}
        <div className="col-md-6">
          <div className="card shadow-sm h-100">
            <div className="card-body">
              <h5 className="card-title">
                <i className="bi bi-car-front-fill me-2 text-success"></i>
                Vehicle Management
              </h5>
              <p className="card-text text-muted">
                View all vehicles and block/unblock them as needed.
              </p>
              <div className="d-grid gap-2">
                <Link to="/admin/vehicles" className="btn btn-outline-success">
                  <i className="bi bi-car-front-fill me-2"></i>
                  All Vehicles
                </Link>
              </div>
            </div>
          </div>
        </div>

        {/* Quick Stats */}
        <div className="col-12">
          <div className="card shadow-sm bg-light">
            <div className="card-body">
              <h5 className="card-title">
                <i className="bi bi-info-circle me-2"></i>
                Admin Panel Features
              </h5>
              <ul className="list-unstyled mb-0">
                <li className="mb-2">
                  <i className="bi bi-check-circle text-success me-2"></i>
                  Approve or reject customer and owner registrations
                </li>
                <li className="mb-2">
                  <i className="bi bi-check-circle text-success me-2"></i>
                  View all users with complete details
                </li>
                <li className="mb-2">
                  <i className="bi bi-check-circle text-success me-2"></i>
                  Manage all vehicles in the system
                </li>
                <li className="mb-0">
                  <i className="bi bi-check-circle text-success me-2"></i>
                  Block or unblock vehicles
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default AdminDashboard;