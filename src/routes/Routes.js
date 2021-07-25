import React from 'react'
import { useSelector } from 'react-redux';

import { Switch, Route, Redirect } from 'react-router-dom';
import Cookies from 'universal-cookie/es6';

import {
    Routes,
} from "./RoutesConfig";


import PageNotFound from '../pages/PageNotFound'
import Login from '../pages/Login';
import Home from '../pages/Home';


// Redux
import store from '../redux/store';
import { fetchBankDetailsThunk, fetchUserThunk, selectUser } from '../redux/reducers/user';


function Routes() {
    return (
        <>
            <Switch>
                <Route path="/" exact component={Home} />
                <Route
                    path="/login"
                    exact
                    component={Login}
                />

                {/* Routes Loop*/}

                {Routes.map(({ path, name, Component }, key) => (
                    <PrivateRoute exact path={path} key={key} >
                        <Component />
                    </PrivateRoute>
                ))}

                <Route path="*" exact component={PageNotFound} />

            </Switch>

        </>
    )
}

function PrivateRoute({ children, ...rest }) {
    let cookie = new Cookies();
    let getCookie = cookie.get('token');


    const { forceLogOut, user, is_redirect } = useSelector(selectUser);

    if (is_redirect) {
        console.log(is_redirect, 'is redirect');
        return (
            <Redirect to={is_redirect}
            />
        );

    }

    if (getCookie && !user.email_address) {
        store.dispatch(fetchUserThunk());
        store.dispatch(fetchBankDetailsThunk());
    }


    if (getCookie) {

        return (<Route
            render={({ location }) =>
                children
            }
        />

        );
    } else {
        return (
            <Redirect to="/login" />
        );

    }

    return <div></div>;
}

export default Routes
