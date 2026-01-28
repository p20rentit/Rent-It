import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useSelector } from "react-redux";
import { ownerApi } from "../../api/axios";
import { uploadVehicleImage } from "../../services/VehicleService";

function EditVehicle() {
    const navigate = useNavigate();
    const { id } = useParams();
    const { userId } = useSelector((state) => state.auth);

    const [vehicleTypes, setVehicleTypes] = useState([]);
    const [brands, setBrands] = useState([]);
    const [models, setModels] = useState([]);
    const [fuelTypes, setFuelTypes] = useState([]);

    const [vehicle, setVehicle] = useState(null);
    const [formData, setFormData] = useState({
        vehicleTypeId: "",
        modelId: "",
        fuelTypeId: "",
        vehicleNumber: "",
        vehicleRcNumber: "",
        ac: 0,
        description: "",
    });

    const [newImages, setNewImages] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");
    const [success, setSuccess] = useState("");

    useEffect(() => {
        loadDropdownData();
        loadVehicle();
    }, []);

    const loadDropdownData = async () => {
        try {
            // ✅ Dropdown data uses owner API (port 5004 - .NET backend)
            // VehicleTypes, Brands, Models, FuelTypes are on .NET service

            const vtRes = await ownerApi.get("/vehicletypes");
            setVehicleTypes(vtRes.data);

            const brandRes = await ownerApi.get("/brands");
            setBrands(brandRes.data);

            const fuelRes = await ownerApi.get("/fueltypes");
            setFuelTypes(fuelRes.data);
        } catch (err) {
            setError("Failed to load form data");
            console.error(err);
        }
    };

    const loadVehicle = async () => {
        try {
            // Vehicle data uses owner API (port 9091)
            const res = await ownerApi.get(`/owner/vehicles/${userId}`);
            const vehicleData = res.data.find((v) => v.vehicleId === parseInt(id));

            if (vehicleData) {
                setVehicle(vehicleData);
                setFormData({
                    vehicleTypeId: vehicleData.vehicleTypeId || "",
                    modelId: vehicleData.modelId || "",
                    fuelTypeId: vehicleData.fuelTypeId || "",
                    vehicleNumber: vehicleData.vehicleNumber || "",
                    vehicleRcNumber: vehicleData.vehicleRcNumber || "",
                    ac: vehicleData.ac || 0,
                    description: vehicleData.description || "",
                });

                // Load models for the brand (uses owner API - port 5004)
                if (vehicleData.brandId) {
                    const modelRes = await ownerApi.get(`/models/brand/${vehicleData.brandId}`);
                    setModels(modelRes.data);
                }
            } else {
                setError("Vehicle not found");
            }
        } catch (err) {
            setError("Failed to load vehicle");
            console.error(err);
        }
    };

    const handleBrandChange = async (e) => {
        const brandId = e.target.value;
        if (brandId) {
            try {
                // Models API uses owner API (port 5004)
                const res = await ownerApi.get(`/models/brand/${brandId}`);
                setModels(res.data);
            } catch (err) {
                console.error("Error loading models:", err);
            }
        } else {
            setModels([]);
        }
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prev) => ({ ...prev, [name]: value }));
    };

    const handleImageChange = (e) => {
        const files = Array.from(e.target.files);
        setNewImages(files);
    };

    const handleUpdate = async (e) => {
        e.preventDefault();
        setError("");
        setSuccess("");
        setLoading(true);

        try {
            // Update vehicle details (uses ownerApi on port 9091)
            await ownerApi.put(`/owner/vehicles/${id}`, formData);

            // Upload new images if any (uses ownerApi on port 9091)
            if (newImages.length > 0) {
                for (let i = 0; i < newImages.length; i++) {
                    const formDataImg = new FormData();
                    formDataImg.append("vehicleId", id);
                    formDataImg.append("isPrimary", i === 0);
                    formDataImg.append("image", newImages[i]);

                    await uploadVehicleImage(formDataImg);
                }
            }

            setSuccess("Vehicle updated successfully!");
            setTimeout(() => {
                navigate("/owner/vehicles");
            }, 1500);
        } catch (err) {
            setError(err.response?.data?.message || "Failed to update vehicle");
            console.error(err);
        } finally {
            setLoading(false);
        }
    };

    if (!vehicle) {
        return (
            <div className="container mt-5">
                <div className="text-center">
                    <div className="spinner-border" role="status">
                        <span className="visually-hidden">Loading...</span>
                    </div>
                </div>
            </div>
        );
    }

    return (
        <div className="mt-4 mb-5">
            <div className="card shadow">
                <div className="card-header">
                    <h3>Edit Vehicle</h3>
                </div>
                <div className="card-body">
                    {error && <div className="alert alert-danger">{error}</div>}
                    {success && <div className="alert alert-success">{success}</div>}

                    <form onSubmit={handleUpdate}>
                        <h5 className="mb-3">Vehicle Details</h5>

                        <div className="row">
                            <div className="col-md-6 mb-3">
                                <label className="form-label">Vehicle Type *</label>
                                <select
                                    className="form-select"
                                    name="vehicleTypeId"
                                    value={formData.vehicleTypeId}
                                    onChange={handleChange}
                                    required
                                >
                                    <option value="">Select Vehicle Type</option>
                                    {vehicleTypes.map((vt) => (
                                        <option key={vt.vehicleTypeId} value={vt.vehicleTypeId}>
                                            {vt.vehicleTypeName}
                                        </option>
                                    ))}
                                </select>
                            </div>

                            <div className="col-md-6 mb-3">
                                <label className="form-label">Brand *</label>
                                <select
                                    className="form-select"
                                    onChange={handleBrandChange}
                                    required
                                >
                                    <option value="">Select Brand</option>
                                    {brands.map((brand) => (
                                        <option
                                            key={brand.brandId}
                                            value={brand.brandId}
                                            selected={brand.brandName === vehicle.brandName}
                                        >
                                            {brand.brandName}
                                        </option>
                                    ))}
                                </select>
                            </div>
                        </div>

                        <div className="row">
                            <div className="col-md-6 mb-3">
                                <label className="form-label">Model *</label>
                                <select
                                    className="form-select"
                                    name="modelId"
                                    value={formData.modelId}
                                    onChange={handleChange}
                                    required
                                    disabled={models.length === 0}
                                >
                                    <option value="">Select Model</option>
                                    {models.map((model) => (
                                        <option key={model.modelId} value={model.modelId}>
                                            {model.modelName}
                                        </option>
                                    ))}
                                </select>
                            </div>

                            <div className="col-md-6 mb-3">
                                <label className="form-label">Fuel Type *</label>
                                <select
                                    className="form-select"
                                    name="fuelTypeId"
                                    value={formData.fuelTypeId}
                                    onChange={handleChange}
                                    required
                                >
                                    <option value="">Select Fuel Type</option>
                                    {fuelTypes.map((ft) => (
                                        <option key={ft.fuelTypeId} value={ft.fuelTypeId}>
                                            {ft.fuelTypeName}
                                        </option>
                                    ))}
                                </select>
                            </div>
                        </div>

                        <div className="row">
                            <div className="col-md-6 mb-3">
                                <label className="form-label">Vehicle Number *</label>
                                <input
                                    type="text"
                                    className="form-control"
                                    name="vehicleNumber"
                                    placeholder="MH12AB1234"
                                    value={formData.vehicleNumber}
                                    onChange={handleChange}
                                    required
                                />
                            </div>

                            <div className="col-md-6 mb-3">
                                <label className="form-label">RC Number *</label>
                                <input
                                    type="text"
                                    className="form-control"
                                    name="vehicleRcNumber"
                                    placeholder="RC123456"
                                    value={formData.vehicleRcNumber}
                                    onChange={handleChange}
                                    required
                                />
                            </div>
                        </div>

                        <div className="mb-3">
                            <label className="form-label">Air Conditioning</label>
                            <div>
                                <div className="form-check form-check-inline">
                                    <input
                                        className="form-check-input"
                                        type="radio"
                                        name="ac"
                                        value="1"
                                        checked={formData.ac === 1}
                                        onChange={(e) =>
                                            setFormData({ ...formData, ac: parseInt(e.target.value) })
                                        }
                                    />
                                    <label className="form-check-label">Yes</label>
                                </div>
                                <div className="form-check form-check-inline">
                                    <input
                                        className="form-check-input"
                                        type="radio"
                                        name="ac"
                                        value="0"
                                        checked={formData.ac === 0}
                                        onChange={(e) =>
                                            setFormData({ ...formData, ac: parseInt(e.target.value) })
                                        }
                                    />
                                    <label className="form-check-label">No</label>
                                </div>
                            </div>
                        </div>

                        <div className="mb-3">
                            <label className="form-label">Description</label>
                            <textarea
                                className="form-control"
                                rows="3"
                                name="description"
                                placeholder="Enter vehicle description"
                                value={formData.description}
                                onChange={handleChange}
                            ></textarea>
                        </div>

                        <hr />

                        <h5 className="mb-3">Current Image</h5>
                        {vehicle.primaryImage && (
                            <div className="mb-3">
                                <img
                                    src={`data:image/jpeg;base64,${vehicle.primaryImage}`}
                                    alt="Current vehicle"
                                    className="img-thumbnail"
                                    style={{ maxWidth: "300px" }}
                                />
                            </div>
                        )}

                        <h5 className="mb-3">Upload New Images (Optional)</h5>
                        <div className="mb-3">
                            <label className="form-label">Add More Images (Max 5MB each)</label>
                            <input
                                type="file"
                                className="form-control"
                                accept="image/jpeg,image/jpg,image/png"
                                multiple
                                onChange={handleImageChange}
                            />
                            <small className="text-muted">
                                Upload additional images for this vehicle
                            </small>
                        </div>

                        <div className="d-flex justify-content-between">
                            <button
                                type="button"
                                className="btn btn-secondary"
                                onClick={() => navigate("/owner/vehicles")}
                                disabled={loading}
                            >
                                Cancel
                            </button>
                            <button type="submit" className="btn btn-primary" disabled={loading}>
                                {loading ? "Updating Vehicle..." : "Update Vehicle"}
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
}

export default EditVehicle;
