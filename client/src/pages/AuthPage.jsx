import React, {useContext, useEffect, useState} from 'react';
import 'materialize-css';
import request from "../axios";
import {useMessage} from "../hooks/useMessage";
import {AuthContext} from "../contexts/AuthContext";


function AuthPage(props) {
    const auth = useContext(AuthContext)
    const message = useMessage()
    const [form, setForm] = useState({
        email: '',
        password: ''
    });
    const [error, setError] = useState(null);

    useEffect(()=>{
        message(error)
        setError(null)
    },[error])

    const changeHandler = event => {
        setForm({...form, [event.target.name]: event.target.value})
    }

    const registrationHandler = async() => {
        try {
            const data = await request.post('/api/auth/register', {...form})
            message(data.data.message)
        } catch (e) {
            setError(e.response.data.message)
        }
    }

    const loginHandler = async() => {
        try {
            const data = await request.post('/api/auth/login', {...form})
            console.log("DATA",data)
            auth.login(data.data.token,data.data.userId)
            message(data.data.message)
        } catch (e) {
            setError(e.response.data.message)
        }
    }

    return (
        <div className="row">
            <div className="col s6 offset-s3">
                <div className="card green accent-2">
                    <div className="card-content white-text">
                        <span className="card-title">Authorization</span>
                        <div>
                            <div className="input-field">
                                <input
                                    placeholder="Input email"
                                    id="email"
                                    type="text"
                                    name="email"
                                    onChange={changeHandler}
                                />
                                <label htmlFor="email">Email</label>
                            </div>
                            <div className="input-field">
                                <input
                                    placeholder="Input password"
                                    id="password"
                                    type="text"
                                    name="password"
                                    onChange={changeHandler}
                                />
                                <label htmlFor="password">Password</label>
                            </div>
                        </div>
                    </div>
                    <div className="card-action">
                        <button className='btn yellow green lighten-4 black-text' onClick={loginHandler} style={{marginRight: '20px'}}
                                black-text>Sign in
                        </button>
                        <button className='btn yellow green lighten-4 black-text' onClick={registrationHandler}>Sign
                            up
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default AuthPage;