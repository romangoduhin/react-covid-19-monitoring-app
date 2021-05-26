import React, {useContext} from 'react';
import {NavLink, useHistory} from 'react-router-dom'
import {AuthContext} from '../contexts/AuthContext'

function NavBar(props) {
    const history= useHistory()
    const auth = useContext(AuthContext);

    const logoutHandler = (event) => {
        event.preventDefault()
        auth.logout()
        history.push('/')
    }

    return (
        <nav>
            <div className="nav-wrapper green">
                <a href="#" className="brand-logo">Logo</a>
                <ul id="nav-mobile" className="right hide-on-med-and-down">
                    <li><NavLink to='/'>Home</NavLink></li>
                    <li><NavLink to='/map'>Map</NavLink></li>
                    <li><NavLink to='/news'>News</NavLink></li>
                    <li><NavLink to='/stats'>Stats</NavLink></li>
                    <li><a href='/' onClick={logoutHandler}>Logout</a></li>
                </ul>
            </div>
        </nav>
    );
}

export default NavBar;