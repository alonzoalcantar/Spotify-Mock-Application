import { Link } from "react-router-dom"
import * as userService from '../../utilities/users-service';


export default function Navbar({user, setUser}){


    function handleLogout() {
        userService.logOut();
        setUser(null)
    }


    return(
        <nav>
            <Link to='/home'>Home</Link>
            &nbsp; | &nbsp;
            <Link to='/login2spotify'>Spotify LogIn</Link>
            &nbsp; | &nbsp;
            <Link to='/profile'>Profile</Link>
            &nbsp; | &nbsp;
            <p>Welcome: {user.name}</p> 
            &nbsp; | &nbsp;
            <Link to = '' onClick={handleLogout}>Log Out </Link>
        </nav>
    )
}