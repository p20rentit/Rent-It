import React, { useEffect, useState } from "react";
import { getCities, getAreasByCity } from "../services/LocationService";
import api from "../api/axios";
import { useNavigate } from "react-router-dom";


function Register() {

  const [cities, setCities] = useState([]);
  const [areas, setAreas] = useState([]);

  const [questions, setQuestions] = useState([]);

  const [showPassword, setShowPassword] = useState(false);

  const [errors, setErrors] = useState({}); // <-- Validation errors

  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    roleId: "",
    fname: "",
    mname: "",
    lname: "",
    phone: "",
    email: "",
    password: "",
    confirmPassword: "",
    drivingLicenceNo: "",
    adharNo: "",
    panNo: "",
    address: "",
    questionId: "",
    answer: "",
    cityId: "",
    areaId: ""
  });

  useEffect(() => {
    getCities().then(setCities);

    api.get("/auth/security-questions")
    .then(res => {
      setQuestions(res.data);
    })
    .catch(err => {
      console.error("Error fetching security questions", err);
    });

  }, []);


  const validateField = (name, value) => {
    let msg = "";

    switch(name) {
      case "roleId":
        if (!value) msg = "Role is required";
        break;

      case "fname":
        if (!/^[A-Z][a-z]{2,50}$/.test(value)) msg = "Invalid first name";
        break;

      case "mname":
        if (value && !/^^[A-Z][a-z]{2,50}$/.test(value)) msg = "Invalid middle name";
        break;

      case "lname":
        if (!/^[A-Z][a-z]{2,50}$/.test(value)) msg = "Invalid last name";
        break;

      case "phone":
        if (!/^[7-9]\d{9}$/.test(value)) msg = "Phone number must be 10 digits";
        break;

      case "email":
        if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value)) msg = "Invalid email format";
        break;

      case "password":
        if (!/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&]).{8,}$/.test(value))
          msg = "Weak password (A-Z, a-z, 0-9, symbol, min 8)";
        break;

      case "confirmPassword":
        if (formData.password && value !== formData.password)
          msg = "Passwords do not match";
        break;


      case "adharNo":
        if (!/^\d{12}$/.test(value)) msg = "Aadhar must be 12 digits";
        break;

      case "panNo":
        if (value && !/^[A-Z]{5}[0-9]{4}[A-Z]{1}$/.test(value)) msg = "Invalid PAN format";
        break;

      case "drivingLicenceNo":
        if (value && !/^[A-Z]{2}[0-9]{2}[0-9]{4}[0-9]{7}$/.test(value))
          msg = "Invalid license format";
        break;

      case "address":
        if (!value || value.length < 5) msg = "Address must be at least 5 characters";
        break;

      case "questionId":
        if (!value) msg = "Security question required";
        break;

      case "answer":
        if (!value) msg = "Security answer required";
        break;


    }

    setErrors(prev => ({ ...prev, [name]: msg }));
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    validateField(name, value); // live validate
  };

  const handleCityChange = (e) => {
    const cityId = e.target.value;
    setFormData({ ...formData, cityId, areaId: "" });
    setAreas([]);
    setErrors(prev => ({ ...prev, cityId: "", areaId: "" }));

    if (cityId) {
      getAreasByCity(cityId).then(setAreas);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // 🔴 block submit if any validation error exists
    const hasErrors = Object.values(errors).some(msg => msg);
    if (hasErrors) return;

    const { confirmPassword, ...rest } = formData;
    const payload = {
      ...rest,
      questionId: Number(formData.questionId)
    };

    try {
      await api.post("/auth/register", payload);
      navigate("/login");
    } catch (err) {
      alert("Registration failed");
      console.error(err);
    }
  };


  return (
    <div className="container mt-5 mb-5">
      <div className="card shadow p-4">
        <h3 className="text-center mb-4">Registration Form</h3>

        <form onSubmit={handleSubmit}>
          <h5 className="mb-3">Personal Info</h5>

          <div className="mb-3">
            <label className="form-label">Select Role *</label>
            <select
              className="form-select"
              name="roleId"
              onChange={handleChange}
              
            >
              <option value="">Select Role</option>
              <option value="2">Customer</option>
              <option value="3">Owner</option>
            </select>
            {errors.roleId && <small className="text-danger">{errors.roleId}</small>}
          </div>

          <div className="mb-3">
            <label className="form-label">First Name *</label>
            <input
              className="form-control"
              name="fname"
              placeholder="First name (Start with capital)"
              onChange={handleChange}
            />
            {errors.fname && <small className="text-danger">{errors.fname}</small>}
          </div>

          <div className="mb-3">
            <label className="form-label">Middle Name</label>
            <input
              className="form-control"
              name="mname"
              placeholder="Middle name (Start with capital)"
              onChange={handleChange}
            />
            {errors.mname && <small className="text-danger">{errors.mname}</small>}
          </div>

          <div className="mb-3">
            <label className="form-label">Last Name *</label>
            <input
              className="form-control"
              name="lname"
              placeholder="Last name (Start with capital)"
              onChange={handleChange}
            />
            {errors.lname && <small className="text-danger">{errors.lname}</small>}
          </div>

          <div className="mb-3">
            <label className="form-label">Phone No *</label>
            <input
              className="form-control"
              name="phone"
              placeholder="10-digit mobile number Ex:9784565236"
              onChange={handleChange}
            />
            {errors.phone && <small className="text-danger">{errors.phone}</small>}
          </div>

          <div className="mb-3">
            <label className="form-label">Email *</label>
            <input
              className="form-control"
              type="email"
              name="email"
              placeholder="example@email.com"
              onChange={handleChange}
            />
            {errors.email && <small className="text-danger">{errors.email}</small>}
          </div>

          <div className="mb-3">
            <label className="form-label">Password *</label>

              <div className="input-group">
                <input
                  className="form-control"
                  type={showPassword ? "text" : "password"}
                  name="password"
                  placeholder="Min 8 chars, A-Z, a-z, 0-9, symbol"
                  onChange={handleChange}
                />
                <button
                  type="button"
                  className="btn btn-outline-secondary"
                  onClick={() => setShowPassword(!showPassword)}
                >
                  {showPassword ? "Hide" : "Show"}
                </button>
              </div>

              {errors.password && <small className="text-danger">{errors.password}</small>}
            </div>



          <div className="mb-3">
            <label className="form-label">Confirm Password *</label>

            <div className="input-group">
              <input
                className="form-control"
                type={showPassword ? "text" : "password"}
                name="confirmPassword"
                placeholder="Re-enter password"
                onChange={handleChange}
              />

              <button
                type="button"
                className="btn btn-outline-secondary"
                onClick={() => setShowPassword(!showPassword)}
              >
                {showPassword ? "Hide" : "Show"}
              </button>
            </div>

            {errors.confirmPassword && (
              <small className="text-danger">{errors.confirmPassword}</small>
            )}
          </div>


          <div className="mb-3">
            <label className="form-label">Driving Licence No *</label>
            <input
              className="form-control"
              name="drivingLicenceNo"
              placeholder="DL Format: MH1220191234567"
              onChange={handleChange}
            />
            {errors.drivingLicenceNo && <small className="text-danger">{errors.drivingLicenceNo}</small>}
          </div>

          <div className="mb-3">
            <label className="form-label">Aadhar No *</label>
            <input
              className="form-control"
              name="adharNo"
              placeholder="12-digit Aadhaar number"
              onChange={handleChange}
            />
            {errors.adharNo && <small className="text-danger">{errors.adharNo}</small>}
          </div>

          <div className="mb-3">
            <label className="form-label">PAN No</label>
            <input
              className="form-control"
              name="panNo"
              placeholder="PAN Format: ABCDE1234F"
              onChange={handleChange}
            />
            {errors.panNo && <small className="text-danger">{errors.panNo}</small>}
          </div>

          <hr />

          <h5 className="mb-3">Address Info</h5>

          <div className="mb-3">
            <label className="form-label">City *</label>
            <select className="form-select" value={formData.cityId} onChange={handleCityChange}>
              <option value="">Select City</option>
              {cities.map(c => (
                <option key={c.cityId} value={c.cityId}>{c.cityName}</option>
              ))}
            </select>
            {errors.cityId && <small className="text-danger">{errors.cityId}</small>}
          </div>

          <div className="mb-3">
            <label className="form-label">Area *</label>
            <select
              className="form-select"
              name="areaId"
              value={formData.areaId}
              onChange={handleChange}
              disabled={!formData.cityId}
            >
              <option value="">Select Area</option>
              {areas.map(a => (
                <option key={a.areaId} value={a.areaId}>{a.areaName}</option>
              ))}
            </select>
            {errors.areaId && <small className="text-danger">{errors.areaId}</small>}
          </div>

          <div className="mb-3">
            <label className="form-label">Address *</label>
            <textarea
              className="form-control"
              rows="3"
              name="address"
              placeholder="House no, Street, Landmark"
              onChange={handleChange}
            ></textarea>
            {errors.address && <small className="text-danger">{errors.address}</small>}
          </div>

          <hr />

          <h5 className="mb-3">Security Question</h5>

          <div className="mb-3">
            <label className="form-label">Question *</label>
            <select
              className="form-select"
              name="questionId"
              onChange={handleChange}
            >
              <option value="">Select Question</option>

              {questions.map(q => (
                <option key={q.questionId} value={q.questionId}>
                  {q.question}
                </option>
              ))}
            </select>

            {errors.questionId && <small className="text-danger">{errors.questionId}</small>}
          </div>

          <div className="mb-3">
            <label className="form-label">Answer *</label>
            <input
              className="form-control"
              name="answer"
              placeholder="Answer (Eg: Pune)"
              onChange={handleChange}
            />


            {errors.answer && <small className="text-danger">{errors.answer}</small>}
          </div>

          <button className="btn btn-primary w-100">Register</button>
        </form>
      </div>
    </div>
  );
}

export default Register;




