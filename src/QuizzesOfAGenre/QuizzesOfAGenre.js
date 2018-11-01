
import React, { Component } from 'react';
import { BrowserRouter as Router, Switch, Route, Link } from 'react-router-dom';
import { withCookies, Cookies } from 'react-cookie'
const cookies = new Cookies();

class Home extends Component 
{
   constructor() {
    super();
    this.state = {
      data: []
    }
  }

  // Lifecycle hook, runs after component has mounted onto the DOM structure
  componentDidMount() {
    const request = new Request('http://127.0.0.1:8080/genres/' + this.props.match.params.genreName);
    fetch(request)
      .then(response => response.json())
        .then(data => this.setState({data: data}));
  }

  render() 
  {
    if(cookies.get('loggedin')) { 
    return (
    <div>
    <br/ >
    {this.state.data.map(function(item, key) {
        return (
          <div className="container">
            <Link to={`/genres/${item.genre}/${item.name}`}>
              <a className="card text-white bg-info mb-3 test">

                  <div className="card-body">
                    <h4 className="card-title"> {item.name} </h4>
                    <p className="card-text">Difficulty: {item.difficulty} </p>
                  </div>
              
              </a>
              </Link>
          </div>
        )
      })}

      </div>
    );
  }
  else
  {
    return (window.location='http://127.0.0.1:3000/');
  }
}
}
export default Home;
