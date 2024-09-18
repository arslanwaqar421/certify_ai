import React, { useContext, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { myContext } from '../../Context';

function Sidebar() {
  const [activeItem, setActiveItem] = useState('dashboard');
  const {user,setUser} = useContext(myContext)
  const handleActiveTab = (item) => {
    setActiveItem(item);
  };
  const navigate = useNavigate()

  const handleLogout = (item) =>{
    setUser("")
    navigate("/login")
  }

  return (
    <div id="page-top">
      {/* Page Wrapper */}
      <div id="wrapper">
        {/* Sidebar */}
        <ul className="navbar-nav bg-gradient-primary sidebar sidebar-dark accordion" id="accordionSidebar">
          {/* Sidebar - Brand */}
          <a className="sidebar-brand d-flex align-items-center justify-content-center" href="index.html">
            <div className="sidebar-brand-icon rotate-n-15">
              <i className="fas fa-laugh-wink"></i>
            </div>
            <div className="sidebar-brand-text mx-3">Certify <sup style={{ textTransform: "lowercase" }}>ai</sup></div>
          </a>

          {/* Divider */}
          <hr className="sidebar-divider my-0" />

          {/* Nav Item - Dashboard */}
          <li className={`nav-item ${activeItem === 'dashboard' ? 'active' : ''}`} onClick={() => handleActiveTab('dashboard')}>
            <Link className="nav-link" to="/dashboard">
              <i className="fas fa-fw fa-tachometer-alt"></i>
              <span>Dashboard</span>
            </Link>
          </li>

          {/* Nav Item - profile */}
          <li className={`nav-item ${activeItem === 'Profile' ? 'active' : ''}`} onClick={() => handleActiveTab('Profile')}>
            <Link className="nav-link" to='/profile'>
              <i className="fas fa-fw fa-user"></i>
              <span>Profile</span>
            </Link>
          </li>

          {/* Nav Item - Tables */}
          <li className={`nav-item ${activeItem === 'contact' ? 'active' : ''}`} onClick={() => handleActiveTab('contact')}>
            <Link className="nav-link" to="/contact">
              <i className="fas fa-fw fa-phone-square"></i>
              <span>Contact</span>
            </Link>
          </li>

          <li className={`nav-item`} onClick={handleLogout}>
            <Link className="nav-link" to="/dashboard">
              <i className="fas-arrow-left"></i>
              <span>Logout</span>
            </Link>
          </li>

          {/* Divider */}
          <hr className="sidebar-divider d-none d-md-block" />

        </ul>
        {/* End of Sidebar */}
      </div>
      {/* End of Page Wrapper */}
    </div>
  );
}

export default Sidebar;
