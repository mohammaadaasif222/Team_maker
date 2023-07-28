import { AiOutlineUserAdd } from "react-icons/ai";
import { BiUserX } from "react-icons/bi";
import { addToTeam } from "./redux/features/teamSlice";
import { useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import { saveTeamToLocalStorage } from "./redux/features/teamSlice";
import { useSelector } from "react-redux";
function SmallCard({ data }) {
  const dispatch = useDispatch();
  const {item}  = useSelector((state)=> state.team)

  const teamHandler = (user) => {
    dispatch(addToTeam(user));
    saveTeamToLocalStorage(item)
  };

  return (
    <div className="col-md-3 p-3 ">
      <div className=" card mb-3 ">
        <div className="card-body border">
          <div className="text-center pb-3 ">
            <h5 className="my-3 bg-light text-muted pt-2 pb-2">
              Name : {data.first_name} {data.last_name}
            </h5>
            <Link to={`/profile/${data._id}`} title="Go to Profile">
            <img
              src={data.avatar}
              alt="avatar"
              className="rounded-circle img-fluid border"
              style={{ width: "150px" }}
            />
            </Link>
          </div>
          <hr />
          <p className="text-muted mb-1 bg-light">Email : {data.email}</p>
          <p className="text-muted mb-1 bg-light">Gender : {data.gender}</p>
          <p className="text-muted mb-1 bg-light">Domain : {data.domain}</p>
          <p className="text-muted mb-4 bg-light">
            Bay Area, San Francisco, ID : {data.id}
          </p>
          <div
            className="mb-2 "
            style={{ display: "flex", justifyContent: "space-between" }}
          >
            <button
              type="button"
              className={
                data.available ? "btn btn-success " : " btn btn-danger"
              }
            >
              {data.available ? "Available" : "Unavailable"}
            </button>
            <button
              type="button"
              className={
                data.available ? "btn btn-success ml-3" : "btn btn-danger ml-3"
              }
              disabled={data.available ? false : true}
              onClick={() => teamHandler(data)}
            >
              {data.available ? <AiOutlineUserAdd /> : <BiUserX />}
            </button>
          </div>
        </div>
      </div>
    </div>

    // <Card
    //   style={{
    //     width: "18rem",
    //   }}
    // >
    //   <img src={data.avatar} alt={data.first_name}  className="w-50"/>
    //   <CardBody>
    //     <CardTitle tag="h5">First Name : {data.first_name}</CardTitle>
    //     <CardSubtitle className="mb-2 text-muted" tag="h6">
    //       Last Name : {data.last_name}
    //     </CardSubtitle>
    //     <CardText>Email : {data.email}</CardText>
    //     <CardText>Gender : {data.gender}</CardText>
    //     <CardText>Domain : {data.domain}</CardText>
    //     <Button className={data.available ? "btn-success" : "btn-danger"}>
    //       {data.available ? "Available" : "Unavailable"}
    //     </Button>
    //     <Button
    //       className={data.available ? "btn-success" : "btn-danger"}
    //       disabled={data.available ? false : true}
    //       onClick={() => teamHandler(data)}
    //     >
    //       {data.available ? "Add to Team" : "Unable to Add"}
    //     </Button>
    //   </CardBody>
    // </Card>
  );
}

export default SmallCard;
