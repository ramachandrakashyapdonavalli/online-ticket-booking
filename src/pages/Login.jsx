import { useState } from "react";
import { useUsers } from "../data/UsersContext";
import { useNavigate, useLocation } from "react-router-dom";

function Login() {
  const { loginUser, registerUser } = useUsers();
  const navigate = useNavigate();
  const location = useLocation();

  // Redirect to the previously requested page or Events
  const redirectTo = location.state?.from?.pathname || "/events";

  const [mode, setMode] = useState("login");
  const [message, setMessage] = useState("");

  const [form, setForm] = useState({
    name: "",
    email: "",
    phone: "",
    password: "",
    confirmPassword: "",
  });

  // Handle input changes
  function handleChange(e) {
    setForm((previous) => ({
      ...previous,
      [e.target.name]: e.target.value,
    }));
  }

  // Handle Login and Registration
  function handleSubmit(e) {
    e.preventDefault();
    setMessage("");

    // Registration
    if (mode === "register") {
      if (form.password !== form.confirmPassword) {
        setMessage("Passwords do not match.");
        return;
      }

      if (form.password.length < 6) {
        setMessage("Password must contain at least 6 characters.");
        return;
      }

      const result = registerUser({
        name: form.name,
        email: form.email,
        phone: form.phone,
        password: form.password,
      });

      if (!result.success) {
        setMessage(result.message);
        return;
      }

      navigate(redirectTo, { replace: true });
      return;
    }

    // Login
    const result = loginUser(form.email, form.password);

    if (!result.success) {
      setMessage(result.message);
      return;
    }

    navigate(redirectTo, { replace: true });
  }

  return (
    <div className="auth-page">
      <div className="auth-card">
        <h1>
          {mode === "login" ? "Welcome Back" : "Create Account"}
        </h1>

        <p>
          {mode === "login"
            ? "Login to continue booking events."
            : "Register to start booking tickets."}
        </p>

        {/* Login/Register Tabs */}
        <div className="auth-tabs">
          <button
            type="button"
            className={mode === "login" ? "active" : ""}
            onClick={() => {
              setMode("login");
              setMessage("");
            }}
          >
            Login
          </button>

          <button
            type="button"
            className={mode === "register" ? "active" : ""}
            onClick={() => {
              setMode("register");
              setMessage("");
            }}
          >
            Register
          </button>
        </div>

        <form onSubmit={handleSubmit}>
          {/* Registration Fields */}
          {mode === "register" && (
            <>
              <div className="form-group">
                <label>Name</label>

                <input
                  name="name"
                  value={form.name}
                  onChange={handleChange}
                  placeholder="Full name"
                  required
                />
              </div>

              <div className="form-group">
                <label>Phone</label>

                <input
                  name="phone"
                  type="tel"
                  value={form.phone}
                  onChange={handleChange}
                  placeholder="Phone number"
                  required
                />
              </div>
            </>
          )}

          {/* Email */}
          <div className="form-group">
            <label>Email</label>

            <input
              name="email"
              type="email"
              value={form.email}
              onChange={handleChange}
              placeholder="Email address"
              required
            />
          </div>

          {/* Password */}
          <div className="form-group">
            <label>Password</label>

            <input
              name="password"
              type="password"
              value={form.password}
              onChange={handleChange}
              placeholder="Password"
              required
            />
          </div>

          {/* Confirm Password */}
          {mode === "register" && (
            <div className="form-group">
              <label>Confirm Password</label>

              <input
                name="confirmPassword"
                type="password"
                value={form.confirmPassword}
                onChange={handleChange}
                placeholder="Confirm password"
                required
              />
            </div>
          )}

          {/* Error Message */}
          {message && (
            <div className="auth-error">
              {message}
            </div>
          )}

          {/* Submit */}
          <button
            type="submit"
            className="btn-primary-custom auth-submit"
          >
            {mode === "login" ? "Login" : "Create Account"}
          </button>
        </form>

        {/* Switch Login/Register */}
        <p className="auth-switch">
          {mode === "login"
            ? "Don't have an account?"
            : "Already have an account?"}

          <button
            type="button"
            onClick={() => {
              setMode(mode === "login" ? "register" : "login");
              setMessage("");
            }}
          >
            {mode === "login" ? "Register" : "Login"}
          </button>
        </p>
      </div>
    </div>
  );
}

export default Login;