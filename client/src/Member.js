import { useSelector , useDispatch} from "react-redux";
import {Container} from "reactstrap";
import {removeFromTeam} from './redux/features/teamSlice'
import {HiUserRemove } from "react-icons/hi";
import { Link } from "react-router-dom";
import { removeFromTeamLocalStorage,loadTeamFromLocalStorage } from "./redux/features/teamSlice";
import { useEffect, useState } from "react";


function Members() {
  const [teams, setTeams] = useState([])
  const dispatch = useDispatch()
  const {item} = useSelector((state) => state.team);

  useEffect(()=>{
    setTeams(loadTeamFromLocalStorage())
  },[])
  const teamHandler=(id)=>{
  dispatch(removeFromTeam(id))
  removeFromTeamLocalStorage(id)
  }

  return (
    <Container>
      <div class="container mt-5 p-3 rounded cart">
        <div class="row no-gutters">
          <div class="col-md-8">
            <div class="product-details mr-2">
              <div class="d-flex flex-row align-items-center bg-light">
                <span class="ml-2"><Link to='/'>All Members</Link></span>
              </div>
              <hr />
              <h6 class="mb-0 bg-light">Members</h6>
              <div class="d-flex justify-content-between"></div>
              {item.map((user, index) => {
                return (
                  <div key={index}>
                    <div class="d-flex justify-content-between align-items-center mt-3 p-2 items rounded bg-light">
                      <div class="d-flex flex-row">
                        <img class="rounded border mx-2" src={user.avatar} width="40" />
                        <div class="ml-2">
                          <span class="font-weight-bold d-block ">
                           Name: {user.first_name} {user.last_name}
                          </span>
                          <span class="spec">Domain: {user.domain}</span>
                        </div>
                      </div>
                      <div class="d-flex flex-row align-items-center">
                       <button title="Remove from team" className="btn btn-danger" onClick={()=> teamHandler(user.id)}><HiUserRemove/></button>
                        <i class="fa fa-trash-o ml-3 text-black-50"></i>
                      </div>
                    </div>
                    <hr />
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </Container>
  );
}

export default Members;
