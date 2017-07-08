import React, {Component} from 'react'
import $ from 'jquery'

class Edit extends Component{
    constructor(props){
        super(props)
        this.editTask = this.editTask.bind(this)
        this.state = {
            taskData: {}
        }
    }

    componentDidMount(){
    var taskId = this.props.match.params.taskId
    $.getJSON(`http://localhost:3000/getTask/${taskId}`, (taskData)=>{
        this.setState({taskData})
    })
}

    editTask(e){
        e.preventDefault()
        var taskId = this.props.match.params.taskId
        var taskNameToEdit = document.getElementById('edit-task').value
        var taskDateToEdit = document.getElementById('edit-task-date').value 
        $.ajax({
        method: 'POST',
        url: 'http://localhost:3000/editTask',
        data: {taskId: taskId, taskName: taskNameToEdit, taskDate: taskDateToEdit}
        }).done((tasksArray)=>{
            this.props.history.push('/')
        })
    }
    
    render(){
        
        var taskId = this.props.match.params.taskId
        console.log(taskId)
        return(
            <div className="container">
            <div className="row">
                <form className="col s12 center-align" className="add-box">
                    <input className="col s4" type="text" id="edit-task" placeholder={this.state.taskData.taskName} />
                    <input className=" col s4" type="date" id="edit-task-date" placeholder={this.state.taskData.taskDate}/>
                    <div className="col s4 center-align">
                    <button onClick={this.editTask} className="waves-effect waves-light btn-flat green darken-2" id="add-btn"><i className="material-icons left">save</i>Save Changes</button>
                    </div>
                </form>
                </div>
                </div>
        )
    }
}

export default Edit