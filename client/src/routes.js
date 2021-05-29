import React from 'react';
import {Switch, Route, Redirect} from 'react-router-dom'
import MainPage from "./pages/MainPage/MainPage";
import AuthPage from "./pages/AuthPage/AuthPage";
import NewsPage from "./pages/NewsPage/NewsPage";
import MapPage from "./pages/MapPage/MapPage";
import StatPage from "./pages/StatPage/StatPage";
import SymptomsPage from "./pages/SymptomsPage/SymptomsPage";

export const useRoutes = isAuthorized => {
    if(isAuthorized) {
        return (
            <Switch>
                <Route path="/home" exact>
                    <MainPage/>
                </Route>
                <Route path="/news" exact>
                    <NewsPage/>
                </Route>
                <Route path="/map" exact>
                    <MapPage/>
                </Route>
                <Route path="/stats" exact>
                    <StatPage/>
                </Route>
                <Route path="/symptoms" exact>
                    <SymptomsPage/>
                </Route>
                <Redirect to='/home'/>
            </Switch>
        )
    }
    return (
        <Switch>
            <Route path='/' exact>
                <AuthPage/>
            </Route>
            <Redirect to='/'/>
        </Switch>
    )
}

