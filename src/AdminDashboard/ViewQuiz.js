
import React, { Component } from 'react';
import { withCookies, Cookies } from 'react-cookie'
const cookies = new Cookies();

class IndividualQuiz extends Component {
  constructor() {
    super();
    this.state = {
      data: []
    }
  }

  // Lifecycle hook, runs after component has mounted onto the DOM structure
  componentDidMount() {
    const request = new Request('http://127.0.0.1:8080/admin/plswork/' + this.props.match.params.quizName);
    fetch(request)
      .then(response => response.json())
        .then(data => this.setState({data: data}));
  }

  render() {
    if(cookies.get('loggedin')) { 
    return (
      <div className="App">
        <header className="App-header">
          <h1 className="App-title">View All Questions</h1>
        </header>

        <table className="table-hover">
          <thead>
            <tr>
              <th>ID</th>
              <th>Text</th>
              <th>Option A</th>
              <th>Option B</th>
              <th>Option C</th>
              <th>Option D</th>
            </tr>
          </thead>
          <tbody>{this.state.data.map(function(item, key) {
               return (
                  <tr key = {key}>
                      <td>{item.id}</td>
                      <td>{item.text}</td>
                      <td>{item.optiona}</td>
                      <td>{item.optionb}</td>
                      <td>{item.optionc}</td>
                      <td>{item.optiond}</td>
                  </tr>
                )
             })}
          </tbody>
       </table>
      </div>
    );
  }
  else
  {
    return (window.location='http://127.0.0.1:3000/');
  }
}
}

export default IndividualQuiz;
