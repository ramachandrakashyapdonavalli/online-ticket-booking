import { Link, useNavigate } from "react-router-dom";
import {
  CalendarDays,
  Ticket,
  Users,
  IndianRupee,
  ArrowRight,
  LogOut,
} from "lucide-react";

import { useEvents } from "../data/EventsContext";
import { useBookings } from "../data/BookingsContext";
import { useUsers } from "../data/UsersContext";

function AdminDashboard() {
  const { events } = useEvents();
  const { bookings } = useBookings();
  const { users } = useUsers();

  const navigate = useNavigate();

  // Admin Logout
  function handleAdminLogout() {
    localStorage.removeItem("evently_admin_session");
    navigate("/admin/login");
  }

  // Confirmed Bookings
  const confirmedBookings = bookings.filter(
    (booking) => booking.status === "Confirmed"
  );

  // Total Tickets Sold
  const totalTickets = confirmedBookings.reduce(
    (total, booking) => total + booking.seats.length,
    0
  );

  // Total Revenue
  const revenue = confirmedBookings.reduce(
    (total, booking) => total + booking.totalAmount,
    0
  );

  // Dashboard Statistics
  const stats = [
    {
      label: "Total Events",
      value: events.length,
      icon: CalendarDays,
    },
    {
      label: "Tickets Sold",
      value: totalTickets,
      icon: Ticket,
    },
    {
      label: "Total Users",
      value: users.length,
      icon: Users,
    },
    {
      label: "Revenue",
      value: `₹${revenue.toLocaleString("en-IN")}`,
      icon: IndianRupee,
    },
  ];

  // Admin Actions
  const actions = [
    {
      title: "Manage Events",
      description: "Create, edit and delete events.",
      link: "/admin/events",
      icon: CalendarDays,
    },
    {
      title: "Manage Bookings",
      description: "View and cancel customer bookings.",
      link: "/admin/bookings",
      icon: Ticket,
    },
    {
      title: "Manage Users",
      description: "View and activate or deactivate accounts.",
      link: "/admin/users",
      icon: Users,
    },
  ];

  return (
    <div className="container admin-dashboard">

      {/* Dashboard Header */}
      <div className="admin-page-header">
        <div>
          <h1>Admin Dashboard</h1>
          <p>Manage your event booking platform.</p>
        </div>

        <button
          className="btn-danger-custom"
          onClick={handleAdminLogout}
        >
          <LogOut size={18} />
          Admin Logout
        </button>
      </div>

      {/* Statistics */}
      <div className="admin-stats-grid">
        {stats.map((stat) => {
          const Icon = stat.icon;

          return (
            <div className="admin-stat-card" key={stat.label}>
              <Icon size={26} />

              <h3>{stat.value}</h3>

              <p>{stat.label}</p>
            </div>
          );
        })}
      </div>

      {/* Admin Management Cards */}
      <div className="admin-actions-grid">
        {actions.map((action) => {
          const Icon = action.icon;

          return (
            <Link
              to={action.link}
              className="admin-action-card"
              key={action.title}
            >
              <Icon size={30} />

              <h3>{action.title}</h3>

              <p>{action.description}</p>

              <span>
                Manage <ArrowRight size={16} />
              </span>
            </Link>
          );
        })}
      </div>

    </div>
  );
}

export default AdminDashboard;