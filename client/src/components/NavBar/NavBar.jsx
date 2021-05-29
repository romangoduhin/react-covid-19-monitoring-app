import React, {useContext} from 'react';
import {NavLink, useHistory} from 'react-router-dom'
import {AuthContext} from '../../contexts/AuthContext'

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
                <NavLink to="/home" className="brand-logo">
                    <i style={{marginLeft:"20px", marginTop:"2px"}} className="material-icons">hearing</i>Covid listener</NavLink>
                <ul id="nav-mobile" className="right hide-on-med-and-down">
                    <li><NavLink to='/home'>Home</NavLink></li>
                    <li><NavLink to='/news'>News</NavLink></li>
                    <li><NavLink to='/map'>Map</NavLink></li>
                    <li><NavLink to='/stats'>Stats</NavLink></li>
                    <li><NavLink to='/symptoms'>Symptoms</NavLink></li>
                    <li><a href='/' onClick={logoutHandler}>Logout</a></li>
                </ul>
            </div>
        </nav>
    );
}

export default NavBar;