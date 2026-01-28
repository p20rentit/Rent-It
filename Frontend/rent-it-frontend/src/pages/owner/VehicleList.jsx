import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { fetchOwnerVehicles } from "../../services/VehicleService";

function VehicleList() {
    const navigate = useNavigate();
    const { userId } = useSelector((state) => state.auth);

    const [vehicles, setVehicles] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        loadVehicles();
    }, []);

    const loadVehicles = async () => {
        try {
            setLoading(true);
            const data = await fetchOwnerVehicles(userId);
            setVehicles(data);
        } catch (error) {
            console.error("Error fetching vehicles:", error);
        } finally {
            setLoading(false);
        }
    };

    const handleEdit = (vehicleId) => {
        navigate(`/owner/vehicles/edit/${vehicleId}`);
    };

    return (
        <div className="container mt-4">
            <div className="d-flex justify-content-between align-items-center mb-4">
                <h2>My Vehicles</h2>
                <button
                    className="btn btn-primary"
                    onClick={() => navigate("/owner/vehicles/add")}
                >
                    + Add New Vehicle
                </button>
            </div>

            {loading ? (
                <div className="text-center">
                    <div className="spinner-border" role="status">
                        <span className="visually-hidden">Loading...</span>
                    </div>
                </div>
            ) : vehicles.length === 0 ? (
                <div className="alert alert-info">
                    No vehicles found. Click "Add New Vehicle" to get started.
                </div>
            ) : (
                <div className="row">
                    {vehicles.map((vehicle) => (
                        <div key={vehicle.vehicleId} className="col-md-6 col-lg-4 mb-4">
                            <div className="card h-100">
                                {vehicle.primaryImage && (
                                    <img
                                        src={`data:image/jpeg;base64,${vehicle.primaryImage}`}
                                        className="card-img-top"
                                        alt={vehicle.modelName}
                                        style={{ height: "200px", objectFit: "cover" }}
                                    />
                                )}
                                <div className="card-body">
                                    <h5 className="card-title">
                                        {vehicle.brandName} {vehicle.modelName}
                                    </h5>
                                    <p className="card-text">
                                        <strong>Vehicle Number:</strong> {vehicle.vehicleNumber}
                                        <br />
                                        <strong>Type:</strong> {vehicle.vehicleTypeName}
                                        <br />
                                        <strong>Fuel:</strong> {vehicle.fuelTypeName}
                                        <br />
                                        <strong>AC:</strong> {vehicle.ac === 1 ? "Yes" : "No"}
                                        <br />
                                        <strong>Status:</strong>{" "}
                                        <span
                                            className={`badge ${vehicle.status === "ACTIVE"
                                                    ? "bg-success"
                                                    : "bg-secondary"
                                                }`}
                                        >
                                            {vehicle.status}
                                        </span>
                                    </p>
                                    {vehicle.description && (
                                        <p className="card-text">
                                            <small className="text-muted">{vehicle.description}</small>
                                        </p>
                                    )}
                                </div>
                                <div className="card-footer">
                                    <button
                                        className="btn btn-sm btn-outline-primary w-100"
                                        onClick={() => handleEdit(vehicle.vehicleId)}
                                    >
                                        Edit
                                    </button>
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
