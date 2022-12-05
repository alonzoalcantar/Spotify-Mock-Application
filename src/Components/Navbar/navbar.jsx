import { Link } from "react-router-dom"

export default function Navbar({user, setUser}){
    return(
        <nav>
            <Link to='/home'>Home</Link>
            &nbsp; | &nbsp;
            <Link to='/profile'>Profile</Link>
            &nbsp; | &nbsp;
            <p>Welcome: {user.name}</p> 
        
        </nav>
    )
}