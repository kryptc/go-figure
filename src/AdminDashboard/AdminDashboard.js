
import React, { Component } from 'react';
import { BrowserRouter as Router, Switch, Route, Link } from 'react-router-dom';

import ViewUsers from './ViewUsers';
import DeleteUser from './DeleteUser';

import './AdminDashboard.css';
import { withCookies, Cookies } from 'react-cookie'
const cookies = new Cookies();

class AdminDashboard extends Component {
  constructor() {
    super();
    this.state = {}

    }

  render() {
if(cookies.get('loggedin')) { 
  if(cookies.get('loggedin') == 'admin') {
    return (
      <div className="App">
      <br/>
        <header className="App-Header">
          <h3 className="App-title">ADMIN DASHBOARD</h3>
        </header>
        <br/>
         <p>
         <Link to={'/admin/viewusers'}> 
            <a className="btn btn-warning btn-lg btn-login btn-block test" >VIEW ALL USERS</a>
         </Link>
         </p>

          <p>
          <Link to={'/admin/deleteuser'}>
            <a className="btn btn-success btn-lg btn-login btn-block test" >DELETE A USER</a>
          </Link>
          </p>

          <p>
         <Link to={'/admin/viewquizzes'}> 
            <a className="btn btn-info btn-lg btn-login btn-block test" >VIEW ALL QUIZZES</a>
         </Link>
         </p>

         <p>
         <Link to={'/home'}> 
            <a className="btn btn-primary btn-lg btn-login btn-block test" >CONTINUE PLAYING</a>
         </Link>
         </p>
        
       
      </div>
    );
  }
  else
  {
    return (window.location='http://127.0.0.1:3000/home');
  }
  }
  else
  {
    return (window.location='http://127.0.0.1:3000/');
  }
}
}

export default AdminDashboard;
