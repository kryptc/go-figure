import React, { Component } from 'react';
//import {Route} from 'react-router-dom';
import NavBar from './NavBar/NavBar';
import Home from './Home/Home';
import Questions from './Questions/Questions';
import QuizzesOfAGenre from './QuizzesOfAGenre/QuizzesOfAGenre'
import IndividualQuiz from './IndividualQuiz/IndividualQuiz'
import Register from './Register/Register'
import Login from './Login/Login'
import Landing from './Landing/Landing'
import AdminDashboard from './AdminDashboard/AdminDashboard'
import ViewUsers from './AdminDashboard/ViewUsers'
import DeleteUser from './AdminDashboard/DeleteUser'
import ViewQuizzes from './AdminDashboard/ViewQuizzes'
import ViewQuiz from './AdminDashboard/ViewQuiz'

import CreateQuiz from './AdminDashboard/CreateQuiz'
import CreateQuestions from './AdminDashboard/CreateQuestions'
import DeleteQuiz from './AdminDashboard/DeleteQuiz'

import { BrowserRouter as Router, Switch, Route, Link } from 'react-router-dom';

class App extends Component 
{
  render() 
  {
  	  return (
	      <div>
	      <NavBar />
           <Route exact path='/' component={Landing}/>
           <Route exact path='/home' component={Home}/>
           <Route exact path='/genres' component={Home}/>

           <Route exact path='/register' component={Register}/>
           <Route exact path='/login' component={Login}/>
           <Route exact path='/genres/:genreName/:quizName' component={IndividualQuiz}/>
           <Route exact path='/genres/:genreName' component={QuizzesOfAGenre}/>

           <Route exact path='/admin' component={AdminDashboard}/>
           <Route exact path='/admin/viewusers' component={ViewUsers}/>
           <Route exact path='/admin/deleteuser' component={DeleteUser}/>
           <Route exact path='/admin/viewquizzes' component={ViewQuizzes}/>
           <Route exact path='/admin/viewquizzes/viewquiz/:quizName' component={ViewQuiz}/>

           <Route exact path='/admin/createquiz' component={CreateQuiz}/>
           <Route exact path='/admin/deletequiz' component={DeleteQuiz}/>
           <Route exact path='/admin/createquiz/:quizName/createquestions' component={CreateQuestions}/>


	      </div>
      );
  	}

  
}

export default App;
