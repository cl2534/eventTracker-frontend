import axios from 'axios'

class EventDataService {
    retrieveAllEvents(name) {
        //console.log('executed service')
        return axios.get(`http://localhost:8080/users/${name}/events`);
    }

    retrieveEvent(name, id) {
        //console.log('executed service')
        return axios.get(`http://localhost:8080/users/${name}/events/${id}`);
    }

    deleteEvent(name, id) {
        //console.log('executed service')
        return axios.delete(`http://localhost:8080/users/${name}/events/${id}`);
    }

    updateEvent(name, id, event) {
        //console.log('executed service')
        return axios.put(`http://localhost:8080/users/${name}/events/${id}`, event);
    }

    createEvent(name, event) {
        //console.log('executed service')
        return axios.post(`http://localhost:8080/users/${name}/events/`, event);
    }
}

export default new EventDataService()
