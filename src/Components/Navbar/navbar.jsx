import { Link } from "react-router-dom"
import * as userService from '../../utilities/users-service';
import { Container, Form } from "react-bootstrap";
import { useState } from "react";

export default function Navbar({user, setUser}){




    const [search , setSearch] = useState('');

    function handleLogout() {
        userService.logOut();
        setUser(null)
    }


    return(
        <nav>
            <Link to='/home'>Home</Link>
            &nbsp; | &nbsp;
            <Link to='/profile'>Profile</Link>
            &nbsp; | &nbsp;
            <Link to = '' onClick={handleLogout}>Log Out </Link>
            &nbsp; | &nbsp;
            <Link to = '/search' >Search</Link>
            &nbsp; | &nbsp;

            <p>Welcome: {user.name}</p> 
        </nav>
    )
}