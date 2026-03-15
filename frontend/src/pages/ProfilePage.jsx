import { useState } from "react";
import { useAuthStore } from "../store/useAuthStore";
import { Camera, Mail, User } from "lucide-react";
import "./ProfilePage.css";

const ProfilePage = () => {
  const { authUser, isUpdatingProfile, updateProfile } = useAuthStore();
  const [selectedImg, setSelectedImg] = useState(null);

const handleImageUpload = async (e) => {
  const file = e.target.files[0];
  if (!file) return;

  const reader = new FileReader();

  reader.readAsDataURL(file);

  reader.onload = async () => {
    const base64Image = reader.result;
    setSelectedImg(base64Image);
    await updateProfile({ profilepic: base64Image });
  };
};

  return (
    <div className="profile-page-container">
      <div className="profile-wrapper">
        <div className="profile-card">
          <div className="profile-header">
            <h1>Profile</h1>
            <p>Your profile information</p>
          </div>

          {/* Avatar Upload Section */}
          <div className="avatar-section">
            <div className="avatar-relative">
              <img
                src={selectedImg || authUser.profilepic || "/dimg.jpg"}
                alt="Profile"
                className="profile-img"
              />
              <label htmlFor="avatar-upload" className={`camera-label ${isUpdatingProfile ? "uploading" : ""}`}>
                <Camera className="camera-icon" />
                <input
                  type="file"
                  id="avatar-upload"
                  className="hidden-input"
                  accept="image/*"
                  onChange={handleImageUpload}
                  disabled={isUpdatingProfile}
                />
              </label>
            </div>
            <p className="upload-hint">
              {isUpdatingProfile ? "Uploading..." : "Click the camera icon to update your photo"}
            </p>
          </div>

          {/* User Details Section */}
          <div className="details-section">
            <div className="detail-group">
              <div className="detail-label">
                <User size={16} />
                <span>Name</span>
              </div>
              <p className="detail-value">{authUser?.name}</p>
            </div>

            <div className="detail-group">
              <div className="detail-label">
                <Mail size={16} />
                <span>Email Address</span>
              </div>
              <p className="detail-value">{authUser?.email}</p>
            </div>
          </div>

          {/* Account Information Section */}
          <div className="account-info-card">
            <h2>Account Information</h2>
            <div className="info-rows">
              <div className="info-row">
                <span>Member Since</span>
                <span>{authUser.createdAt?.split("T")[0]}</span>
              </div>
              <div className="info-row">
                <span>Account Status</span>
                <span className="status-active">Active</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfilePage;