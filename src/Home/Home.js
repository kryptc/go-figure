import React, { Component } from 'react';
import { BrowserRouter as Router, Switch, Route, Link } from 'react-router-dom';
import './Home.css';
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
    const request = new Request('http://127.0.0.1:8080/genres');
    fetch(request)
      .then(response => response.json())
        .then(data => this.setState({data: data}));
    console.log(cookies.get('loggedin'));
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
            <Link to={`/genres/${item.genre}`}>
              <a class="card text-white bg-dark mb-3 test">

                  <div class="card-body">
                    <h4 class="card-title"> {item.genre} </h4>
                    <p class="card-text"> </p>
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
export default withCookies(Home);
