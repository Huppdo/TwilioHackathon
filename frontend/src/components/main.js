import React from 'react';
import { Switch, Route } from 'react-router-dom';

import mainPage from '../pages/mainpage';
import signIn from '../pages/signin';
import signUp from '../pages/signup';
import friendsPage from '../pages/friendspage';
import videoPage from '../pages/videopage';

const Main = () => {
    return (
        <Switch> {/* The Switch decides which component to show based on the current URL.*/}
            <Route exact path='/' component={mainPage} />
            <Route exact path='/signin' component={signIn} />
            <Route exact path='/signup' component={signUp} />
            <Route exact path='/main' component={friendsPage} />
            <Route exact path='/video' component={videoPage} />
        </Switch>
    );
}

export default Main;