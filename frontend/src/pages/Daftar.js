import React, {useState} from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';

const Daftar = () => {

    const [username, setUsername]       = useState('');
    const [email, setEmail]             = useState('');
    const [password, setPassword]       = useState('');
    const [alert, setAlert]             = useState('');
    const [error, setError]             = useState('');

    const onChangeUsername = (e) => {
        const value = e.target.value;
        setUsername(value);
        setError('');
    }

    const onChangeEmail = (e) => {
        const value = e.target.value;
        setEmail(value);
        setError('');
    }

    const onChangePassword = (e) => {
        const value = e.target.value;
        setPassword(value);
        setError('');
    }
    
    const clickdaftar = () => {
        const data = {
            username: username,
            email: email, 
            password: password
        }
        axios.post('http://localhost:3001/daftar', data)
        .then(result => {
            if(result){
                if(result.data) {
                    setUsername('')
                    setEmail('')
                    setPassword('')
                    setAlert(result.data.message)
                    setTimeout(() => {
                        setAlert('')
                    }, 3000)
                }
            } 
        })
        .catch(e => {
            setError(e.response.data.message)
        })
    }
    return (
        <div className="login">
            <div className="form-signin">
                {
                    alert && (
                        <div className="alert alert-primary text-center">
                            <p className="p-0">{alert}</p>
                        </div>
                    )
                }
                {
                    error && (
                        <div className="alert alert-danger text-center">
                            <p className="p-0">{error}</p>
                        </div>
                    )
                }
                <div className="form-group">
                    <label>Username</label>
                    <input type="text" className="form-control" value={username} onChange={onChangeUsername} placeholder="Masukan Username"/>
                </div>
                <div className="form-group">
                    <label>Email</label>
                    <input type="text" className="form-control" value={email} onChange={onChangeEmail} placeholder="Masukan Email" />
                </div>
                <div className="form-group">
                    <label>Password</label>
                    <input type="password" className="form-control" value={password} onChange={onChangePassword} placeholder="Masukan Password" />
                </div>
               
                <div className="my-2 d-inline">
                    <button className="btn btn-primary btn-block" onClick={clickdaftar} >Daftar</button>
                    <Link className="btn btn-warning btn-block" to="/">Kembali</Link>
                </div>
            </div>
        </div>
    )
}

export default Daftar;