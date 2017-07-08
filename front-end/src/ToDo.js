import React, { Component } from 'react';
import './App.css';
import $ from 'jquery'
import {BrowserRouter as Router, Route} from 'react-router-dom'
import Home from './Home'
import Delete from './Delete'
import Edit from './Edit'

class ToDo extends Component {
  constructor(props){
    super(props)
    
    this.addTask = this.addTask.bind(this)

  }
// componentDidMount runs AFTER the first render
  
    // Update the state - this will cause a re-render
    // this.setState({
    //   theClass: [1, 2, 3, 4]
    // })
  

  addTask(event){
    var taskToAdd = event.target.parentNode.childNodes[0].value
    // This is a POST request, so we can't use $.getJSON (which only does GET). Ajax expects an object that tells it what to send (data), where to send it (url), and how to send it (method). $.ajax is a promise which has a "done"" method that will only run when ajax gets back.it gets a param of whatever JSON was returned by the API request
    // Inside that funciton, we update REact state (theClass), which causes
    // a re-render, which updates the list because we are mapping through this.state.theClass.
    $.ajax({
      method: 'POST',
      url: 'http://localhost:3000/addTask',
      data: {taskName: taskToAdd}
    }).done((tasksArray)=>{
        console.log(tasksArray)
        this.setState({ tasks: tasksArray })
        
    })
  }

  render() {
      return(
          <Router>
            <div className="to-do-app">
                <Route exact path='/' component={Home} />
                <Route path="/task/delete/:taskId" component={Delete} />
                <Route path="/task/edit/:taskId" component={Edit} />
            </div>
          </Router>
      )
    // Create an array to dump into our return. It will contain components or HTML tags
    
    
  }
}

export default ToDo
