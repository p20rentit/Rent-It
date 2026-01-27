package com.rentit.entities;

import java.util.Set;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.OneToMany;
import jakarta.persistence.Table;

@Entity
@Table(name = "user")
public class User {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "user_id")
    private int userId;

    // ---------- ROLE ----------
    @JsonIgnoreProperties("users")
    @ManyToOne
    @JoinColumn(name = "role_id")
    private Role role;

    // ---------- BASIC DETAILS ----------
    @Column(name = "fname")
    private String fname;

    @Column(name = "mname")
    private String mname;

    @Column(name = "lname")
    private String lname;

    @Column(name = "phone")
    private String phone;

    @Column(name = "email")
    private String email;

    // ---------- DOCUMENT DETAILS ----------
    @Column(name = "driving_licence_no")
    private String drivingLicenceNo;

    @Column(name = "adhar_no")
    private String adharNo;

    @Column(name = "pan_no")
    private String panNo;

    // ---------- AUTH ----------
    @Column(name = "password")
    private String password;

    // ---------- ADDRESS ----------
    @Column(name = "address")
    private String address;

    @JsonIgnoreProperties("users")
    @ManyToOne
    @JoinColumn(name = "area_id")
    private Area area;

    // ---------- OWNER → VEHICLES ----------
    @JsonIgnoreProperties("owner")
    @OneToMany(mappedBy = "owner")
    private Set<Vehicle> vehicles;
    
    
    
    // ---------- Question 
    @ManyToOne
    @JoinColumn(name = "question_id")
    private SecurityQuestion securityQuestion;
    
    // answer
    @Column
    private String answer;

    // ---------- Constructors ----------

    public User() {
        super();
    }

    public User(int userId, Role role, String fname, String mname, String lname,
                String phone, String email, String drivingLicenceNo,
                String adharNo, String panNo, String password,
                String address, Area area) {
        super();
        this.userId = userId;
        this.role = role;
        this.fname = fname;
        this.mname = mname;
        this.lname = lname;
        this.phone = phone;
        this.email = email;
        this.drivingLicenceNo = drivingLicenceNo;
        this.adharNo = adharNo;
        this.panNo = panNo;
        this.password = password;
        this.address = address;
        this.area = area;
    }

    // ---------- Getters & Setters ----------

    public int getUserId() {
        return userId;
    }

    public void setUserId(int userId) {
        this.userId = userId;
    }

    public Role getRole() {
        return role;
    }

    public void setRole(Role role) {
        this.role = role;
    }

    public String getFname() {
        return fname;
    }

    public void setFname(String fname) {
        this.fname = fname;
    }

    public String getMname() {
        return mname;
    }

    public void setMname(String mname) {
        this.mname = mname;
    }

    public String getLname() {
        return lname;
    }

    public void setLname(String lname) {
        this.lname = lname;
    }

    public String getPhone() {
        return phone;
    }

    public void setPhone(String phone) {
        this.phone = phone;
    }

    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public String getDrivingLicenceNo() {
        return drivingLicenceNo;
    }

    public void setDrivingLicenceNo(String drivingLicenceNo) {
        this.drivingLicenceNo = drivingLicenceNo;
    }

    public String getAdharNo() {
        return adharNo;
    }

    public void setAdharNo(String adharNo) {
        this.adharNo = adharNo;
    }

    public String getPanNo() {
        return panNo;
    }

    public void setPanNo(String panNo) {
        this.panNo = panNo;
    }

    public String getPassword() {
        return password;
    }

    public void setPassword(String password) {
        this.password = password;
    }

    public String getAddress() {
        return address;
    }

    public void setAddress(String address) {
        this.address = address;
    }

    public Area getArea() {
        return area;
    }

    public void setArea(Area area) {
        this.area = area;
    }

    public Set<Vehicle> getVehicles() {
        return vehicles;
    }

    public void setVehicles(Set<Vehicle> vehicles) {
        for (Vehicle v : vehicles) {
            v.setOwner(this);
        }
        this.vehicles = vehicles;
    }

	public SecurityQuestion getSecurityQuestion() {
		return securityQuestion;
	}

	public void setSecurityQuestion(SecurityQuestion securityQuestion) {
		this.securityQuestion = securityQuestion;
	}

	public String getAnswer() {
		return answer;
	}

	public void setAnswer(String answer) {
		this.answer = answer;
	}
    
    
}
