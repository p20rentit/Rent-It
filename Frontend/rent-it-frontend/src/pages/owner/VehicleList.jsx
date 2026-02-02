import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { fetchOwnerVehicles, deleteVehicle } from "../../services/VehicleService";

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
            console.log("Fetched vehicles:", data); // Debug log
            setVehicles(data);
        } catch (error) {
            console.error("Error fetching vehicles:", error);
        } finally {
            setLoading(false);
        }
    };

    const handleEdit = (vehicleId) => {
        if (!vehicleId) {
            console.error("Invalid vehicle ID for edit");
            return;
        }
        navigate(`/owner/vehicles/edit/${vehicleId}`);
    };

    const handleDelete = async (vehicleId) => {
        if (!vehicleId) {
            console.error("Invalid vehicle ID for delete");
            return;
        }
        if (window.confirm("Are you sure you want to delete this vehicle? This will also delete all associated images.")) {
            try {
                await deleteVehicle(vehicleId);
                loadVehicles(); // Reload list after delete
            } catch (error) {
                console.error("Error deleting vehicle:", error);
                const errorMessage = error.response?.data?.message || "Failed to delete vehicle";
                alert(errorMessage);
            }
        }
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
                    {vehicles.map((vehicle) => {
                        // Handle potential casing issues (backend might return PascalCase)
                        const vId = vehicle.vehicleId || vehicle.VehicleId;

                        return (
                            <div key={vId} className="col-md-6 col-lg-4 mb-4">
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
                                    <div className="card-footer d-flex gap-2">
                                        <button
                                            className="btn btn-sm btn-outline-info flex-grow-1"
                                            onClick={() => navigate(`/owner/vehicles/view/${vId}`)}
                                        >
                                            View
                                        </button>
                                        <button
                                            className="btn btn-sm btn-outline-primary flex-grow-1"
                                            onClick={() => handleEdit(vId)}
                                        >
                                            Edit
                                        </button>
                                        <button
                                            className="btn btn-sm btn-outline-danger flex-grow-1"
                                            onClick={() => handleDelete(vId)}
                                        >
                                            Delete
                                        </button>
                                    </div>
                                </div>
                            </div>
                        );
                    })}
                </div>
            )}
        </div>
    );
}

export default VehicleList;
