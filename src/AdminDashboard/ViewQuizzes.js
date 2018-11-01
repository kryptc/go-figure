
import React, { Component } from 'react';
import './ViewQuizzes.css';
import { BrowserRouter as Router, Switch, Route, Link } from 'react-router-dom';
import { withCookies, Cookies } from 'react-cookie'
const cookies = new Cookies();

class ViewPeople extends Component {
  constructor() {
    super();
    this.state = {
      data: []
    }
  }

  // Lifecycle hook, runs after component has mounted onto the DOM structure
  componentDidMount() {
    const request = new Request('http://127.0.0.1:8080/admin/viewquizzes');
    fetch(request)
      .then(response => response.json())
        .then(data => this.setState({data: data}));
  }

  render() {
    if(cookies.get('loggedin')) { 
    return (
      <div className="App">
      <br />

        <header className="App-header">
          <h3 className="App-title">List of quizzes</h3>
        </header>

        <table className="table-hover">
          <thead>
            <tr>
              <th>ID</th>
              <th>Name</th>
              <th>Genre</th>
              <th>Difficulty</th>
              <th> View </th>
            </tr>
          </thead>
          <tbody>{this.state.data.map(function(item, key) {
               return (
                  <tr key = {key}>
                      <td>{item.id}</td>
                      <td>{item.name}</td>
                      <td>{item.genre}</td>
                      <td>{item.difficulty}</td>
                      <td><Link to={`/admin/viewquizzes/viewquiz/${item.name}`}> Go to quiz</Link></td>

                  </tr>
                )
             })}
          </tbody>
       </table>

       <br />
       <p>
          <Link to={'/admin/createquiz'}>
            <a className="btn btn-success btn-lg btn-login btn-block test" >CREATE NEW QUIZ</a>
          </Link>
          <Link to={'/admin/deletequiz'}>
            <a className="btn btn-danger btn-lg btn-login btn-block test" >DELETE QUIZ</a>
          </Link>
          </p>
      </div>
    );
  }
  else
  {
    return (window.location='http://127.0.0.1:3000/');
  }
}
}

export default ViewPeople;
