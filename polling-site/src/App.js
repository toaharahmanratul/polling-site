import HomePage from './components/HomePage';
import PrivateRoute from './components/PrivateRoute'
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import { createContext, useState } from 'react';
import LoginPage from './components/LoginPage';
import CreatePollPage from './components/CreatePollPage';
import SignUpPage from './components/SignUpPage';
import DisplayPolls from './components/DisplayPolls';
export const UserContext = createContext();

function App() {
  const [user, setUser] = useState({});
  return (
    <UserContext.Provider value={[user, setUser]}>
      <Router>
        {/* <Header></Header> */}
        <Switch>
          <Route exact path="/">
            <HomePage></HomePage>
          </Route>
          <Route path="/home">
            <HomePage></HomePage>
          </Route>
          <Route path="/login">
            <LoginPage></LoginPage>
          </Route>
          <Route path="/signup">
            <SignUpPage></SignUpPage>
          </Route>
          <Route path="/polls">
            <DisplayPolls />
          </Route>

          <PrivateRoute path="/createPoll">
            <CreatePollPage />
          </PrivateRoute>

          <PrivateRoute path="/poll/:id">
            <DisplayPolls />
          </PrivateRoute>
          
        </Switch>
      </Router>
    </UserContext.Provider>
  );
}

export default App;
