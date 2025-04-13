import {Link} from 'react-router-dom';
import './navbar.css';
const Navbar=()=>{
    return(
        <nav className="navbar">
            <div className="header">
                <Link to="/">Home</Link>
                <Link to="/register">Register</Link>
                <Link to="/login">Login</Link>
            </div>
        </nav>
    )
}
export default Navbar;