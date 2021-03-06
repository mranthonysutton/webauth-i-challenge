import React from 'react';
import {Route} from 'react-router-dom';
import NavBar from './components/NavBar';
import Login from './components/Login';
import ListUsers from './components/ListUsers';
import Register from './components/Register';
import './App.css';

function App() {
  return (
    <div className="App">
      <Route path={'/'} component={NavBar} />
      <Route exact path={'/'} component={Login} />
      <Route exact path={'/users'} component={ListUsers} />
      <Route path={'/register'} component={Register} />
    </div>
  );
}

export default App;
