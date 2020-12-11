import React from 'react';
import { Provider } from "react-redux";
import { configureStore } from '../store';
import { BrowserRouter as Router } from "react-router-dom";
import Navbar from './Navbar';
import Main from './Main';
import { setAuthorizationToken, setCurrentUser } from '../store/actions/auth';
import jwtDecode from 'jwt-decode';



const store = configureStore();


// if the server goes down OR Redux store would be clear ,
// and the page refreshes , we wanna make sure 
// if we can still see if there is a token in the local storage and if so,
// we can repapulate or rehaidrate our state with the CURRENT USER
if (localStorage.jwtToken) {
  setAuthorizationToken(localStorage.jwtToken);
  // prenvet someone from manully tampering with the key of jwtToken in localStorage
  try {
    store.dispatch(setCurrentUser(jwtDecode(localStorage.jwtToken)))
  } catch (e) {
    store.dispatch(setCurrentUser({}));
  }
}


const App = () => {
  return (
  <Provider store ={store} >
      <Router>
        <div className="onboarding" >
          <Navbar />
          <Main/>
        </div>
    </Router>
  </Provider>
  )
};

export default App;