import React from "react";
import "../layout.css";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useState } from "react";
import { useSelector } from "react-redux";
import {  Avatar, Badge  } from 'antd'

function Layout({ children }) {
  const { user } = useSelector((state) => state.user);
  // console.log(user);
  const navigate = useNavigate();
  const location = useLocation();
  const [collapsed, setCollapsed] = useState(false);

  const UserMenu = [
    { name: "Home", path: "/", icon: "ri-home-line" },
    { name: "Appointments", path: "/appointments", icon: "ri-file-list-line" },
    { name: "Apply Doctor", path: "/apply-doctor", icon: "ri-hospital-line" },
//     { name: "Profile", path: "/profile", icon: "ri-file-user-line" },
  ];
  const AdminMenu = [
    { name: "Home", path: "/", icon: "ri-home-line" },
    {
      name: "Users",
      path: "/admin/userslist",
      icon: "ri-user-line",
    },
    { name: "Doctor", path: "/admin/doctorslist", icon: "ri-user-star-line" },
  ];


  const DoctorMenu = [
    {
      name: "Home",
      path: "/",
      icon: "ri-home-line",
    },
    {
      name: "Appointments",
      path: "/doctor/appointments",
      icon: "ri-file-list-line",
    },
    {
      name: "Profile",
      path: `/doctor/profile/${user?._id}`,
      icon: "ri-user-line",
    },
  ];
  const menuToBeRendered = user?.isAdmin ? AdminMenu : user?.isDoctor ? DoctorMenu : UserMenu;
  const role = user?.isAdmin ? "Admin" : user?.isDoctor ? "Doctor" : "User";


  // const menuToBeRendered = user?.isAdmin ? AdminMenu : UserMenu;
  return (
    <div className="main p-2">
      <div className="d-flex layout">
        <div className={`${collapsed ? "collapsed-sidebar" : "sidebar"}`}>
          <div className="sidebar-header">
            <h1 className="sidebar-logo">Hi</h1>
            <h1 className="role">{role}</h1>
          </div>

          <div className="menu">
            {
              menuToBeRendered.map((menu) => {
                const isActive = location.pathname === menu.path;
                return (
                  <div
                    className={`d-flex menu-item ${
                      isActive && "active-menu-item"
                    }`}
                  >
                    <i className={menu.icon}></i>
                    {!collapsed && <Link to={menu.path}>{menu.name}</Link>}
                  </div>
                );
              })


            }
            <div
              className="d-flex menu-item"
              onClick={() => {
                localStorage.clear();
                navigate("/login");
              }}
            >
              <i className="ri-logout-box-line"></i>
              {!collapsed && <Link to="/login">Logout</Link>}
            </div>
          </div>
        </div>

        <div className="content">
          <div className="header">
            {collapsed ? (
              <i
                className="ri-menu-2-fill header-action-icon"
                onClick={() => setCollapsed(false)}
              ></i>
            ) : (
              <i
                className="ri-close-fill header-action-icon"
                onClick={() => setCollapsed(true)}
              ></i>
            )}

            <div className="d-flex align-items-center px-4">
              <Badge count={user?.unseenNotifications.length} onClick ={()=>navigate('/notifications')}>
              <i className="ri-notification-line header-action-icon px-2"></i>
                {/* <Avatar shape="square" size="large" /> */}
              </Badge>
              <Link className="anchor mx-3" to="/">
                {user?.name}
              </Link>
            </div>
          </div>
          <div className="body">{children}</div>
        </div>
      </div>
    </div>
  );
}
export default Layout;
