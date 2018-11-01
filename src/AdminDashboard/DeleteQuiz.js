

import React, { Component } from 'react';
// import './DeletePerson.css';
import './ViewQuizzes.css';
import { withCookies, Cookies } from 'react-cookie'
const cookies = new Cookies();

class DeleteQuiz extends Component {
  constructor() {
    super();
    this.state = {
      data: [],
      value: 0
    }
    this.handleClick = this.handleClick.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }
    // Lifecycle hook, runs after component has mounted onto the DOM structure
    componentDidMount() {
      const request = new Request('http://127.0.0.1:8080/admin/viewquizzes');
      fetch(request)
        .then(response => response.json())
          .then(data => this.setState({data: data}));
    }
    handleClick(event){
      this.setState({value:event.target.value});
    }
    handleSubmit (event) {
      event.preventDefault();
      console.log(this.state);
      fetch('http://localhost:8080/admin/viewquizzes/' + this.state.value, {
       method: 'DELETE',
     })
        .then(response => {
          if(response.status >= 200 && response.status < 300)
            this.setState({submitted: true});
        });
    }

 render() {
  if(cookies.get('loggedin')) { 
    return (
      <div className="App">
        <header className="App-header">
          <h1 className="App-title">Delete Quizzes</h1>
        </header>

        <form onSubmit={this.handleSubmit}>
        <table className="table-hover">
          <thead>
            <tr>
              <th>Select checkbox</th>
              <th>ID</th>
              <th>Name</th>
              <th>Genre</th>
              <th>Difficulty</th>
            </tr>
          </thead>
          <tbody>{this.state.data.map((item, key) => {
               return (
                  <tr key = {key}>
                      <td><input type="radio" name="1" value={item.id} onClick={this.handleClick}/></td>
                      <td>{item.id}</td>
                      <td>{item.name}</td>
                      <td>{item.genre}</td>
                      <td>{item.difficulty}</td>
                  </tr>
                )
              })}
          </tbody>
       </table>
       <br />
       <button type="submit" className="btn btn-default">Submit</button>
      </form>
      { this.state.submitted &&
        <h6>The Data has been deleted</h6>
      }
      </div>
    );
  }
  else
  {
    return (window.location='http://127.0.0.1:3000/');
  }
}
}

export default DeleteQuiz;