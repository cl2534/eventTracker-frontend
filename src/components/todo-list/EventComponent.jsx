import React, {Component} from 'react'
import moment from 'moment'
import { Formik, Form, Field, ErrorMessage } from 'formik';
import EventDataService from '../../api/event/EventDataService.js'
import AuthenticationService from './AuthenticationService.js'

class EventComponent extends Component {

    constructor(props) {
        super(props)

        this.state = {
            id : this.props.match.params.id,
            description : '',
            targetDate : moment(new Date()).format('YYYY-MM-DD')
        }

        // this.onSubmit = this.onSubmit.bind(this)
        // this.validate = this.validate.bind(this)

    }

    componentDidMount() {

        if(this.state.id===-1) {
            return
        }

        let username = AuthenticationService.getLoggedInUserName()

        EventDataService.retrieveEvent(username, this.state.id)
             .then(response => this.setState({
                description: response.data.description,
                targetDate: moment(response.data.targetDate).format('YYYY-MM-DD')
             }))
    }

    validate = (values) => {
        let errors = {}
        if(!values.description) {
            errors.description = 'Enter a Event Description'
        } else if(values.description.length<5) {
            errors.description = 'Enter at least 5 Characters in Event Description'
        }

        if(!moment(values.targetDate).isValid()) {
            errors.targetDate = 'Enter a valid Target Date'
        }

        return errors

    }

    onSubmit = (values) => {
        let username = AuthenticationService.getLoggedInUserName()

        let event = {
            id: this.state.id,
            description: values.description,
            targetDate: values.targetDate
        }

        if (this.state.id === -1) {
            EventDataService.createEvent(username, event)
                .then(() => this.props.history.push('/events'))
        } else {
            EventDataService.updateEvent(username, this.state.id, event)
                .then(() => this.props.history.push('/events'))
        }

    }

    render() {

        let {description,targetDate} = this.state

        return (
            <div>
                <h1>Event</h1>
                <div className="container">
                    <Formik
                        initialValues={{description,targetDate}}
                        onSubmit={this.onSubmit}
                        validateOnChange={false}
                        validateOnBlur={false}
                        validate={this.validate}
                        enableReinitialize={true}
                    >
                        {
                            (props) => (
                                <Form>
                                    <ErrorMessage name="description" component="div"
                                                                className="alert alert-warning"/>
                                    <ErrorMessage name="targetDate" component="div"
                                                                className="alert alert-warning"/>
                                    <fieldset className="form-group">
                                        <label>Event Name</label>
                                        <Field className="form-control" type="text" name="description"/>
                                    </fieldset>
                                    <fieldset className="form-group">
                                        <label>Event Date</label>
                                        <Field className="form-control" type="date" name="targetDate"/>
                                    </fieldset>
                                    <button className="btn btn-success" type="submit">Save</button>
                                </Form>
                            )
                        }
                    </Formik>

                </div>
            </div>
        )
    }
}

export default EventComponent
