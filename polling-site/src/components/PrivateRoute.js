import React from 'react';
import { useContext } from 'react';
import { Redirect, Route } from 'react-router-dom';
import { UserContext } from '../App';

const PrivateRoute = ({ children, ...rest }) => {
    const [loggedUser, setLoggedUser] = useContext(UserContext);
    
    console.log(loggedUser)
    return (
        <Route
            {...rest}
            render={({ location }) =>
                loggedUser.useremail ? (
                    children
                ) : (
                    <Redirect
                        to={{
                            pathname: "/login",
                            state: { from: location }
                        }}
                    />
                )
            }
        />
    );
};

export default PrivateRoute;