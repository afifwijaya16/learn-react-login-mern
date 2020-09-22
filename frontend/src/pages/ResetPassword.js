import React, {useState} from 'react'
import  { Redirect } from 'react-router-dom'
import axios from 'axios';
const ResetPassword = (props) => {

    const [password, setPassword]                           = useState('');
    const [errorPassword, setErrorPassword]                 = useState('');
    const [confirmPassword, setConfirmPassword]             = useState('');
    const [errorConfirmPassword, setErrorConfirmPassword]   = useState('');
    const [error, setError]                                 = useState('');
    const [alert, setAlert]                                 = useState('');
    const [redirect, setRedirect]                           = useState(false);

    const onChangePassword = (e) => {
        const value = e.target.value;
        setPassword(value);
        if(!value) {
            setErrorPassword('Password Tidak boleh kosong')
        } else {
            setErrorPassword('')
        }
    }

    const onChangeConfirmPassword = (e) => {
        const value = e.target.value;
        setConfirmPassword(value);
        if(!value) {
            setErrorConfirmPassword('Password Tidak boleh kosong')
        } else if(password !== value) {
            setErrorConfirmPassword('Password Tidak Sama')
        }
        else {
            setErrorConfirmPassword('')
        }
    }

    const resetNow = (e) => {
        const data = {
            password: password,
            token : props.match.params.token
        }
        axios.put('http://localhost:3001/resetpassword', data)
        .then(res => {
            setPassword('')
            setConfirmPassword('')
            setAlert('Password Berhasil diperbarui')
            setTimeout(() => {
                setAlert('')
                setRedirect(true)
            }, 3000)
            
        })
        .catch(err => {
            setError(err.response.data.message)
        })
    }

    return (
        <>
        {
            redirect && ( 
                <Redirect to="/" />
            )
        }
        <div className="login">
            <div className="form-signin">
                {
                    alert && (
                        <div className="alert alert-success text-center">
                            <p>{alert}</p>
                        </div>
                    )
                }
                {
                    error && (
                        <div className="alert alert-danger text-center">
                            <p>{error}</p>
                        </div>
                    )
                }
                <div className="form-group">
                    <label>New Password</label>
                    <input type="password" className="form-control" value={password} onChange={onChangePassword} placeholder="Masukan Password" />
                    {
                        errorPassword && ( 
                        <p className="text-danger">{errorPassword}</p>
                        )
                    }
                </div>
                <div className="form-group">
                    <label>Confirm Password</label>
                    <input type="password" className="form-control" value={confirmPassword} onChange={onChangeConfirmPassword} placeholder="Ulangi Password" />
                    {
                        errorConfirmPassword && ( 
                        <p className="text-danger">{errorConfirmPassword}</p>
                        )
                    }
                </div>
               
                <div className="my-2 d-inline">
                    <button className="btn btn-primary btn-block" onClick={resetNow} >Reset Password</button>
                </div>
            </div>
        </div>
        </>
    )
}
export default ResetPassword
