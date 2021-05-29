import React from 'react'
import 'materialize-css'
import {useRoutes} from "./routes";
import {useAuth} from "./hooks/useAuth";
import {AuthContext} from "./contexts/AuthContext";
import NavBar from './components/NavBar/NavBar'


function App() {
  const {login, logout, token, userId} = useAuth()
  const isAuthorized = !!token
  const routes = useRoutes(isAuthorized)
  return (
      <AuthContext.Provider value={{
        login, logout, token, userId, isAuthorized
      }}>

        {isAuthorized && <NavBar/>}
           {routes}

      </AuthContext.Provider>
  );
}

export default App;
