import React, {Component} from 'react'
import $ from 'jquery'
import {Link} from 'react-router-dom'

class Home extends Component{
    constructor(props){
        super(props)
        this.state={
      tasks: []
    }
    this.addNewTask = this.addNewTask.bind(this)
    }

    componentDidMount(){
    // getJSON request to localhost:3000
    $.getJSON('http://localhost:3000/getTasks', (tasksFromApi)=>{
      console.log(tasksFromApi)
      this.setState({
        tasks: tasksFromApi
      })
    })
    }

    addNewTask(e){
        e.preventDefault()
        var newTask = document.getElementById('new-task').value
        var newTaskDate = document.getElementById('new-task-date').value
        console.log(newTask)
        console.log(newTaskDate)
        $.ajax({
            method: 'POST',
            url: 'http://localhost:3000/addTask',
            data: {taskName: newTask, taskDate: newTaskDate}
            }).done((tasksArray)=>{
                console.log(tasksArray)
                this.setState({ tasks: tasksArray })
        
            })
    }

    render(){
        // console.log(this.state.tasks.)
    var theTaskArray = []
    // Loop through our state var. The first time through it will be empty
    this.state.tasks.map((task, index)=>{
      theTaskArray.push(
        <tr key={index}>
            <td><h5><Link to={`/task/get/${task.id}`}>{task.taskName}</Link></h5></td>
            <td><h6>{task.Date}</h6></td>
            <td><Link to={`/task/edit/${task.id}`} ><button className="waves-effect waves-light btn-flat yellow darken-2"><i className="material-icons left">mode_edit</i>Edit</button></Link></td>
            <td><Link to={`/task/delete/${task.id}`}><button className="waves-effect waves-light btn-flat red darken-2"><i className="material-icons left">remove_circle_outline</i>Delete</button></Link></td>
        </tr>
        );
    })

        return(
            <div className="container">
                <div className="row">
              <div className="col s10 offset-s1">
                  <table className="responsive-table centered highlight bordered">
                <thead>
                    <tr>
                        <th>Task</th>
                        <th>Due Date</th>
                        <th>Edit</th>
                        <th>Delete</th>
                    </tr>
                </thead>      
                <tbody>
                    {theTaskArray}
                </tbody>
                </table>
                </div>
                </div>
            <div className="row">
                <div className="add-form">
                <form className="col s12 center-align" className="add-box">
                    <input className="col s6" type="text" id="new-task" placeholder="New Task..." />
                    <input className=" col s3 center-align" type="date" id="new-task-date" />
                </form>
                <div className="col s3 center-align">
                <button onClick={this.addNewTask} className="waves-effect waves-light btn-flat green darken-2" id="add-btn"><i className="material-icons left">add_circle_outline</i>Add Task</button>
                </div>
                </div>
                </div>
            
            </div>
                
            
            
            
        );
    }
}

export default Home
