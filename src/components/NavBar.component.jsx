import {
    Link
  } from "react-router-dom";
    import '../style/NavBar.style.css'

const NavBar = () => {
    return(
        <nav>
            <li>
            <Link to="/">CURRENT LOCATION</Link>
            </li>
            <li>
            <Link to="/search">SEARCH LOCATION</Link>
            </li>
        </nav>
    )
}
export default NavBar;  