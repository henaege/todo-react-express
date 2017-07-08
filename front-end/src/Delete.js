import React, {Component} from 'react'
import $ from 'jquery'

class Delete extends Component{
    constructor(props){
        super(props)
        this.confirmDelete = this.confirmDelete.bind(this)
        this.runForCover = this.runForCover.bind(this)
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

confirmDelete(e){
    e.preventDefault()
    var taskId = this.props.match.params.taskId
    $.ajax({
      method: 'POST',
      url: 'http://localhost:3000/deleteTask',
      data: {taskId}
    }).done((tasksArray)=>{
        this.props.history.push('/')
    })
}

runForCover(e){
    e.preventDefault()
    this.props.history.push('/')
}

    render(){
        console.log(this.state.taskData)
        return(
            <div className="container">
                <div className="row">
                    <div className="col s12 center-align">
                        <h4>Are you sure you want to delete {this.state.taskData.taskName}?</h4>
                    </div>
                </div>
                <div className="row">
                    <div className="col s4 offset-s2 center-align">
                        <button onClick={this.confirmDelete} className="waves-effect waves-light btn-flat green darken-2"><i className="material-icons left">thumb_up</i>Yes</button>
                    </div>
                    <div className="col s4 center-align">
                        <button onClick={this.runForCover} className="waves-effect waves-light btn-flat red darken-2"><i className="material-icons left">thumb_down</i>No</button>
                    </div>
                </div>
            </div>
        )
    }
}

export default Delete

