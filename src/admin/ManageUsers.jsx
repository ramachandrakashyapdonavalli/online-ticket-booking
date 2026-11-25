import { useState } from "react";
import { useUsers } from "../data/UsersContext";
import { useBookings } from "../data/BookingsContext";

function ManageUsers() {
  const { users, toggleUserStatus } = useUsers();
  const { bookings } = useBookings();

  const [search, setSearch] = useState("");

  const filteredUsers = users.filter((user) =>
    [user.name, user.email, user.phone].some((value) =>
      value?.toLowerCase().includes(search.toLowerCase())
    )
  );

  const activeUsers = users.filter(
    (user) => user.status === "Active"
  );

  const inactiveUsers = users.filter(
    (user) => user.status === "Inactive"
  );

  function getUserBookingCount(user) {
    return bookings.filter(
      (booking) => booking.customerId === user.id
    ).length;
  }

  return (
    <div className="container admin-users-page">
      <div className="admin-page-header">
        <div>
          <h1>Manage Users</h1>
          <p>Manage registered user accounts.</p>
        </div>
      </div>

      <div className="admin-stats-grid">
        <div className="admin-stat-card">
          <h3>{users.length}</h3>
          <p>Total Users</p>
        </div>

        <div className="admin-stat-card">
          <h3>{activeUsers.length}</h3>
          <p>Active Users</p>
        </div>

        <div className="admin-stat-card">
          <h3>{inactiveUsers.length}</h3>
          <p>Inactive Users</p>
        </div>
      </div>

      <div className="admin-section-card">
        <div className="admin-search-row">
          <h2>Registered Users</h2>

          <input
            type="search"
            placeholder="Search users..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>

        {filteredUsers.length === 0 ? (
          <div className="empty-state">
            <p>No users found.</p>
          </div>
        ) : (
          <div className="admin-user-list">
            {filteredUsers.map((user) => (
              <div className="admin-user-card" key={user.id}>
                <div className="admin-user-info">
                  <h3>{user.name}</h3>

                  <p>{user.email}</p>
                  <p>{user.phone}</p>
                  <p>Registered: {user.registeredAt}</p>
                  <p>
                    Bookings: {getUserBookingCount(user)}
                  </p>

                  <span
                    className={`status-badge ${
                      user.status === "Active"
                        ? "status-confirmed"
                        : "status-cancelled"
                    }`}
                  >
                    {user.status}
                  </span>
                </div>

                <button
                  className={
                    user.status === "Active"
                      ? "btn-danger-custom"
                      : "btn-primary-custom"
                  }
                  onClick={() => toggleUserStatus(user.id)}
                >
                  {user.status === "Active"
                    ? "Deactivate"
                    : "Activate"}
                </button>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

export default ManageUsers;