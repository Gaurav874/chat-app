import { useEffect, useState } from "react";
import { useChatStore } from "../store/useChatStore";
import SidebarSkeleton from "./skeletons/SidebarSkeleton";
import { Users } from "lucide-react";
// import "./Sidebar.css"; 
import "../pages/HomePage.css"
import { useAuthStore } from "../store/useAuthStore";

const Sidebar = () => {
  const { getUsers, users, selectedUser, setSelectedUser, isUsersLoading } = useChatStore();

  const {onlineUsers} = useAuthStore();
  const [showOnlineOnly, setShowOnlineOnly] = useState(false);

  useEffect(() => {
    getUsers();
  }, [getUsers]);

  const filteredUsers = showOnlineOnly ? users.filter(user => onlineUsers.includes(user._id)) : users;

  if (isUsersLoading) return <SidebarSkeleton />;

  return (
    <aside className="sidebar-container">
      {/* Header Section */}
      <div className="sidebar-header">
        <div className="header-content">
          <Users size={24} />
          <span className="header-title">Contacts</span>
        </div>
        {/* TODO: Online filter toggle yahan aayega */}
        <div className="mt-3 hidden lg:flex items-center gap-2">
  <label className="cursor-pointer flex items-center gap-2">
    <input
      type="checkbox"
      checked={showOnlineOnly}
      onChange={(e) => setShowOnlineOnly(e.target.checked)}
      className="checkbox checkbox-sm"
    />
    <span className="text-sm">Show online only</span>
  </label>
  <span className="text-xs text-zinc-500">({onlineUsers.length - 1} online)</span>
</div>

      </div>

      {/* Users List */}
      <div className="users-list">
        {filteredUsers.map((user) => (
          <button
            key={user._id}
            onClick={() => setSelectedUser(user)}
            className={`user-item ${selectedUser?._id === user._id ? "active-user" : ""}`}
          >
            {/* Avatar Section */}
            <div className="avatar-wrapper">
              <img
                src={user.profilePic || "/dimg.jpg"}
                // alt={user.name}
                className="user-avatar"
              />
              {onlineUsers.includes(user._id) && (
                <span className="online-indicator"></span>
              )}
            </div>

            {/* User Details - Large screens par dikhega */}
            <div className="user-info">
              <div className="user-name">{user.name}</div>
              <div className="user-status">
                {onlineUsers.includes(user._id) ? "Online" : "Offline"}
              </div>
            </div>
          </button>
        ))}
        {filteredUsers.length === 0 && (
          <div className="text-center text-zinc-500 py-4">No online users</div>
          )}
      </div>
    </aside>
  );
};

export default Sidebar;