import React, { Component } from 'react'
import { Redirect } from 'react-router-dom'
import Axios from 'axios';

export default class Dashboard extends Component {
    constructor(props) {
        super(props);
        this.state = {
          items: [],
          token: localStorage.getItem('token')
        };
    }
    componentDidMount() {
        Axios.get('http://localhost:3001/user', {
            headers: {
                'Authorization' : this.state.token
            }
        })
        .then((result) => {
            this.setState({
                items: result.data.data
            })
        })
        .catch((err) => {
            console.log(err)
        })
    }

    logout = () => {
        localStorage.clear();
        this.props.history.push('/');
    }

    render() {
        
        if(!this.state.token) {
            return <Redirect to="/" />
        }
        
        return (
            <div className="container">
                <h5>Halaman Dashboard {this.state.items.email}</h5>
                <button onClick={this.logout}>Logout</button>
            </div>
        )
    }
}
