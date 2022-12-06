import React, { useState, useEffect } from 'react';
import { GoogleLogin, GoogleLogout } from 'react-google-login';
import { gapi } from 'gapi-script';
import { useLocation } from "react-router";
import Manager from './manager';
import Customer from './customer';
import Server from './server';
import roles from './roles.json';
import './App.css';

import Salesreport from './manager/salesreport';
import ExcessReport from './manager/excessreport';
import FoodUpdate from './manager/foodupdate';

import MapFront from './googlemap/mapfrontend'

function App (){
  
  const [ profile, setProfile ] = useState([]);
  const clientId = '7130970063-8l4ukqnaa0o24aiklhbbb8vbo8rpos8a.apps.googleusercontent.com';
  const googleTranslateElementInit = () => {
    new window.google.translate.TranslateElement({ pageLanguage: 'en', 
    layout: window.google.translate.TranslateElement.FloatPosition.TOP_LEFT }, 
    'google_translate_element')
  }
  useEffect(() => {
    const initClient = () => {
      gapi.auth2.init({
          clientId: clientId,
          scope: ''
      });
    };
    gapi.load('client:auth2', initClient);
    var addScript = document.createElement('script');
    addScript.setAttribute('src', '//translate.google.com/translate_a/element.js?cb=googleTranslateElementInit');
    document.body.appendChild(addScript);
    window.googleTranslateElementInit = googleTranslateElementInit;
  }, [])

  const onSuccess = (res) => {
    
    setProfile(res.profileObj);
    const config = roles.find(item => item.email === res.profileObj.email);
    
    if(config !== undefined) {
      if (config.role === 'Manager') {
          document.getElementById("btnManager").hidden=false;
          document.getElementById("btnServer").hidden=true;
          document.getElementById("btnCustomer").hidden=true;
      } else if (config.role === 'Server') {
          document.getElementById("btnManager").hidden=true;
          document.getElementById("btnServer").hidden=false;
          document.getElementById("btnCustomer").hidden=true;
      } else if (config.role === 'Customer') {
        document.getElementById("btnManager").hidden=true;
        document.getElementById("btnServer").hidden=true;
        document.getElementById("btnCustomer").hidden=false;
      }
    } else {
      document.getElementById("btnManager").hidden=true;
      document.getElementById("btnServer").hidden=true;
      document.getElementById("btnCustomer").hidden=false;
    }
    
    document.getElementById("loginControl").hidden=true;
    document.getElementById("btnGoogleLogin").hidden=true;
    document.getElementById("btnGoogleLogout").hidden=false;
  };


  const onFailure = (err) => {
    console.log('Login in failed', err);
  };

  const logOut = () => {
    setProfile(null);
    document.getElementById("loginControl").hidden=false;

    document.getElementById("btnGoogleLogin").hidden=false;
    document.getElementById("btnGoogleLogout").hidden=true;
    document.getElementById("btnManager").hidden=true;
    document.getElementById("btnServer").hidden=true;
    document.getElementById("btnCustomer").hidden=true;
  };

  return (
    <>
      <div id="google_translate_element"></div>
      <div class="login">
        <div class="l">
      
          <div id="loginControl">
            <p class="login-text">
              <h1>Chick-Fil-A Login</h1>
            </p>
          </div>
        
          <div id="btnGoogleLogin">
            <GoogleLogin      
                clientId={clientId}
                buttonText="Sign in"
                onSuccess={onSuccess}
                onFailure={onFailure}
                cookiePolicy={'single_host_origin'}
                isSignedIn={true}
            />
          </div>
        </div>

  {/* <div id="btnGoogleLogout" hidden="true">
    <GoogleLogout clientId={clientId} 
    buttonText="Log out" onLogoutSuccess={logOut}
    />
  </div> */}
  

  <div id="btnManager" hidden="true">
    {/* <Routes>
      <Route exact path = "/manager" element = {<Manager/>}/>
      <Route exact path = "/manager/salesreport" element = {<Salesreport/>}/>
      <Route exact path = "/manager/excessreport" element={<ExcessReport/>}/>
      <Route exact path = "/manager/foodUpdate" element={<FoodUpdate/>}/>
    </Routes> */}
    <Manager/>

  </div>

  <div id="btnServer" hidden="true">
    <Server/>
  </div>

  <div id="btnCustomer" hidden="true">
    {/* <Routes>
        <Route exact path = "/customer" element = {<Customer/>}/>
        <Route exact path = "/googlemap" element={<MapFront/>}/>
      </Routes> */}
    <Customer/>
  </div>
</div>
  </>
);
}
export default App;