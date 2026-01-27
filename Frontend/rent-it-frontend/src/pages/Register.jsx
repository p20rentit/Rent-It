import React, { useEffect, useState } from "react";
import { getCities, getAreasByCity } from "../services/LocationService";

function Register() {

  const [cities, setCities] = useState([]);
  const [areas, setAreas] = useState([]);

  const [errors, setErrors] = useState({}); // <-- Validation errors

  const [formData, setFormData] = useState({
    roleId: "",
    fname: "",
    mname: "",
    lname: "",
    phone: "",
    email: "",
    password: "",
    repeatPassword: "",
    drivingLicenceNo: "",
    adharNo: "",
    panNo: "",
    address: "",
    securityQuestion: "",
    securityAnswer: "",
    cityId: "",
    areaId: ""
  });

  useEffect(() => {
    getCities().then(setCities);
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
        if (value && !/^[A-Za-z]{2,50}$/.test(value)) msg = "Invalid middle name";
        break;

      case "lname":
        if (!/^[A-Za-z]{2,50}$/.test(value)) msg = "Invalid last name";
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

      case "repeatPassword":
        if (value !== formData.password) msg = "Passwords do not match";
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

      case "securityQuestion":
        if (!value) msg = "Security question required";
        break;

      case "securityAnswer":
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

  // existing validate() unchanged
  const validate = () => {
    let temp = {};

    if (!formData.roleId) temp.roleId = "Role is required";
    if (!/^[A-Za-z]{2,50}$/.test(formData.fname)) temp.fname = "Invalid first name";
    if (formData.mname && !/^[A-Za-z]{2,50}$/.test(formData.mname)) temp.mname = "Invalid middle name";
    if (!/^[A-Za-z]{2,50}$/.test(formData.lname)) temp.lname = "Invalid last name";
    if (!/^[7-9]\d{9}$/.test(formData.phone)) temp.phone = "Phone number must be 10 digits & start 6-9";
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) temp.email = "Invalid email format";
    if (!/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&]).{8,}$/.test(formData.password)) temp.password = "Weak password";
    if (formData.password !== formData.repeatPassword) temp.repeatPassword = "Passwords do not match";
    if (formData.drivingLicenceNo && !/^[A-Z]{2}[0-9]{2}[0-9]{4}[0-9]{7}$/.test(formData.drivingLicenceNo)) temp.drivingLicenceNo = "Invalid license format";
    if (!/^\d{12}$/.test(formData.adharNo)) temp.adharNo = "Aadhar must be 12 digits";
    if (formData.panNo && !/^[A-Z]{5}[0-9]{4}[A-Z]{1}$/.test(formData.panNo)) temp.panNo = "Invalid PAN format";
    if (!formData.cityId) temp.cityId = "City is required";
    if (!formData.areaId) temp.areaId = "Area is required";
    if (!formData.address || formData.address.length < 5) temp.address = "Address must be at least 5 characters";
    if (!formData.securityQuestion) temp.securityQuestion = "Security question required";
    if (!formData.securityAnswer) temp.securityAnswer = "Security answer required";

    setErrors(temp);
    return Object.keys(temp).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validate()) return;

    const payload = { ...formData, areaId: formData.areaId };
    const res = await fetch("http://localhost:8080/auth/register", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload)
    });

    res.ok ? alert("Registration successful") : alert("Registration failed");
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
              onBlur={(e)=>validateField(e.target.name,e.target.value)}
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
              onChange={handleChange}
              onBlur={(e)=>validateField(e.target.name,e.target.value)}
            />
            {errors.fname && <small className="text-danger">{errors.fname}</small>}
          </div>

          <div className="mb-3">
            <label className="form-label">Middle Name</label>
            <input
              className="form-control"
              name="mname"
              onChange={handleChange}
              onBlur={(e)=>validateField(e.target.name,e.target.value)}
            />
            {errors.mname && <small className="text-danger">{errors.mname}</small>}
          </div>

          <div className="mb-3">
            <label className="form-label">Last Name *</label>
            <input
              className="form-control"
              name="lname"
              onChange={handleChange}
              onBlur={(e)=>validateField(e.target.name,e.target.value)}
            />
            {errors.lname && <small className="text-danger">{errors.lname}</small>}
          </div>

          <div className="mb-3">
            <label className="form-label">Phone No *</label>
            <input
              className="form-control"
              name="phone"
              onChange={handleChange}
              onBlur={(e)=>validateField(e.target.name,e.target.value)}
            />
            {errors.phone && <small className="text-danger">{errors.phone}</small>}
          </div>

          <div className="mb-3">
            <label className="form-label">Email *</label>
            <input
              className="form-control"
              type="email"
              name="email"
              onChange={handleChange}
              onBlur={(e)=>validateField(e.target.name,e.target.value)}
            />
            {errors.email && <small className="text-danger">{errors.email}</small>}
          </div>

          <div className="mb-3">
            <label className="form-label">Password *</label>
            <input
              className="form-control"
              type="password"
              name="password"
              onChange={handleChange}
              onBlur={(e)=>validateField(e.target.name,e.target.value)}
            />
            {errors.password && <small className="text-danger">{errors.password}</small>}
          </div>

          <div className="mb-3">
            <label className="form-label">Repeat Password *</label>
            <input
              className="form-control"
              type="password"
              name="repeatPassword"
              onChange={handleChange}
              onBlur={(e)=>validateField(e.target.name,e.target.value)}
            />
            {errors.repeatPassword && <small className="text-danger">{errors.repeatPassword}</small>}
          </div>

          <div className="mb-3">
            <label className="form-label">Driving Licence No *</label>
            <input
              className="form-control"
              name="drivingLicenceNo"
              onChange={handleChange}
              onBlur={(e)=>validateField(e.target.name,e.target.value)}
            />
            {errors.drivingLicenceNo && <small className="text-danger">{errors.drivingLicenceNo}</small>}
          </div>

          <div className="mb-3">
            <label className="form-label">Aadhar No *</label>
            <input
              className="form-control"
              name="adharNo"
              onChange={handleChange}
              onBlur={(e)=>validateField(e.target.name,e.target.value)}
            />
            {errors.adharNo && <small className="text-danger">{errors.adharNo}</small>}
          </div>

          <div className="mb-3">
            <label className="form-label">PAN No</label>
            <input
              className="form-control"
              name="panNo"
              onChange={handleChange}
              onBlur={(e)=>validateField(e.target.name,e.target.value)}
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
              onBlur={(e)=>validateField(e.target.name,e.target.value)}
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
              onChange={handleChange}
              onBlur={(e)=>validateField(e.target.name,e.target.value)}
            ></textarea>
            {errors.address && <small className="text-danger">{errors.address}</small>}
          </div>

          <hr />

          <h5 className="mb-3">Security Question</h5>

          <div className="mb-3">
            <label className="form-label">Question *</label>
            <select
              className="form-select"
              name="securityQuestion"
              onChange={handleChange}
              onBlur={(e)=>validateField(e.target.name,e.target.value)}
            >
              <option value="">Select Question</option>
              <option value="school">Your first school?</option>
              <option value="pet">Your pet's name?</option>
              <option value="birthplace">Your birthplace?</option>
            </select>
            {errors.securityQuestion && <small className="text-danger">{errors.securityQuestion}</small>}
          </div>

          <div className="mb-3">
            <label className="form-label">Answer *</label>
            <input
              className="form-control"
              name="securityAnswer"
              onChange={handleChange}
              onBlur={(e)=>validateField(e.target.name,e.target.value)}
            />
            {errors.securityAnswer && <small className="text-danger">{errors.securityAnswer}</small>}
          </div>

          <button className="btn btn-primary w-100">Register</button>
        </form>
      </div>
    </div>
  );
}

export default Register;




