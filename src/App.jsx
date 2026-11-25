import { BrowserRouter, Routes, Route } from "react-router-dom";

import Navbar from "./components/Navbar";

import Home from "./pages/Home";
import Events from "./pages/Events";
import EventDetails from "./pages/EventDetails";
import Login from "./pages/Login";
import Checkout from "./pages/Checkout";
import Confirmation from "./pages/Confirmation";
import MyBookings from "./pages/MyBookings";
import UserProtectedRoute from "./pages/UserProtectedRoute";

import AdminLogin from "./admin/AdminLogin";
import AdminProtectedRoute from "./admin/AdminProtectedRoute";
import AdminDashboard from "./admin/AdminDashboard";
import ManageEvents from "./admin/ManageEvents";
import ManageBookings from "./admin/ManageBookings";
import ManageUsers from "./admin/ManageUsers";

import { EventsProvider } from "./data/EventsContext";
import { BookingsProvider } from "./data/BookingsContext";
import { UsersProvider } from "./data/UsersContext";

function Placeholder() {
  return (
    <div className="container empty-state">
      <h2>Page Not Found</h2>
      <p>The page you requested does not exist.</p>
    </div>
  );
}

function App() {
  return (
    <EventsProvider>
      <BookingsProvider>
        <UsersProvider>
          <BrowserRouter>
            <Navbar />

            <Routes>
              {/* Public User Pages */}
              <Route path="/" element={<Home />} />

              <Route path="/events" element={<Events />} />

              <Route
                path="/events/:id"
                element={<EventDetails />}
              />

              <Route path="/login" element={<Login />} />

              {/* Protected User Pages */}
              <Route
                path="/checkout"
                element={
                  <UserProtectedRoute>
                    <Checkout />
                  </UserProtectedRoute>
                }
              />

              <Route
                path="/confirmation"
                element={
                  <UserProtectedRoute>
                    <Confirmation />
                  </UserProtectedRoute>
                }
              />

              <Route
                path="/bookings"
                element={
                  <UserProtectedRoute>
                    <MyBookings />
                  </UserProtectedRoute>
                }
              />

              {/* Admin Login */}
              <Route
                path="/admin/login"
                element={<AdminLogin />}
              />

              {/* Protected Admin Pages */}
              <Route
                path="/admin"
                element={
                  <AdminProtectedRoute>
                    <AdminDashboard />
                  </AdminProtectedRoute>
                }
              />

              <Route
                path="/admin/events"
                element={
                  <AdminProtectedRoute>
                    <ManageEvents />
                  </AdminProtectedRoute>
                }
              />

              <Route
                path="/admin/bookings"
                element={
                  <AdminProtectedRoute>
                    <ManageBookings />
                  </AdminProtectedRoute>
                }
              />

              <Route
                path="/admin/users"
                element={
                  <AdminProtectedRoute>
                    <ManageUsers />
                  </AdminProtectedRoute>
                }
              />

              {/* Fallback */}
              <Route path="*" element={<Placeholder />} />
            </Routes>
          </BrowserRouter>
        </UsersProvider>
      </BookingsProvider>
    </EventsProvider>
  );
}

export default App;