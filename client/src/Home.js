import SmallCard from "./SmallCard";
import { Container, Row, Col, Form, Input, Button } from "reactstrap";
import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import { fetchUser } from "./redux/actions/userActions";
import { useSelector, useDispatch } from "react-redux";
import Pagination from "react-js-pagination";
import "react-responsive-pagination/themes/classic.css";

function Home() {
  const dispatch = useDispatch();
  const { users, resPerPage, countUser } = useSelector(
    (state) => state.users.data
  );
  const loading = useSelector((state) => state.users.loading);
  const {item} = useSelector((state) => state.team);
  const [domain, setDomain] = useState("");
  const [gender, setGender] = useState("");
  const [available, setAvailable] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [currentPage, setCurrentPage] = useState(1);

  useEffect(() => {
    dispatch(
      fetchUser({
        searchQuery: searchTerm,
        currentPage,
        domain,
        gender,
        available,
      })
    );
  }, [dispatch, searchTerm, currentPage, domain, gender, available]);

  const submitHandler = (e) => {
    e.preventDefault();
    dispatch(
      fetchUser({
        searchQuery: searchTerm,
        currentPage,
        domain,
        gender,
        available,
      })
    );
  };

  const handleSearch = (e) => {
    setSearchTerm(e.target.value);
  };

  const handlePageChange = (pageNum) => {
    setCurrentPage(pageNum);
  };

  const handleDomain = (e) => {
    const selectedDomain = e.target.value;
    setDomain(selectedDomain);
  };
  const handleGender = (e) => {
    const selected = e.target.value;
    setGender(selected);
  };
  const handleAvailable = (e) => {
    const selected = e.target.value;
    setAvailable(selected);
  };

  return (
    <>
      <Container fluid className="pb-5">
        <Row className="p-3">
          <Col md={3}>
            <h2>Mohammad</h2>
          </Col>
          <Col md={2}>
            <Link className="text-muted" to="/create">
              Create User
            </Link>
          </Col>
          <Col md={4}>
            {" "}
            <Form
              className="form-inline my-2 my-lg-0 d-flex align-items-center"
              onSubmit={submitHandler}
            >
              <Input type="text" value={searchTerm} onChange={handleSearch} />
              <Button className="btn btn-primary my-2 my-sm-0" type="submit">
                Search
              </Button>
            </Form>
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
                Team Members : {item.length}
              </Link>
            </p>
          </Col>
        </Row>
        <Row style={{ backgroundColor: "#eee" }} className="pt-5">
          <Col md={3}>
            <div>
              <label>Domain :</label>
              <select name="domain" onChange={handleDomain}>
                <option value="">All</option>
                <option value="IT">IT</option>
                <option value="Marketing">Marketing</option>
                <option value="Sales">Sales</option>
                <option value="UI Designing">UI Designing</option>
                <option value="Management">Management</option>
                <option value="Business Development">
                  Business Development
                </option>
              </select>
            </div>
            <hr />
            <div>
              <label>Gender:</label>
              <select name="gender" onChange={handleGender}>
                <option value="">All</option>
                <option value="Male">Male</option>
                <option value="Female">Female</option>
                <option value="Bigender">Bigender</option>
                <option value="Agender">Agender</option>
              </select>
            </div>
            <hr />
            <div>
              <label>
                Available:
                <input
                  type="checkbox"
                  name="available"
                  value={available ? false : true}
                  checked={available}
                  onChange={handleAvailable}
                />
              </label>
            </div>
          </Col>
          {!users ? (
            <h1 className="text-center">No user Found.</h1>
          ) : loading ? (
            <h1 className="text-center">Loading...</h1>
          ) : (
            users.map((user, index) => {
              return <SmallCard key={index} data={user} />;
            })
          )}
        </Row>
        {countUser ? (
          <Row>
            <Col md={6}  className="m-auto">
              <Pagination
                activePage={currentPage}
                itemsCountPerPage={resPerPage}
                totalItemsCount={countUser}
                pageRangeDisplayed={5}
                onChange={handlePageChange}
                nextPageText="Next"
                prevPageText="Prev"
                lastPageText="Last"
                firstPageText="First"
                itemClass="page-item"
                linkClass="page-link"
              />
            </Col>
          </Row>
        ) : (
          ""
        )}
      </Container>
    </>
  );
}
export default Home;
