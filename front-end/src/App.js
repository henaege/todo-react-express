import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import './index.css'
import $ from 'jquery'

class App extends Component {
  constructor(props){
    super(props)
    this.state={
      theClass: []
    }
    this.addStudent = this.addStudent.bind(this)

  }
// componentDidMount runs AFTER the first render
  componentDidMount(){
    // getJSON request to localhost:3000
    $.getJSON('http://localhost:3000/getStudents', (studentsFromApi)=>{
      console.log(studentsFromApi)
      this.setState({
        theClass: studentsFromApi
      })
    })
    // Update the state - this will cause a re-render
    // this.setState({
    //   theClass: [1, 2, 3, 4]
    // })
  }

  addStudent(event){
    var studentToAdd = event.target.parentNode.childNodes[0].value
    // This is a POST request, so we can't use $.getJSON (which only does GET). Ajax expects an object that tells it what to send (data), where to send it (url), and how to send it (method). $.ajax is a promise which has a "done"" method that will only run when ajax gets back.it gets a param of whatever JSON was returned by the API request
    // Inside that funciton, we update REact state (theClass), which causes
    // a re-render, which updates the list because we are mapping through this.state.theClass.
    $.ajax({
      method: 'POST',
      url: 'http://localhost:3000/addStudent',
      data: {name: studentToAdd}
    }).done((studentsArray)=>{
        this.setState({ theClass: studentsArray })
    })
  }

  render() {
    // Create an array to dump into our return. It will contain components or HTML tags
    var theClassArray = []
    // Loop through our state var. The first time through it will be empty
    this.state.theClass.map((student, index)=>{
      theClassArray.push(<li key={index}>{student.name}</li>)
    })
    return (
      <div className="App">
        <div className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h2>Welcome to React</h2>
        </div>
        <p className="App-intro">
          To get started, edit <code>src/App.js</code> and save to reload.
        </p>
        <div className="add-box">
          <input type="text" id="new-student" />
          <button onClick={this.addStudent}>Add Student</button>
        </div>
        <p>
          {theClassArray}
        </p>
      </div>
    );
  }
}

export default App;
