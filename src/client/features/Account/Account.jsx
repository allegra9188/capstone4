import { useDispatch } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { logout } from "../auth/authSlice";
import { useGetAccountQuery } from "../auth/authSlice";
import "./account.css"


export default function Account(){
  const { id } = useParams();
  const { data: user, isLoading, isError} = useGetAccountQuery(id);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  

  const handleLogout = () => {
    dispatch(logout());
    navigate('/')
  }

  if (isLoading) {return <div>Loading...</div>}
  
//   if (isError) {return <div>Error loading account</div>}

//   console.log(user)

  return(
    <div id="account-div">
  <h1>Account: {user.email}</h1>
  <h3>First Name: {user.firstName  + " " + user.lastName}</h3>
  <h3>{user.id}</h3>
  {/* <h1>Hello World</h1> */}
  <button id="acct-logout" onClick={handleLogout}>Logout</button>
  </div>
  )
}