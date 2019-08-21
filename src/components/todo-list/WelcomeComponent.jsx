import React, {Component} from 'react'
import {Link} from 'react-router-dom'
// import HelloWorldService from '../../api/todo/HelloWorldService.js'

class WelcomeComponent extends Component {
    // constructor(props) {
    //     super(props)
    //     // this.retrieveWelcomeMessage = this.retrieveWelcomeMessage.bind(this)
    //     this.state = {
    //         welcomeMessage : ''
    //     }
    //     // this.handleSuccessfulResponse = this.handleSuccessfulResponse.bind(this)
    //     // this.handleError = this.handleError.bind(this)
    // }

    render() {
        return (
            <>
              <br/>
                <h1>Welcome!</h1>
                <br/>
                <div className="container">
                    Welcome {this.props.match.params.name} to Our Calendar App!
                </div>
                <br/>
                <div className="container">
                    Click <Link to="/events">here</Link> to Manage Your Events.
                </div>
            </>
        )
    }

    // retrieveWelcomeMessage = () => {
    //     // HelloWorldService.executeHelloWorldService()
    //     // .then( response => this.handleSuccessfulResponse(response) )
    //
    //     // HelloWorldService.executeHelloWorldBeanService()
    //     // .then( response => this.handleSuccessfulResponse(response) )
    //
    //     HelloWorldService.executeHelloWorldPathVariableService(this.props.match.params.name)
    //     .then( response => this.handleSuccessfulResponse(response) )
    //     .catch( error => this.handleError(error) )
    // }
    //
    // handleSuccessfulResponse = (response) => {
    //     this.setState({welcomeMessage: response.data.message})
    // }
    //
    // handleError = (error) => {
    //     this.setState({welcomeMessage: error.response.data.message})
    // }

}


export default WelcomeComponent
