import React from 'react'
import {BrowserRouter} from "react-router-dom";
import 'materialize-css'
import {useRoutes} from "./routes";
import {useAuth} from "./hooks/useAuth";
import {AuthContext} from "./contexts/AuthContext";


function App() {
  const {login, logout, token, userId} = useAuth()
  const isAuthorized = !!token
  const routes = useRoutes(isAuthorized)
  return (
      <AuthContext.Provider value={{
        login, logout, token, userId, isAuthorized
      }}>
        <BrowserRouter>
          <div className="container"> {routes}</div>
        </BrowserRouter>
      </AuthContext.Provider>
  );
}

export default App;
