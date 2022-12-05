import axios from 'axios';
import React, { useEffect } from 'react'
import {useState} from 'react';
import './App.css';
import Receipt from './receipt';
import {Route,Routes} from 'react-router-dom';
import MapFront from './googlemap/mapfrontend'
import { GoogleLogout } from 'react-google-login';
import { gapi } from 'gapi-script';


//import LogIn from './OAuth/oafront.js'

function Customer() {
  const [ profile, setProfile ] = useState([]);
  const clientId = '7130970063-8l4ukqnaa0o24aiklhbbb8vbo8rpos8a.apps.googleusercontent.com';
  useEffect(() => {
    const initClient = () => {
      gapi.auth2.init({
          clientId: clientId,
          scope: ''
      });
    };
  }, [])
    const logOut = () => {
        setProfile(null);
        document.getElementById("btnCustomer").hidden=true;
        document.getElementById("loginControl").hidden=false;
    
        document.getElementById("btnGoogleLogin").hidden=false;
        document.getElementById("btnGoogleLogout").hidden=true;
        document.getElementById("btnManager").hidden=true;
        document.getElementById("btnServer").hidden=true;
        
      };
  return (
    <>
      <nav class="navigation">
        <a href="/"><img src="/cfa-logo.png" width="50" height="50"></img></a>
        <div class="more-header">
          <a href="/App">Home</a>
          <a href="/googlemap" >Locations</a>
          <GoogleLogout clientId={clientId} 
            buttonText="Log out" onLogoutSuccess={logOut}
          />
        </div>
        
      </nav>
      <Routes>
        <Route exact path = "/customer" element = {<Customer/>}/>
        <Route exact path = "/googlemap" element={<MapFront/>}/>
      </Routes>
      <div class="customer-body">
          <h1 class="intro">Welcome to Chick-Fil-A!</h1>
          <Receipt></Receipt>
      </div>
    </>
  );
}

export default Customer;