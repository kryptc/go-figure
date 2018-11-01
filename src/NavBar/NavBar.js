
import React from 'react';
import {Link} from 'react-router-dom';
import './NavBar.css';
import { withCookies, Cookies } from 'react-cookie'
const cookies = new Cookies();

function logoutHandler() {
	// event.preventDefault();
  cookies.remove('loggedin');
  window.location='http://127.0.0.1:3000/';
  }

function NavBar() {
  if(cookies.get('loggedin')) { 
  return (
    <nav className="navbar navbar-dark bg-primary fixed-top">
      <Link className="navbar-brand" to="/home">
        go figure.
      </Link>
      <span className="logout" onClick={logoutHandler}>
      Logout
      </span> 
    </nav>
  );
}
else
{
  return (
     <nav className="navbar navbar-dark bg-primary fixed-top">
      <Link className="navbar-brand" to="/">
        go figure.
      </Link>
      
    </nav>
    );
}
}

export default NavBar;