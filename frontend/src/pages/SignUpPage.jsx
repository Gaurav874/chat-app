import { useState } from "react";
import { useAuthStore } from "../store/useAuthStore";
import { Eye, EyeOff, Loader2, Lock, Mail, MessageSquare, User } from "lucide-react";
import { Link } from "react-router-dom";
import AuthImagePattern from "../components/AuthImagePattern.jsx";
import toast from "react-hot-toast";

import "./SignUpPage.css";

const SignUpPage = () => {
  const { signup, isSigningUp } = useAuthStore();

  const [showPassword, setShowPassword] = useState(false);

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
  });

  // form validation
  const validateForm = () => {
    if (!formData.name.trim()) {
      toast.error("name is required");
      return false;
    }

    if (!formData.email.trim()) {
      toast.error("Email is required");
      return false;
    }

    if (!/\S+@\S+\.\S+/.test(formData.email)) {
      toast.error("Invalid email format");
      return false;
    }

    if (!formData.password) {
      toast.error("Password is required");
      return false;
    }

    if (formData.password.length < 6) {
      toast.error("Password must be at least 6 characters");
      return false;
    }

    return true;
  };

  // submit handler
  const handleSubmit = (e) => {
    e.preventDefault();

    const isValid = validateForm();

    if (isValid) {
      signup(formData);
    }
  };

  return (
    <div className="signup-container">

      {/* LEFT SIDE */}
      <div className="left-side">
        <div className="form-wrapper">

          {/* LOGO */}
          <div className="logo-section">
            <div className="logo-box">
              <MessageSquare size={24} />
            </div>

            <h1>Create Account</h1>
            <p className="subtitle">
              Get started with your free account
            </p>
          </div>

          {/* FORM */}
          <form onSubmit={handleSubmit} className="signup-form">

            {/* FULL NAME */}
            <div className="input-group">
              <label>Full Name</label>

              <div className="relative-container">
                <User size={20} className="field-icon" />

                <input
                  type="text"
                  className="input-bordered"
                  placeholder="John Doe"
                  value={formData.name}
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      name: e.target.value,
                    })
                  }
                />
              </div>
            </div>

            {/* EMAIL */}
            <div className="input-group">
              <label>Email</label>

              <div className="relative-container">
                <Mail size={20} className="field-icon" />

                <input
                  type="email"
                  className="input-bordered"
                  placeholder="you@example.com"
                  value={formData.email}
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      email: e.target.value,
                    })
                  }
                />
              </div>
            </div>

            {/* PASSWORD */}
            <div className="input-group">
              <label>Password</label>

              <div className="relative-container">
                <Lock size={20} className="field-icon" />

                <input
                  type={showPassword ? "text" : "password"}
                  className="input-bordered"
                  placeholder="••••••••"
                  value={formData.password}
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      password: e.target.value,
                    })
                  }
                />

                <button
                  type="button"
                  className="eye-icon-btn"
                  onClick={() => setShowPassword(!showPassword)}
                >
                  {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                </button>
              </div>
            </div>

            {/* SUBMIT BUTTON */}
            <button
              type="submit"
              className="signup-btn"
              disabled={isSigningUp}
            >
              {isSigningUp ? (
                <div className="loader-box">
                  <Loader2 className="animate-spin" size={20} />
                  <span>Loading...</span>
                </div>
              ) : (
                "Create Account"
              )}
            </button>
          </form>

          {/* FOOTER */}
          <div className="footer-text">
            <p>
              Already have an account?{" "}
              <Link to="/login" className="orange-link">
                Sign in
              </Link>
            </p>
          </div>

        </div>
      </div>

      {/* RIGHT SIDE */}
      <div className="right-side">
        <AuthImagePattern
          title="Join our community"
          subtitle="Connect with friends, share moments, and stay in touch with your loved ones."
        />
      </div>

    </div>
  );
};

export default SignUpPage;