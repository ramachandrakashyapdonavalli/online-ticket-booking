import { Navigate, useLocation } from "react-router-dom";
import { useUsers } from "../data/UsersContext";

function UserProtectedRoute({ children }) {
  const { currentUser } = useUsers();
  const location = useLocation();

  if (!currentUser) {
    return (
      <Navigate
        to="/login"
        state={{ from: location }}
        replace
      />
    );
  }

  return children;
}

export default UserProtectedRoute;