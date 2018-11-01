import React, { Component } from 'react';
import { BrowserRouter as Router, Switch, Route, Link } from 'react-router-dom';
import {Redirect} from 'react-router-dom';
import Home from '../Home/Home'
import { withCookies, Cookies } from 'react-cookie';


class Login extends Component {
  constructor() {
    super();
    this.state = {
      formData: {
        Username: "",
        Password: "",
      },
      submitted: false,
    }
    this.handleUChange = this.handleUChange.bind(this);
    this.handlePChange = this.handlePChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleSubmit (event) {
    event.preventDefault();
    fetch('http://localhost:8080/login', {
     method: 'POST',
     body: JSON.stringify(this.state.formData),
   })
      .then(response => {
        if(response.status >= 200 && response.status < 300) {
          console.log("TRUE");
          const cookies = new Cookies(); 
          console.log(this.state.formData.Username);

          cookies.set('loggedin',this.state.formData.Username,{ path: '/' });
          this.setState({submitted: true});
          if(cookies.get('loggedin') == 'admin') {
            return (
            window.location = 'http://127.0.0.1:3000/admin'
            );
        }
      }
      });
        //  .then(response => response.json())
        // .then(data => {
        //   this.setState({data: data});
        //   console.log("TRUE");
        //   const cookies = new Cookies(); 
        //   cookies.set('loggedin',this.state.Username,{ path: '/' });
        //   this.setState({submitted: true});
        //   // window.location.reload();
        // }
        // );
  }

  handleUChange(event) {
    this.state.formData.Username = event.target.value;
  }
  handlePChange(event) {
    this.state.formData.Password = event.target.value;
  }

  render() {

    // if (this.state.submitted === true) {
    //   return <Redirect to='/home' />
    // }

    return (
      <div className="App">
      <br/>
        <header className="App-header">
          <h3 className="App-title">Login</h3>
        </header>
        <br/>
        <div className="formContainer">
          <form onSubmit={this.handleSubmit}>
            <div className="form-group">
                <label>Username</label>
                <input type="text" className="form-control" value={this.state.Username} onChange={this.handleUChange} required="true"/>
            </div>

            <div className="form-group">
                <label>Password</label>
                <input type="password" className="form-control" value={this.state.Password} onChange={this.handlePChange} required="true"/>
            </div>
                <button type="submit" className="btn btn-default">Submit</button>
          </form>
        </div>

         {this.state.submitted && this.props.history.push('/home') }
  
      </div>
    );
  }
}

export default withCookies(Login);
