
import React, { Component } from 'react';
import { withCookies, Cookies } from 'react-cookie'
const cookies = new Cookies();

class IndividualQuiz extends Component {
  constructor() {
    super();
    this.state = {
      data: [],
      score: 0,
      quest1a: 0,
      quest1b: 0,
      quest1c: 0,
      quest1d: 0,

      quest2a: 0,
      quest2b: 0,
      quest2c: 0,
      quest2d: 0,

      quest3a: 0,
      quest3b: 0,
      quest3c: 0,
      quest3d: 0,

      quest4a: 0,
      quest4b: 0,
      quest4c: 0,
      quest4d: 0,

      quest5a: 0,
      quest5b: 0,
      quest5c: 0,
      quest5d: 0,

      qsno: [],
      i: 0,

    }
    this.handle1Change = this.handle1Change.bind(this);
    this.handle2Change = this.handle2Change.bind(this);
    this.handle3Change = this.handle3Change.bind(this);
    this.handle4Change = this.handle4Change.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);

  }

  // Lifecycle hook, runs after component has mounted onto the DOM structure
  componentDidMount() {
    const request = new Request('http://127.0.0.1:8080/genres/'+ this.props.match.params.genreName + '/' + this.props.match.params.quizName);
    fetch(request)
      .then(response => response.json())
        .then(data => this.setState({data: data}));
    console.log(this.state.data);

  }

  handleSubmit (event) {
    event.preventDefault();
      console.log(this.state.score);

      if ((this.state.data[0].isa == this.state.quest1a) &&
       (this.state.data[0].isb == this.state.quest1b) &&
       (this.state.data[0].isc == this.state.quest1c) &&
       (this.state.data[0].isd == this.state.quest1d) )
        this.state.score += 1;
      console.log(this.state.score);

      if ((this.state.data[1].isa == this.state.quest2a) &&
       (this.state.data[1].isb == this.state.quest2b) &&
       (this.state.data[1].isc == this.state.quest2c) &&
       (this.state.data[1].isd == this.state.quest2d) )
        this.state.score += 1;
      console.log(this.state.score);

      if((this.state.data[2].isa == this.state.quest3a) &&
       (this.state.data[2].isb == this.state.quest3b) &&
       (this.state.data[2].isc == this.state.quest3c) &&
       (this.state.data[2].isd == this.state.quest3d) )
        this.state.score += 1;
      console.log(this.state.score);

       if ((this.state.data[3].isa == this.state.quest4a) &&
       (this.state.data[3].isb == this.state.quest4b) &&
       (this.state.data[3].isc == this.state.quest4c) &&
       (this.state.data[3].isd == this.state.quest4d) )
        this.state.score += 1;
      console.log(this.state.score);

       if ((this.state.data[4].isa == this.state.quest5a) &&
       (this.state.data[4].isb == this.state.quest5b) &&
       (this.state.data[4].isc == this.state.quest5c) &&
       (this.state.data[4].isd == this.state.quest5d) )
        this.state.score += 1;
      console.log(this.state.score);
      console.log(this.state);
      alert("Your final score: " + JSON.stringify(this.state.score));
   

      this.props.history.push('/home');

      
  }

  handle1Change(event) {
    if (event.target.id == this.state.qsno[0]) {
      this.state.quest1a = 1;
    } 
    else if (event.target.id == this.state.qsno[1]) {
      this.state.quest2a = 1;
    } 
    else if (event.target.id == this.state.qsno[2]) {
      this.state.quest3a = 1;
    } 
    else if (event.target.id == this.state.qsno[3]) {
      this.state.quest4a = 1;
    } 
    else if (event.target.id == this.state.qsno[4]) {
      this.state.quest5a = 1;
    } 
  }
  handle2Change(event) {
    if (event.target.id == this.state.qsno[0]) {
      this.state.quest1b = 1;
    } 
    else if (event.target.id == this.state.qsno[1]) {
      this.state.quest2b = 1;
    } 
    else if (event.target.id == this.state.qsno[2]) {
      this.state.quest3b = 1;
    } 
    else if (event.target.id == this.state.qsno[3]) {
      this.state.quest4b = 1;
    } 
    else if (event.target.id == this.state.qsno[4]) {
      this.state.quest5b = 1;
    } 
  }
    handle3Change(event) {
    if (event.target.id == this.state.qsno[0]) {
      this.state.quest1c = 1;
    } 
    else if (event.target.id == this.state.qsno[1]) {
      this.state.quest2c = 1;
    } 
    else if (event.target.id == this.state.qsno[2]) {
      this.state.quest3c = 1;
    } 
    else if (event.target.id == this.state.qsno[3]) {
      this.state.quest4c = 1;
    } 
    else if (event.target.id == this.state.qsno[4]) {
      this.state.quest5c = 1;
    } 
  }
    handle4Change(event) {
    if (event.target.id == this.state.qsno[0]) {
      this.state.quest1d = 1;
    } 
    else if (event.target.id == this.state.qsno[1]) {
      this.state.quest2d = 1;
    } 
    else if (event.target.id == this.state.qsno[2]) {
      this.state.quest3d = 1;
    } 
    else if (event.target.id == this.state.qsno[3]) {
      this.state.quest4d = 1;
    } 
    else if (event.target.id == this.state.qsno[4]) {
      this.state.quest5d = 1;
    } 
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
          <tbody>{this.state.data.map((item, key) => {
                 {this.state.qsno[this.state.i] = item.id}

                {this.state.i += 1}
               return (
                  <tr key = {key}>
                      <td>{item.id}</td>
                      <td>{item.text}</td>
                      <td> <label> 
                      <input type="checkbox" name={item.id} id={item.id} value={1} onClick={this.handle1Change} /> {item.optiona} 
                      </label> </td>
                      <td> <label> 
                      <input type="checkbox" name={item.id} id={item.id} value={1} onClick={this.handle2Change} /> {item.optionb} 
                      </label> </td>
                      <td> <label> 
                      <input type="checkbox" name={item.id} id={item.id} value={1} onClick={this.handle3Change} /> {item.optionc} 
                      </label> </td>
                      <td> <label> 
                      <input type="checkbox" name={item.id} id={item.id} value={1} onClick={this.handle4Change} /> {item.optiond} 
                      </label> </td>
                  </tr>
                )

             })}
          </tbody>
       </table>
       <button type="submit" className="btn btn-default" onClick={this.handleSubmit} >Submit answers </button>
       <br />
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
