import React, {Component} from 'react'
import AuthenticationService from './AuthenticationService.js'

class LoginComponent extends Component {

    constructor(props) {
        super(props)

        this.state = {
            username: '',
            password: '',
            loginFail: false,
            successMsg: false
        }

    }

    handleChange = (event) => {
        this.setState(
            {
                [event.target.name]
                  :event.target.value
            }
        )
    }


    loginClicked = () => {
        if(this.state.username==='Chang' && this.state.password==='chang'){
            AuthenticationService.registerSuccessfulLogin(this.state.username,this.state.password)
            this.props.history.push(`/welcome/${this.state.username}`)
            window.location.reload();
        }
        else {
            this.setState({successMsg:false})
            this.setState({loginFail:true})
        }
    }

    render() {
        return (
            <div>
                <h1>Login</h1>
                <div className="container">
                    {/*<ShowInvalidCredentials loginFail={this.state.loginFail}/>*/}
                    {this.state.loginFail && <div className="alert alert-warning">Invalid Credentials</div>}
                    {this.state.successMsg && <div>Login Sucessful</div>}
                    {/*<ShowLoginSuccessMessage successMsg={this.state.successMsg}/>*/}
                    User Name: <input type="text" name="username" value={this.state.username} onChange={this.handleChange}/>
                    Password: <input type="password" name="password" value={this.state.password}  onChange={this.handleChange}/>
                    <button className="btn btn-success" onClick={this.loginClicked}>Login</button>
                </div>
            </div>
        )
    }
}

export default LoginComponent
