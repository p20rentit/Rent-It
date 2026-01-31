import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import api from "../../api/axios";

function VehicleList() {
    const [vehicles, setVehicles] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [filter, setFilter] = useState("ALL");

    useEffect(() => {
        fetchVehicles();
    }, []);

    const fetchVehicles = async () => {
        try {
            setLoading(true);
            setError(null);
            console.log("🚀 Frontend: Fetching vehicles from /customer/vehicles");
            const response = await api.get("/customer/vehicles");
            console.log("✅ Frontend: API Response received:", response);
            console.log("✅ Frontend: Data payload:", response.data);

            if (Array.isArray(response.data)) {
                console.log(`✅ Frontend: Loaded ${response.data.length} vehicles`);
                setVehicles(response.data);
            } else {
                console.error("❌ Frontend: Unexpected response format (expected array):", response.data);
                setError("Received invalid data format from server.");
            }
        } catch (err) {
            console.error("❌ Frontend: Error fetching vehicles:", err);
            if (err.response) {
                console.error("❌ frontend: Server responded with:", err.response.status, err.response.data);
            }
            setError("Failed to load vehicles. Please try again later.");
        } finally {
            setLoading(false);
        }
    };

    const filteredVehicles = vehicles.filter((vehicle) => {
        if (filter === "ALL") return true;
        return vehicle.vehicleType === filter;
    });

    if (loading) {
        return (
            <div className="container mt-5 text-center">
                <div className="spinner-border text-primary" role="status">
                    <span className="visually-hidden">Loading...</span>
                </div>
                <p className="mt-3">Loading vehicles...</p>
            </div>
        );
    }

    if (error) {
        return (
            <div className="container mt-5">
                <div className="alert alert-danger" role="alert">
                    <h4 className="alert-heading">Error!</h4>
                    <p>{error}</p>
                    <button className="btn btn-danger" onClick={fetchVehicles}>
                        Try Again
                    </button>
                </div>
            </div>
        );
    }

    return (
        <div className="container-fluid">
            <div className="d-flex justify-content-between align-items-center mb-4">
                <h1>Browse Vehicles</h1>
                <div>
                    <button
                        className={`btn ${filter === "ALL" ? "btn-primary" : "btn-outline-primary"} me-2`}
                        onClick={() => setFilter("ALL")}
                    >
                        All
                    </button>
                    <button
                        className={`btn ${filter === "Bike" ? "btn-primary" : "btn-outline-primary"} me-2`}
                        onClick={() => setFilter("Bike")}
                    >
                        Bikes
                    </button>
                    <button
                        className={`btn ${filter === "Car" ? "btn-primary" : "btn-outline-primary"}`}
                        onClick={() => setFilter("Car")}
                    >
                        Cars
                    </button>
                </div>
            </div>

            {filteredVehicles.length === 0 ? (
                <div className="alert alert-info">
                    <h5 className="alert-heading">No Vehicles Available</h5>
                    <p>
                        {filter === "ALL"
                            ? "There are no active vehicles at the moment. Please check back later."
                            : `No ${filter.toLowerCase()}s are currently available.`}
                    </p>
                </div>
            ) : (
                <div className="row">
                    {filteredVehicles.map((vehicle) => (
                        <div key={vehicle.vehicleId} className="col-md-6 col-lg-4 mb-4">
                            <div className="card h-100 shadow-sm">
                                {/* Vehicle Image */}
                                {vehicle.vehicleImages && vehicle.vehicleImages.length > 0 ? (
                                    <img
                                        src={`data:image/jpeg;base64,${vehicle.vehicleImages.find((img) => img.primary)?.imageData ||
                                            vehicle.vehicleImages[0]?.imageData
                                            }`}
                                        className="card-img-top"
                                        alt={vehicle.vehicleName}
                                        style={{ height: "200px", objectFit: "cover" }}
                                    />
                                ) : (
                                    <div
                                        className="card-img-top bg-secondary d-flex align-items-center justify-content-center"
                                        style={{ height: "200px" }}
                                    >
                                        <i className="bi bi-car-front text-white" style={{ fontSize: "3rem" }}></i>
                                    </div>
                                )}

                                <div className="card-body">
                                    <h5 className="card-title">{vehicle.vehicleName}</h5>
                                    <p className="card-text text-muted small">
                                        {vehicle.brand} - {vehicle.model}
                                    </p>

                                    <div className="mb-2">
                                        <span className="badge bg-primary me-2">{vehicle.vehicleType}</span>
                                        <span className="badge bg-info text-dark me-2">{vehicle.fuelType}</span>
                                        {vehicle.hasAC && <span className="badge bg-success">AC</span>}
                                    </div>

                                    <div className="mb-2">
                                        <strong className="text-success">
                                            ₹{vehicle.pricePerDay} / {vehicle.priceUnit}
                                        </strong>
                                        <br />
                                        <small className="text-muted">Deposit: ₹{vehicle.deposit}</small>
                                    </div>

                                    <p className="card-text small">
                                        <i className="bi bi-geo-alt me-1"></i>
                                        {vehicle.owner?.address?.city}
                                    </p>

                                    <Link
                                        to={`/customer/vehicles/${vehicle.vehicleId}`}
                                        className="btn btn-primary w-100"
                                    >
                                        View Details
                                    </Link>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
}

export default VehicleList;
