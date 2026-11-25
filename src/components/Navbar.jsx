import { Link, useNavigate } from "react-router-dom";
import { useUsers } from "../data/UsersContext";
import { Ticket, LogOut, UserRound } from "lucide-react";

function Navbar() {
  const { currentUser, logoutUser } = useUsers();
  const navigate = useNavigate();

  function handleLogout() {
    logoutUser();
    navigate("/");
  }

  return (
    <nav className="navbar navbar-expand-lg navbar-dark custom-navbar">
      <div className="container">
        <Link className="navbar-brand" to="/">
          <Ticket size={24} />
          Evently
        </Link>

        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarContent"
        >
          <span className="navbar-toggler-icon"></span>
        </button>

        <div className="collapse navbar-collapse" id="navbarContent">
          <ul className="navbar-nav ms-auto align-items-lg-center">
            {/* Home */}
            <li className="nav-item">
              <Link className="nav-link" to="/">
                Home
              </Link>
            </li>

            {/* Events */}
            <li className="nav-item">
              <Link className="nav-link" to="/events">
                Events
              </Link>
            </li>

            {/* My Bookings */}
            {currentUser && (
              <li className="nav-item">
                <Link className="nav-link" to="/bookings">
                  My Bookings
                </Link>
              </li>
            )}

            {/* Admin Portal */}
            <li className="nav-item">
              <Link className="nav-link" to="/admin/login">
                Admin Portal
              </Link>
            </li>

            {/* Logged-in User */}
            {currentUser ? (
              <>
                <li className="nav-item">
                  <span className="nav-link account-label">
                    <UserRound size={16} />
                    {currentUser.name}
                  </span>
                </li>

                {/* User Logout */}
                <li className="nav-item">
                  <button
                    className="nav-link logout-button"
                    onClick={handleLogout}
                  >
                    <LogOut size={16} />
                    Logout
                  </button>
                </li>
              </>
            ) : (
              /* User Login */
              <li className="nav-item">
                <Link className="nav-link login-nav-link" to="/login">
                  Login / Register
                </Link>
              </li>
            )}
          </ul>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;