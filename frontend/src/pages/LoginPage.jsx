import { useState } from "react";
import { useAuthStore } from "../store/useAuthStore";
import { Eye, EyeOff, Loader2, Lock, Mail, MessageSquare } from "lucide-react";
import { Link } from "react-router-dom";
import AuthImagePattern from "../components/AuthImagePattern.jsx";
import toast from "react-hot-toast";

// CSS file wahi use kar sakte ho ya login ki alag bana lo
import "./LoginPage.css"; 

const LoginPage = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const { login, isLoggingIn } = useAuthStore();

  // Login Validation logic
  const validateForm = () => {
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
    return true;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const success = validateForm();
    if (success === true) login(formData);
  };

  return (
    <div className="login-container"> {/* Same class as login for consistency */}
      
      {/* LEFT SIDE */}
      <div className="left-side">
        <div className="form-wrapper">
          
          {/* LOGO SECTION */}
          <div className="logo-section">
            <div className="logo-box">
              <MessageSquare size={24} />
            </div>
            <h1>Welcome Back</h1>
            <p className="subtitle">Sign in to your account</p>
          </div>

          {/* FORM */}
          <form onSubmit={handleSubmit} className="login-form">
            
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
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
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
                  onChange={(e) => setFormData({ ...formData, password: e.target.value })}
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
            <button type="submit" className="login-btn" disabled={isLoggingIn}>
              {isLoggingIn ? (
                <div className="loader-box">
                  <Loader2 className="animate-spin" size={20} />
                  <span>Loading...</span>
                </div>
              ) : (
                "Sign In"
              )}
            </button>
          </form>

          {/* FOOTER */}
          <div className="footer-text">
            <p>
              Don&apos;t have an account?{" "}
              <Link to="/signup" className="orange-link">
                Create account
              </Link>
            </p>
          </div>
        </div>
      </div>

      {/* RIGHT SIDE */}
      <div className="right-side">
        <AuthImagePattern
          title="Welcome back!"
          subtitle="Sign in to continue your conversations and catch up with your messages."
        />
      </div>
    </div>
  );
};

export default LoginPage;