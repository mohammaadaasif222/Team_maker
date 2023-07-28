import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { fetchSingleUser, deleteUser } from "./redux/actions/userActions";
import Nav from "./Nav";

import {
  MDBCol,
  MDBContainer,
  MDBRow,
  MDBCard,
  MDBCardTitle,
  MDBCardText,
  MDBCardBody,
  MDBCardImage,
  MDBBtn,
} from "mdb-react-ui-kit";

function Update() {
  const dispatch = useDispatch();
  const [message, setMessage] = useState("");
  const [formData, setFormData] = useState({
    first_name: "",
    last_name: "",
    domain: "",
    gender: "",
    email: "",
    avatar: null,
  });
  const { user } = useSelector((state) => state.user);

  const { _id } = useParams();
  useEffect(() => {
    dispatch(fetchSingleUser({ _id: _id }));

    if(!user){
      return
    }
    setFormData((prevFormData) => ({
      ...prevFormData,
      first_name: user.first_name,
      last_name: user.last_name,
      domain: user.domain,
      gender: user.gender,
      email: user.email,
      avatar: user.avatar,
    }));
  }, [dispatch, _id]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevFormData) => ({
      ...prevFormData,
      [name]: value,
    }));
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    setFormData((prevFormData) => ({
      ...prevFormData,
      avatar: file,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formDataToSend = new FormData();
    formDataToSend.append("first_name", formData.first_name);
    formDataToSend.append("last_name", formData.last_name);
    formDataToSend.append("domain", formData.domain);
    formDataToSend.append("gender", formData.gender);
    formDataToSend.append("email", formData.email);
    formDataToSend.append("avatar", formData.avatar);

    const url = `https://team-builder.onrender.com/api/users/${_id}`;
    try {
      const response = await fetch(url, {
        method: "PUT",
        body: formDataToSend,
      });

      if (!response.ok) {
        throw new Error("Network response was not ok.");
      }

      const responseData = await response.json();
      console.log(responseData);
      if (responseData) {
        setMessage("User Update Successfully!");
      }
    } catch (error) {
      console.error("Error sending POST request:", error);
    }
  };

  return (
    <section className="gradient-custom">
      <div className="container-fluid">
        <Nav />
      </div>
      <div className="container py-5">
        <div className="row justify-content-center align-items-center h-100">
          <div className="col-12 col-lg-9 col-xl-6">
            <div
              className="card shadow-2-strong card-registration"
              style={{ borderRadius: "15px" }}
            >
              <div className="card-body p-4 p-md-5">
                <h3 className="mb-4 pb-2 pb-md-0 mb-md-5">Update User</h3>
                {message || (
                  <form onSubmit={handleSubmit}>
                    <div className="row">
                      <div className="col-md-6 mb-4">
                        <div className="form-outline">
                          <input
                            type="text"
                            id="first_name"
                            name="first_name"
                            className="form-control form-control-lg"
                            value={formData.first_name}
                            onChange={handleChange}
                          />
                          <label className="form-label" htmlFor="first_name">
                            First Name
                          </label>
                        </div>
                      </div>
                      <div className="col-md-6 mb-4">
                        <div className="form-outline">
                          <input
                            type="text"
                            id="last_name"
                            name="last_name"
                            className="form-control form-control-lg"
                            value={formData.last_name}
                            onChange={handleChange}
                          />
                          <label className="form-label" htmlFor="last_name">
                            Last Name
                          </label>
                        </div>
                      </div>
                    </div>

                    <div className="row">
                      <div className="col-md-6 mb-4 d-flex align-items-center">
                        <div className="form-outline datepicker w-100">
                          <input
                            type="text"
                            className="form-control form-control-lg"
                            id="domain"
                            name="domain"
                            value={formData.domain}
                            onChange={handleChange}
                          />
                          <label htmlFor="domain" className="form-label">
                            Domain
                          </label>
                        </div>
                      </div>
                      <div className="col-md-6 mb-4">
                        <h6 className="mb-2 pb-1">Gender: </h6>

                        <div className="form-check form-check-inline">
                          <input
                            className="form-check-input"
                            type="radio"
                            name="gender"
                            value="Female"
                            checked={formData.gender === "Female"}
                            onChange={handleChange}
                          />
                          <label
                            className="form-check-label"
                            htmlFor="femaleGender"
                          >
                            Female
                          </label>
                        </div>

                        <div className="form-check form-check-inline">
                          <input
                            className="form-check-input"
                            type="radio"
                            name="gender"
                            id="maleGender"
                            value="Male"
                            checked={formData.gender === "Male"}
                            onChange={handleChange}
                          />
                          <label
                            className="form-check-label"
                            htmlFor="maleGender"
                          >
                            Male
                          </label>
                        </div>

                        <div className="form-check form-check-inline">
                          <input
                            className="form-check-input"
                            type="radio"
                            name="gender"
                            value="other"
                            checked={formData.gender === "Other"}
                            onChange={handleChange}
                          />
                          <label
                            className="form-check-label"
                            htmlFor="otherGender"
                          >
                            Other
                          </label>
                        </div>
                      </div>
                    </div>

                    <div className="row">
                      <div className="col-md-6 mb-4 pb-2">
                        <div className="form-outline">
                          <input
                            type="email"
                            id="email"
                            name="email"
                            className="form-control form-control-lg"
                            value={formData.email}
                            onChange={handleChange}
                          />
                          <label className="form-label" htmlFor="email">
                            Email
                          </label>
                        </div>
                      </div>
                      <div className="col-md-6 mb-4 pb-2">
                        <div className="form-outline">
                          <input
                            type="file"
                            name="avatar"
                            id="avatar"
                            className="form-control form-control-lg"
                            accept="image/*"
                            onChange={handleFileChange}
                          />
                          <label className="form-label" htmlFor="avatar">
                            Avatar
                          </label>
                        </div>
                      </div>
                    </div>

                    <div className="mt-4 pt-2">
                      <input
                        className="btn btn-primary btn-lg"
                        type="submit"
                        value="Submit"
                      />
                    </div>
                  </form>
                )}
              </div>
            </div>
          </div>
          <div className="col-md-6">
            <MDBContainer>
              {!user ? (
                <h1 className="text-center">Loading...</h1>
              ) : (
                <MDBCard style={{ borderRadius: "15px" }}>
                  <MDBCardBody className="p-4">
                    <div className="d-flex text-black">
                      <div className="flex-shrink-0">
                        <MDBCardImage
                          style={{ width: "180px", borderRadius: "10px" }}
                          src={user.avatar}
                          alt="Generic placeholder image"
                        />
                      </div>
                      <div className="flex-grow-1 ms-3">
                        <MDBCardTitle>
                          {user.first_name} {user.last_name}
                        </MDBCardTitle>
                        <MDBCardText>{user.domain}</MDBCardText>

                        <div
                          className="d-flex justify-content-start rounded-3 p-2 mb-2"
                          style={{ backgroundColor: "#efefef" }}
                        >
                          <div>
                            <p className="small text-muted mb-1">Gender</p>
                            <p className="mb-0">{user.gender}</p>
                          </div>
                          <div className="px-3">
                            <p className="small text-muted mb-1">Available</p>
                            <p
                              className={`mb-0 ${
                                user.available ? "text-success" : "text-danger"
                              }`}
                            >
                              {user.available ? "Available" : "Unavailable"}
                            </p>
                          </div>
                          <div>
                            <p className="small text-muted mb-1">Email</p>
                            <p className="mb-0">{user.email}</p>
                          </div>
                        </div>
                      </div>
                    </div>
                  </MDBCardBody>
                </MDBCard>
              )}
            </MDBContainer>
          </div>
        </div>
      </div>
    </section>
  );
}

export default Update;
