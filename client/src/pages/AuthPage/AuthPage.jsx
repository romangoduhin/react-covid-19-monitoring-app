import React, {useContext, useEffect, useState} from 'react';
import request from "../../axios";
import {useMessage} from "../../hooks/useMessage";
import {AuthContext} from "../../contexts/AuthContext";
import s from "./AuthPage.module.scss"


function AuthPage() {
    const auth = useContext(AuthContext)
    const message = useMessage()
    const [form, setForm] = useState({
        email: '',
        password: ''
    });
    const [error, setError] = useState(null);

    useEffect(() => {
        message(error)
        setError(null)
    }, [error])

    useEffect(() => {
        window.M.updateTextFields()
    }, [])

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
            auth.login(data.data.token, data.data.userId)
            message(data.data.message)
        } catch (e) {
            setError(e.response.data.message)
        }
    }

    return (
        <div className={s.authWrapper}>
            <div className={s.authBlock}>
                <h5><i className="material-icons">hearing</i>Covid listener</h5>
                <div className={s.inputsWrapper}>
                    <div className="input-field">
                        <input
                            className={s.input}
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
                            className={s.input}
                            placeholder="Input password"
                            id="password"
                            type="text"
                            name="password"
                            onChange={changeHandler}
                        />
                        <label htmlFor="password">Password</label>
                    </div>
                </div>

                <div className={s.buttons}>
                    <button className='btn green darken-1  white-text' onClick={loginHandler}
                            style={{marginRight: '20px'}}
                            >Sign in
                    </button>

                    <button className='btn green darken-1  white-text' onClick={registrationHandler}>Sign
                        up
                    </button>
                </div>
            </div>
        </div>
    );
}

export default AuthPage;