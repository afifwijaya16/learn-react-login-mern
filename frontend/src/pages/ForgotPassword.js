import React, {useState} from 'react'
import Axios from 'axios';
const ForgotPassword = () => {

    const [email, setEmail]   = useState('');
    const [error, setError]   = useState('');
    const [alert, setAlert]   = useState('');

    const onChangeEmail = (e) => {
        const value = e.target.value;
        setEmail(value);
        setError('');
    }

    const kirimEmail = () => {
        const data = {
            email: email, 
        }
        if(!data.email) {
            setError('Email Tidak Boleh Kosong');
        } else {
            Axios.put('http://localhost:3001/forgotpassword', data)
            .then(res => {
                setEmail('')
                setAlert('Silahkan Cek Email Anda')
                setTimeout(() => {
                    setAlert('')
                }, 3000)
            })
            .catch(err => {
                setError(err.response.data.message)
                setEmail('')
            })
        }
    }
    return (
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
                    <label>Email</label>
                    <input type="text" className="form-control" value={email} onChange={onChangeEmail} placeholder="Masukan Email" />
                </div>
                
                <button className="btn btn-warning btn-block" onClick={kirimEmail}>Send Link</button>
            </div>
        </div>
        
    );
}
export default ForgotPassword;