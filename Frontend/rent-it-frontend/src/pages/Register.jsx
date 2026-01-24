import React, { useEffect, useState } from "react";
import { getCities, getAreasByCity } from "../services/LocationService";

function Register() {

  const [cities, setCities] = useState([]);
  const [areas, setAreas] = useState([]);

  const [formData, setFormData] = useState({
    roleId: "",
    fname: "",
    mname: "",
    lname: "",
    phone: "",
    email: "",
    password: "",
    drivingLicenceNo: "",
    adharNo: "",
    panNo: "",
    cityId: "",
    areaId: ""
  });

  // 🔹 Load cities
  useEffect(() => {
    getCities().then(setCities);
  }, []);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleCityChange = (e) => {
    const cityId = e.target.value;

    setFormData({ ...formData, cityId, areaId: "" });
    setAreas([]);

    if (cityId) {
      getAreasByCity(cityId).then(setAreas);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const payload = {
      roleId: formData.roleId,
      fname: formData.fname,
      mname: formData.mname,
      lname: formData.lname,
      phone: formData.phone,
      email: formData.email,
      password: formData.password,
      drivingLicenceNo: formData.drivingLicenceNo,
      adharNo: formData.adharNo,
      panNo: formData.panNo,
      areaId: formData.areaId
    };

    const res = await fetch("http://localhost:8080/auth/register", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload)
    });

    res.ok ? alert("Registration successful") : alert("Registration failed");
  };

  return (
    <div className="container mt-5">
      <div className="card shadow p-4">
        <h3 className="text-center mb-4">Register</h3>

        <form onSubmit={handleSubmit}>

          <select className="form-select mb-3" name="roleId" onChange={handleChange} required>
            <option value="">Select Role</option>
            <option value="1">Admin</option>
            <option value="2">Customer</option>
            <option value="3">Owner</option>
          </select>

          <input className="form-control mb-3" name="fname" placeholder="First Name" onChange={handleChange} required />
          <input className="form-control mb-3" name="mname" placeholder="Middle Name" onChange={handleChange} />
          <input className="form-control mb-3" name="lname" placeholder="Last Name" onChange={handleChange} required />
          <input className="form-control mb-3" name="phone" placeholder="Phone" onChange={handleChange} required />
          <input className="form-control mb-3" type="email" name="email" placeholder="Email" onChange={handleChange} required />
          <input className="form-control mb-3" type="password" name="password" placeholder="Password" onChange={handleChange} required />

          <input className="form-control mb-3" name="drivingLicenceNo" placeholder="Driving Licence No" onChange={handleChange} />
          <input className="form-control mb-3" name="adharNo" placeholder="Aadhar No" onChange={handleChange} />
          <input className="form-control mb-3" name="panNo" placeholder="PAN No" onChange={handleChange} />

          <select className="form-select mb-3" value={formData.cityId} onChange={handleCityChange} required>
            <option value="">Select City</option>
            {cities.map(c => (
              <option key={c.cityId} value={c.cityId}>{c.cityName}</option>
            ))}
          </select>

          <select
            className="form-select mb-3"
            name="areaId"
            value={formData.areaId}
            onChange={handleChange}
            disabled={!formData.cityId}
            required
          >
            <option value="">Select Area</option>
            {areas.map(a => (
              <option key={a.areaId} value={a.areaId}>{a.areaName}</option>
            ))}
          </select>

          <button className="btn btn-primary w-100">Register</button>
        </form>
      </div>
    </div>
  );
}

export default Register;
