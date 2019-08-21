import React, {Component} from 'react'
import EventDataService from '../../api/event/EventDataService.js'
import AuthenticationService from './AuthenticationService.js'
import moment from 'moment'

class ListEventsComponent extends Component {

    constructor(props){
        console.log('constructor')
        super(props)
        this.state = {
            events : [],
            message : null
        }
        // this.deleteEventClicked = this.deleteEventClicked.bind(this)
        // this.updateEventClicked = this.updateEventClicked.bind(this)
        // this.addEventClicked = this.addEventClicked.bind(this)
        // this.refreshEvents = this.refreshEvents.bind(this)
    }


    componentDidMount() {
        this.refreshEvents();
    }

    refreshEvents = () => {
        let username = AuthenticationService.getLoggedInUserName()
        EventDataService.retrieveAllEvents(username)
          .then(
              response => {
                  this.setState({events : response.data})
              }
          )
    }

    deleteEventClicked = (id) => {
        let username = AuthenticationService.getLoggedInUserName()
        EventDataService.deleteEvent(username, id)
         .then (
             response => {
                this.setState({message : `Target Event was Successfully Deleted`})
                this.refreshEvents()
             }
         )

    }

    addEventClicked = () => {
        this.props.history.push(`/events/-1`)
    }

    updateEventClicked = (id) => {
        this.props.history.push(`/events/${id}`)
    }

    render() {
        console.log('render')
        return (
            <div>
                <br/>
                 <h1>My Event Tracker</h1>
                 {this.state.message && <div class="alert alert-success">{this.state.message}</div>}
                 <div className="container">
                    <table className="table">
                        <thead>
                            <tr>
                                <th>Event Name</th>
                                <th>Event Date</th>
                                <th>Update</th>
                                <th>Delete</th>
                            </tr>
                        </thead>
                        <tbody>
                        {
                            this.state.events.map (
                                event =>
                                    <tr key={event.id}>
                                        <td>{event.description}</td>
                                        <td>{moment(event.targetDate).format('YYYY-MM-DD')}</td>
                                        <td><button className="btn btn-success" onClick={() => this.updateEventClicked(event.id)}>Update</button></td>
                                        <td><button className="btn btn-warning" onClick={() => this.deleteEventClicked(event.id)}>Delete</button></td>
                                    </tr>
                            )
                            }
                        </tbody>
                    </table>
                    <div className="row">
                        <button className="btn btn-success" onClick={this.addEventClicked}>Add Event</button>
                    </div>
                 </div>
            </div>
        )
    }
}

export default ListEventsComponent
