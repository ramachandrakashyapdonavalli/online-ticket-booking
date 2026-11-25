import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { ShieldCheck } from "lucide-react";

function AdminLogin() {
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  function handleLogin(e) {
    e.preventDefault();

    // Demo-only credentials
    if (
      email.trim().toLowerCase() === "admin@evently.com" &&
      password === "Admin123"
    ) {
      localStorage.setItem("evently_admin_session", "true");
      navigate("/admin");
    } else {
      setError("Invalid admin email or password.");
    }
  }

  return (
    <div className="admin-login-page">
      <div className="admin-login-card">
        <div className="admin-login-icon">
          <ShieldCheck size={40} />
        </div>

        <h1>Admin Portal</h1>
        <p>Sign in to manage the ticket booking platform.</p>

        <form onSubmit={handleLogin}>
          <div className="form-group">
            <label>Admin Email</label>
            <input
              type="email"
              placeholder="Enter admin email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>

          <div className="form-group">
            <label>Password</label>
            <input
              type="password"
              placeholder="Enter password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>

          {error && <div className="admin-login-error">{error}</div>}

          <button
            type="submit"
            className="btn-primary-custom admin-login-button"
          >
            Login as Admin
          </button>
        </form>

        <div className="admin-demo-credentials">
          <h4>Demo Credentials</h4>
          <p><strong>Email:</strong> admin@evently.com</p>
          <p><strong>Password:</strong> Admin123</p>
        </div>
      </div>
    </div>
  );
}

export default AdminLogin;