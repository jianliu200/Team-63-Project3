import axios from 'axios';
import React, {useEffect, useRef} from 'react'
import {useState} from 'react';
import './App.css';
import Receipt from './receipt';
import {Route,Link} from 'react-router-dom';
import { GoogleLogout } from 'react-google-login';
import { gapi } from 'gapi-script';

/**
 * This is the function for the server tab on the website
 * @version 1.0.2
 * @author Anna Huang
 * @author Akhil Mathew
 */

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
          
            <h1 class="intro">Server</h1>
            
          <Receipt></Receipt>
      </body>
    </>
  );
}

export default Server;
