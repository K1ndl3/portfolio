import { Link } from 'react-router-dom'
import './NavBar.css'

function NavBar() {
  return (
    <nav className="navbar" aria-label="Main">
      <Link to="/" className="navbar__link">
        <h3 tabIndex={-1}>Home</h3>
      </Link>
      <Link to="/showcase" className="navbar__link">
        <h3 tabIndex={-1}>Showcase</h3>
      </Link>
      <Link to="/about" className="navbar__link">
        <h3 tabIndex={-1}>About</h3>
      </Link>
    </nav>
  )
}

export default NavBar
