import { NavLink } from "react-router-dom";

export default function Navbar() {
  return (
    <nav className="msone-navbar">
      <div className="msone-nav-content">
        {/* Brand Area with Image Logo */}
        <div className="msone-logo-area">
          <img 
            src="/images/MS1-4.png" 
            alt="MS1 Logo" 
            className="msone-logo-img" 
          />

          <span className="msone-logo-text">Manager</span>
        </div>
        
        {/* Navigation Links */}
        <ul className="msone-nav-links">
          <li>
            <NavLink to="/FilComp" className={({ isActive }) => isActive ? "active" : ""}>
              Filter
            </NavLink>
          </li>
          <li>
            <NavLink to="/addComp" className={({ isActive }) => isActive ? "active" : ""}>
              Add Product
            </NavLink>
          </li>
        </ul>
      </div>
    </nav>
  );
}