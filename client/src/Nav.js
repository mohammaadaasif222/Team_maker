import React from "react";
import { Container, Row, Col, Form, Input, Button } from "reactstrap";
import { Link } from "react-router-dom";

const Nav = ({userId}) => {
  return (
    <Row className="p-3 border">
      <Col md={3}>
        <h2>Mohammad</h2>
      </Col>
      <Col
        md={6}
        style={{
          display: "flex",
          justifyContent: "left",
          alignItems: "center",
        }}
      >
        <p>
          <Link className="text-muted" to="/">
            Back to Home
          </Link> / 
          <Link className="text-muted" to="/create">
            Create User
          </Link> / 
          {userId ? <Link  to={`/update/${userId}`} className="text-muted" >Edit User</Link>  : '' }
        </p>
      </Col>
      <Col
        md={3}
        style={{
          display: "flex",
          justifyContent: "space-around",
          alignItems: "center",
        }}
      >
        <p>
          {" "}
          <Link className="text-muted" to="/members">
            Team Members : {0}
          </Link>
        </p>
      </Col>
    </Row>
  );
};

export default Nav;
