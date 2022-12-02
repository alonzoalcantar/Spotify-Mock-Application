import { Link } from "react-router-dom"

export default function Navbar(){
    return(
        <nav>
            <Link to='/home'>Home</Link>
            &nbsp; | &nbsp;
            <Link to='/profile'>Profile</Link>
        </nav>
    )
}