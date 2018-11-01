import React, { Component } from 'react';
import { withCookies, Cookies } from 'react-cookie'
const cookies = new Cookies();
// import './NewPerson.css';

class CreateQuiz extends Component {
  constructor() {
    super();
    this.state = {
      formData: {
        name: "",
        genre: "",
        // questioncount: "",
        difficulty: "",
      },
      submitted: false,
    }
    this.handleUChange = this.handleUChange.bind(this);
    this.handleEChange = this.handleEChange.bind(this);
    // this.handlePChange = this.handlePChange.bind(this);
    this.handleDChange = this.handleDChange.bind(this);

    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleSubmit (event) {
    event.preventDefault();
    fetch('http://localhost:8080/admin/createquiz', {
     method: 'POST',
     body: JSON.stringify(this.state.formData),
   })
      .then(response => {
        if(response.status >= 200 && response.status < 300)
          this.setState({submitted: true});
      });
  }

  handleUChange(event) {
    this.state.formData.name= event.target.value;
  }
  handleEChange(event) {
    this.state.formData.genre= event.target.value;
  }
  // handlePChange(event) {
  //   this.state.formData.questioncount = event.target.value;
  // }
  handleDChange(event) {
    this.state.formData.difficulty= event.target.value;
  }
  render() {
if(cookies.get('loggedin')) { 
    return (
      <div className="App">
      <br/>
        <header className="App-header">
          <h2 className="App-title">Enter primary details of your new quiz:</h2>
        </header>
        <br/>
        <div className="formContainer">
          <form onSubmit={this.handleSubmit}>
            <div className="form-group">
                <label>Name of quiz</label>
                <input type="text" className="form-control" value={this.state.name} onChange={this.handleUChange}/>
            </div>
            <div className="form-group">
                <label>Genre</label>
                <input type="text" className="form-control" value={this.state.genre} onChange={this.handleEChange}/>
            </div>
            {/*<div className="form-group">
                <label>Number of questions</label>
                <input type="text" className="form-control" value={this.state.questioncount} onChange={this.handlePChange}/>
            </div>*/}
            <div className="form-group">
                <label>Difficulty
                <br />
                  <select value={this.state.difficulty} onChange={this.handleDChange}>
                    <option value="none">Select the difficulty level</option>

                    <option value="easy">Easy</option>
                    <option value="medium">Medium</option>
                    <option value="hard">Hard</option>
                  </select>
                </label>
            </div>
                <button type="submit" className="btn btn-default">Submit</button>
          </form>
        </div>

         {this.state.submitted && this.props.history.push(`/admin/createquiz/${this.state.formData.name}/createquestions`) }


      </div>
    );
  }
  else
  {
    return (window.location='http://127.0.0.1:3000/');
  }
}
}

export default CreateQuiz;
