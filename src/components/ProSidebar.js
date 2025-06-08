import React, { useState } from 'react'
import { useNavigate, Link } from 'react-router-dom';
import { Sidebar, Menu, MenuItem } from 'react-pro-sidebar';
import { handleLogOut } from '../common/commonMethods';

export const ProSidebar = () => {
  const navigate = useNavigate()
  const logout = () => {
    handleLogOut();
    navigate("/")
  }

  return (
    <Sidebar>
      <Menu
        menuItemStyles={{
          button: {
            [`&.active`]: {
              backgroundColor: '#13395e',
              color: '#b6c8d9',
            },
            textAlign: 'center'
          },
        }}
      >
        <MenuItem>
          <strong>Log Visualizer</strong>
        </MenuItem>
        <MenuItem component={<Link to="/dashboard" />}> Dashboard</MenuItem>
        <MenuItem component={<Link to="/about" />}> About</MenuItem>
        <MenuItem style={{ color: 'red' }} onClick={() => logout()}>Logout</MenuItem>
      </Menu>
    </Sidebar>
  )
}
