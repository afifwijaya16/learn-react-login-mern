import React, {useState} from 'react'
import { Link, Redirect } from 'react-router-dom'
import Axios from 'axios';
const Login = () => {

    const [username, setUsername]   = useState('');
    const [password, setPassword]   = useState('');
    const [error, setError]         = useState('');
    const [redirect, setRedirect]   = useState(false);

    const onChangeUsername = (e) => {
        const value = e.target.value;
        setUsername(value);
        setError('');
    }

    const onChangePassword = (e) => {
        const value = e.target.value;
        setPassword(value);
        setError('');
    }

    const submitLogin = () => {
        const data = {
            username: username,
            password: password,
        }
        Axios.post('http://localhost:3001/login', data)
        .then(result => {
            console.log(result)
            if(result) {
                localStorage.setItem('token', result.data.token)
                setRedirect(true)
            }
        })
        .catch(e => {
            setError(e.response.data.message)
            setPassword('')
        })
    }
    return (
        <>
            {
                redirect && ( 
                    <Redirect to="/dashboard" />
                )
            }
            <div className="login">
                <div className="form-signin">
                    {
                        error && (
                            <div className="alert alert-danger text-center">
                                <p>{error}</p>
                            </div>
                        )
                    }
                    <div className="form-group">
                        <label>Username</label>
                        <input type="text" className="form-control" value={username} onChange={onChangeUsername} placeholder="Masukan Username" />
                    </div>
                    <div className="form-group">
                        <label>Password</label>
                        <input type="password" className="form-control" value={password} onChange={onChangePassword} placeholder="Masukan Password" />
                    </div>
                    <button className="btn btn-warning btn-block" onClick={submitLogin} >Sign in</button>
                    <div className="text-right my-2">
                        <Link className="link-button" to="/forgotpassword">Lupa Password</Link>
                    </div>
                    <div className="text-right my-2">
                        <Link className="link-button" to="/daftar">Daftar</Link>
                    </div>
                </div>
            </div>
        </>
    );
}
export default Login;