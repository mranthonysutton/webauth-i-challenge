import React from 'react';
import {Link as routerLink} from 'react-router-dom';
import {AppBar, Button, Link, Toolbar} from '@material-ui/core';

const NavBar = () => {
  return (
    <div className="navbar">
      <nav>
        <Link color={'textPrimary'} component={routerLink} to="/">
          Login
        </Link>
        <Link color={'textPrimary'} component={routerLink} to="/register">
          Register
        </Link>
        <Link color={'textPrimary'} component={routerLink} to="/users">
          View Users
        </Link>
      </nav>
    </div>
  );
};

export default NavBar;
