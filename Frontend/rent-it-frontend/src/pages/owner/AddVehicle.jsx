import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { ownerApi } from "../../api/axios";
import { addVehicle, uploadVehicleImage } from "../../services/VehicleService";

function AddVehicle() {
    const navigate = useNavigate();
    const { userId } = useSelector((state) => state.auth);

    const [vehicleTypes, setVehicleTypes] = useState([]);
    const [brands, setBrands] = useState([]);
    const [models, setModels] = useState([]);
    const [fuelTypes, setFuelTypes] = useState([]);

    const [formData, setFormData] = useState({
        vehicleTypeId: "",
        modelId: "",
        fuelTypeId: "",
        vehicleNumber: "",
        vehicleRcNumber: "",
        ac: 0,
        description: "",
    });

    const [images, setImages] = useState([]);
    const [primaryImageIndex, setPrimaryImageIndex] = useState(0);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");
    const [success, setSuccess] = useState("");

    useEffect(() => {
        loadDropdownData();
    }, []);

    const loadDropdownData = async () => {
        try {
            console.log("🔍 Starting to load dropdown data...");
            console.log("🌐 Backend URL:", ownerApi.defaults.baseURL);

            // Fetch vehicle types
            console.log("📞 Calling: GET /vehicletypes");
            const vtRes = await ownerApi.get("/vehicletypes");
            console.log("✅ Vehicle Types Response:", vtRes.data);
            setVehicleTypes(vtRes.data);

            // Fetch brands
            console.log("📞 Calling: GET /brands");
            const brandRes = await ownerApi.get("/brands");
            console.log("✅ Brands Response:", brandRes.data);
            setBrands(brandRes.data);

            // Fetch fuel types
            console.log("📞 Calling: GET /fueltypes");
            const fuelRes = await ownerApi.get("/fueltypes");
            console.log("✅ Fuel Types Response:", fuelRes.data);
            setFuelTypes(fuelRes.data);

            console.log("✅ All dropdown data loaded successfully!");
        } catch (err) {
            console.error("❌ ERROR loading form data:");
            console.error("Error message:", err.message);
            console.error("Error response:", err.response);
            console.error("Full error:", err);
            setError("Failed to load form data");
        }
    };

    const handleBrandChange = async (e) => {
        const brandId = e.target.value;
        console.log("🏷️ Brand changed to:", brandId);
        if (brandId) {
            try {
                console.log(`📞 Calling: GET /models/brand/${brandId}`);
                const res = await ownerApi.get(`/models/brand/${brandId}`);
                console.log("✅ Models Response:", res.data);
                setModels(res.data);
            } catch (err) {
                console.error("❌ Error loading models:", err);
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
        setImages(files);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError("");
        setSuccess("");
        setLoading(true);

        try {
            // Step 1: Add vehicle (uses ownerApi on port 9091)
            const vehicleId = await addVehicle(userId, formData);

            // Step 2: Upload images (uses ownerApi on port 9091)
            if (images.length > 0) {
                for (let i = 0; i < images.length; i++) {
                    const formDataImg = new FormData();
                    formDataImg.append("vehicleId", vehicleId);
                    formDataImg.append("isPrimary", i === primaryImageIndex);
                    formDataImg.append("image", images[i]);

                    await uploadVehicleImage(formDataImg);
                }
            }

            setSuccess("Vehicle added successfully!");
            setTimeout(() => {
                navigate("/owner/vehicles");
            }, 1500);
        } catch (err) {
            setError(err.response?.data?.message || "Failed to add vehicle");
            console.error(err);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="mt-4 mb-5">
            <div className="card shadow">
                <div className="card-header">
                    <h3>Add New Vehicle</h3>
                </div>
                <div className="card-body">
                    {error && <div className="alert alert-danger">{error}</div>}
                    {success && <div className="alert alert-success">{success}</div>}

                    <form onSubmit={handleSubmit}>
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
                                        <option key={brand.brandId} value={brand.brandId}>
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

                        <h5 className="mb-3">Upload Images</h5>

                        <div className="mb-3">
                            <label className="form-label">Vehicle Images (Max 5MB each)</label>
                            <input
                                type="file"
                                className="form-control"
                                accept="image/jpeg,image/jpg,image/png"
                                multiple
                                onChange={handleImageChange}
                            />
                            <small className="text-muted">
                                You can upload multiple images. First image will be primary by default.
                            </small>
                        </div>

                        {images.length > 0 && (
                            <div className="mb-3">
                                <label className="form-label">Select Primary Image</label>
                                <div className="row">
                                    {images.map((img, index) => (
                                        <div key={index} className="col-md-3 mb-2">
                                            <div className="form-check">
                                                <input
                                                    className="form-check-input"
                                                    type="radio"
                                                    name="primaryImage"
                                                    checked={primaryImageIndex === index}
                                                    onChange={() => setPrimaryImageIndex(index)}
                                                />
                                                <label className="form-check-label">{img.name}</label>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        )}

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
                                {loading ? "Adding Vehicle..." : "Add Vehicle"}
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
}

export default AddVehicle;
