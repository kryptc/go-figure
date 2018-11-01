import React, { Component } from 'react';
// import './NewPerson.css';
import { withCookies, Cookies } from 'react-cookie'
const cookies = new Cookies();

class CreateQuestions extends Component {
  constructor() {
    super();
    this.state = {
      formData: {
        text: "",
        optiona: "",
        optionb: "",
        optionc: "",
        optiond: "",
        isa: false,
        isb: false,
        isc: false,
        isd: false,
        quizname: "",
      },
      submitted: false,
      counter: 4,
    }
    this.handleUChange = this.handleUChange.bind(this);
    this.handleEChange = this.handleEChange.bind(this);
    this.handlePChange = this.handlePChange.bind(this);
    this.handleDChange = this.handleDChange.bind(this);
    this.handleAChange = this.handleAChange.bind(this);
    this.handle1Change = this.handle1Change.bind(this);
    this.handle2Change = this.handle2Change.bind(this);
    this.handle3Change = this.handle3Change.bind(this);
    this.handle4Change = this.handle4Change.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleSubmit (event) {
    console.log("pls print");
    event.preventDefault();
    this.state.formData.quizName = this.props.match.params.quizName;
    console.log(this.state.formData);
    fetch('http://localhost:8080/admin/createquestions', {
     method: 'POST',
     body: JSON.stringify(this.state.formData),
   })
      .then(response => {
        if(response.status >= 200 && response.status < 300)
        {
          this.state.submitted= true;
          if(this.state.counter !== 0) {
            // var a = this.counter
            this.state.counter -= 1;
            console.log(this.state.counter);
            alert("Fill up the next question and its options. Sorry for not removing the old fields. :(")
            window.location.reload();

          } else {
            console.log("youve completed the fuckign quiz");
            alert("Done creating quiz");
            this.props.history.push('/admin/viewquizzes');
          }
        }
      });
  }

  handleUChange(event) {
    this.state.formData.text = event.target.value;
  }
  handleEChange(event) {
    this.state.formData.optiona = event.target.value;
  }
  handlePChange(event) {
    this.state.formData.optionb = event.target.value;
  }
  handleDChange(event) {
    this.state.formData.optionc = event.target.value;
  }
  handleAChange(event) {
    this.state.formData.optiond = event.target.value;
  }
  handle1Change(event) {
    if (event.target.value == '1') {
      this.state.formData.isa = true;
    } 
    else {
      this.state.formData.isa = false;
    }
  }
  handle2Change(event) {
    if (event.target.value == '1') {
      this.state.formData.isb = true;
    } 
    else {
      this.state.formData.isb = false;
    }
  } 
  handle3Change(event) {
    if (event.target.value == '1') {
      this.state.formData.isb = true;
    } 
    else {
      this.state.formData.isb= false;
    }
  } 
  handle4Change(event) {
    if (event.target.value == '1') {
      this.state.formData.isd = true;
    } 
    else {
      this.state.formData.isd = false;
    }
  }


  render() {
    if(cookies.get('loggedin')) { 
    // alert(this.props.match.params.quizName),
    return (
      <div className="App">
      <br/>
        <header className="App-header">
          <h2 className="App-title">Enter a question with 4 options:</h2>
        </header>
        <br/>
        <div className="formContainer">
          <form onSubmit={this.handleSubmit}>
            <div className="form-group">
                <label>Type your question here:</label>
                <input type="text" className="form-control" value={this.state.text} onChange={this.handleUChange} required={true}/>
            </div>
            <div className="form-group">
                <label>Option A</label>
                <input type="text" className="form-control" value={this.state.optiona} onChange={this.handleEChange} required={true}/>
            </div>
            <div className="form-group">
                <label>Option B</label>
                <input type="text" className="form-control" value={this.state.optionb} onChange={this.handlePChange} required={true}/>
            </div>
            <div className="form-group">
                <label>Option C</label>
                <input type="text" className="form-control" value={this.state.optionc} onChange={this.handleDChange} required={true}/>
            </div>
            <div className="form-group">
                <label>Option D</label>
                <input type="text" className="form-control" value={this.state.optiond} onChange={this.handleAChange} required={true}/>
            </div>
            <div> Select your answers (enter 0 if not an answer, 1 if it is an answer): </div>

            <div className="form-group">
                <label>Answer is A</label>
                <input type="text" className="form-control" value={this.state.isa} onChange={this.handle1Change} required={true}/>
            </div>
            <div className="form-group">
                <label>Answer is  B</label>
                <input type="text" className="form-control" value={this.state.isb} onChange={this.handle2Change} required={true}/>
            </div>
            <div className="form-group">
                <label>Answer is C</label>
                <input type="text" className="form-control" value={this.state.isc} onChange={this.handle3Change} required={true}/>
            </div>
            <div className="form-group">
                <label>Answer is D</label>
                <input type="text" className="form-control" value={this.state.isd} onChange={this.handle4Change} required={true}/>
            </div>
            
                <button type="submit" className="btn btn-default">Save and proceed </button>
          </form>
        </div>

       
         {this.state.counter !== 0 && this.state.submitted && 
          this.props.history.push(`/admin/createquiz/${this.state.quizname}/createquestions`) }
          {this.state.counter === 0 && this.state.submitted && 
          this.props.history.push(`/admin/viewquizzes`) }
      </div>
    );
  }
  else
  {
    return (window.location='http://127.0.0.1:3000/');
  }
}
}

export default CreateQuestions;
