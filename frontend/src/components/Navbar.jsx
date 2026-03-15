import { Link } from "react-router-dom";
import { useAuthStore } from "../store/useAuthStore";
import { LogOut, MessageSquare, Settings, User } from "lucide-react";
import "./Navbar.css"; // CSS file import karna mat bhulna

const Navbar = () => {
  const { logout, authUser } = useAuthStore();

  return (
    <header className="navbar-header">
      <div className="navbar-container">
        
        {/* Left Side - Logo */}
        <Link to="/" className="navbar-logo">
          <div className="logo-icon-bg">
            <MessageSquare className="logo-icon-small" />
          </div>
          <h1 className="logo-text">Chatty</h1>
        </Link>

        {/* Right Side - Buttons */}
        <div className="navbar-actions">
          <Link to="/settings" className="nav-btn">
            <Settings className="nav-icon" />
            <span className="nav-text">Settings</span>
          </Link>

          {authUser && (
            <>
              <Link to="/profile" className="nav-btn">
                <User className="nav-icon" />
                <span className="nav-text">Profile</span>
              </Link>

              <button className="nav-btn logout-btn" onClick={logout}>
                <LogOut className="nav-icon" />
                <span className="nav-text">Logout</span>
              </button>
            </>
          )}
        </div>

      </div>
    </header>
  );
};

export default Navbar;