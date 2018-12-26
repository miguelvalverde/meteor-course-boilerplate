import { Meteor } from 'meteor/meteor';
import React from 'react';
import { Router, Route, browserHistory } from 'react-router';

import Dashboard from '../ui/Dashboard';
import NotFound from '../ui/NotFound';
import Login from '../ui/Login';
import Signup from '../ui/Signup';


const unauthenticatedPages = [
    '/',
    '/signup'
];
const authenticatedPages = [
    '/dashboard'
];
const onEnterPublicPage = () => {
    if(Meteor.userId()) {
        browserHistory.replace('/dashboard');
    }
};
const onEnterPrivatePage = () => {
    const isAuthenticated = !!Meteor.userId();

    if(!isAuthenticated) {
        browserHistory.replace('/')
    }
};

export const onAuthChange = (isAuthenticated) => {
    const pathname = browserHistory.getCurrentLocation().pathname;
    const isUnauthenticatedPage = unauthenticatedPages.includes(pathname);
    const isAuthenticatedPage = authenticatedPages.includes(pathname);

    // If on unauthenticated page and logged in, redirect to to /dashboar
    if(isUnauthenticatedPage && isAuthenticated) {
        browserHistory.replace('/dashboard');
    }
    // If on authenticated page and not logged in, redirect to /
    else if (isAuthenticatedPage && !isAuthenticated) {
        browserHistory.replace('/');
    };  
}

export const routes = (
    <Router history={browserHistory}>
        <Route path="/" component={Login} onEnter={onEnterPublicPage}/>
        <Route path="/signup" component={Signup} onEnter={onEnterPublicPage}/>
        <Route path="/dashboard" component={Dashboard} onEnter={onEnterPrivatePage}/>
        <Route path="*" component={NotFound}/>
    </Router>
);