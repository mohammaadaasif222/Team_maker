import React, { useEffect } from "react";
import { useParams } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { fetchSingleUser, deleteUser } from "./redux/actions/userActions";
import { addToTeam } from "./redux/features/teamSlice";
import { clearMessage } from "./redux/features/userSlice";
import {saveTeamToLocalStorage} from "./redux/features/teamSlice"
import Nav from './Nav'

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

const Profile = () => {
  const dispatch = useDispatch();
  const { item } = useSelector((state) => state.team);
  const { user, loading, error, message } = useSelector((state) => state.user);
  const { _id } = useParams();

  useEffect(() => {
    dispatch(clearMessage());
    dispatch(fetchSingleUser({ _id: _id }));
  }, [dispatch, _id]);

  const teamHandler = (user) => {
    dispatch(addToTeam(user));
    saveTeamToLocalStorage(item)
  };

  const handleDelete = () => {
    dispatch(deleteUser(_id));
  };

  return (
    <div className="vh-100">
      <Nav userId={_id}/>
      <MDBContainer>
        <MDBRow className="justify-content-center">
          <MDBCol md="9" lg="7" xl="8" className="mt-5">
            {!user || loading ? (
              <h1 className="text-center">Loading...</h1>
            ) : (
              <MDBCard style={{ borderRadius: "15px" }}>
                <MDBCardBody className="p-4">
                  {message ? (
                    <div className="alert-danger text-center">{message}</div>
                  ) : (
                    <div className="d-flex text-black">
                      <div className="flex-shrink-0">
                        <MDBCardImage
                          style={{ width: "180px", borderRadius: "10px" }}
                          src={user.avatar}
                          alt="Generic placeholder image"
                          fluid
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
                        <div className="d-flex pt-1">
                          <MDBBtn
                            outline
                            className="me-1 flex-grow-1"
                            disabled={user.available ? false : true}
                            onClick={() => teamHandler(user)}
                          >
                            {user.available ? "Add To Team " : "Unavailable"}
                          </MDBBtn>
                          <MDBBtn
                            className="flex-grow-1"
                            onClick={handleDelete}
                          >
                            Delete User
                          </MDBBtn>
                        </div>
                      </div>
                    </div>
                  )}
                </MDBCardBody>
              </MDBCard>
            )}
          </MDBCol>
        </MDBRow>
      </MDBContainer>
    </div>
  );
};

export default Profile;
