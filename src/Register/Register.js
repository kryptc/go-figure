import { withCookies, Cookies } from 'react-cookie';
import React, { Component } from 'react';
// import './NewPerson.css';

class Register extends Component {
  constructor() {
    super();
    this.state = {
      formData: {
        username: "",
        email: "",
        passwordhash: "",
      },
      submitted: false,
    }
    this.handleUChange = this.handleUChange.bind(this);
    this.handleEChange = this.handleEChange.bind(this);
    this.handlePChange = this.handlePChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleSubmit (event) {
    event.preventDefault();
    fetch('http://localhost:8080/register', {
     method: 'POST',
     body: JSON.stringify(this.state.formData),
   })
      .then(response => {
        if(response.status >= 200 && response.status < 300) {
          console.log("TRUE");
          const cookies = new Cookies(); 
          console.log(this.state.username);
          cookies.set('loggedin',this.state.formData.username,{ path: '/' });
          this.setState({submitted: true});

        }
      });
        //  .then(response => response.json())
        // .then(data => {
        //   this.setState({data: data});
        //   console.log("TRUE");
        //   const cookies = new Cookies(); 
        //   cookies.set('loggedin',this.state.username,{ path: '/' });
        //   this.setState({submitted: true});
        //   window.location.reload();
        // }
        // );
  }

  handleUChange(event) {
    this.state.formData.username = event.target.value;
  }
  handleEChange(event) {
    this.state.formData.email = event.target.value;
  }
  handlePChange(event) {
    this.state.formData.passwordhash = event.target.value;
  }

  render() {

    return (
      <div className="App">
      <br/>
        <header className="App-header">
          <h3 className="App-title">Register to start playing</h3>
        </header>
        <br/>
        <div className="formContainer">
          <form onSubmit={this.handleSubmit}>
            <div className="form-group">
                <label>Username</label>
                <input type="text" className="form-control" value={this.state.username} onChange={this.handleUChange} required="true"/>
            </div>
            <div className="form-group">
                <label>Email</label>
                <input type="email" className="form-control" value={this.state.email} onChange={this.handleEChange} required="true"/>
            </div>
            <div className="form-group">
                <label>Password</label>
                <input type="password" className="form-control" value={this.state.passwordhash} onChange={this.handlePChange} required="true"/>
            </div>
                <button type="submit" className="btn btn-default">Submit</button>
          </form>
        </div>

       
         {this.state.submitted && this.props.history.push('/home') }


      </div>
    );
  }
}

export default withCookies(Register);

