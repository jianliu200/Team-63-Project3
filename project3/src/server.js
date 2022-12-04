import axios from 'axios';
import React, {useEffect, useRef} from 'react'
import {useState} from 'react';
import './App.css';
import Receipt from './receipt';
import {Route,Link} from 'react-router-dom';
import { GoogleLogout } from 'react-google-login';
import { gapi } from 'gapi-script';

function Server() {
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
        document.getElementById("btnServer").hidden=true;
        document.getElementById("loginControl").hidden=false;
    
        document.getElementById("btnGoogleLogin").hidden=false;
        document.getElementById("btnGoogleLogout").hidden=true;
        document.getElementById("btnManager").hidden=true;
        document.getElementById("btnCustomer").hidden=true;
      };
  return (
    <>
      <body>
      <nav class="navigation">
        <a href="/"><img src="/cfa-logo.png" width="50" height="50"></img></a>
        <div class="more-header">
          <GoogleLogout clientId={clientId} 
            buttonText="Log out" onLogoutSuccess={logOut}
          />
        </div>
        
      </nav>
          <h1>Welcome to Chick-Fil-A</h1>
            <h1>This is the Server tab</h1>
            <img src='chick.jpg' alt = "chick fila logo" />
            
          <Receipt></Receipt>
      </body>
    </>
  );
}

export default Server;