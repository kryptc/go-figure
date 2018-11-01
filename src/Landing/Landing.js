
import React, { Component } from 'react';
import './Landing.css';

import Register from '../Register/Register'
import Login from '../Login/Login'
import { BrowserRouter as Router, Switch, Route, Link } from 'react-router-dom';
import { withCookies, Cookies } from 'react-cookie'
const cookies = new Cookies();

class Landing extends Component 
{
  render() 
  {
    if(!cookies.get('loggedin')) {
    return (
      <div className="container">
        <div className="col-xs-8 col-xs-offset-2 jumbotron text-center">
          <h1>GO FIGURE</h1>
          <p>Different quizzes on your favourite topics! Play now and rise up the leaderboard!</p>
        </div>
          {/*<p>Sign in to get access </p>*/}
          <p>
          <Link to={'/login'}> 
            <a className="btn btn-primary btn-lg btn-login btn-block" >SIGN IN TO GET ACCESS</a>
         </Link>
         </p>

          {/*<p> Not a member? Register now! </p>*/}
          <p>
          <Link to={'/register'}>
            <a className="btn btn-primary btn-lg btn-login btn-block" >NOT A MEMBER? REGISTER NOW!</a>
          </Link>
          </p>
      </div>
    );
  }
  else
  {
    return (window.location="http://127.0.0.1:3000/home");
  }
  }
}
export default Landing;

