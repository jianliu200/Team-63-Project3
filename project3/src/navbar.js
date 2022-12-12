import React from 'react';
import {Link} from 'react-router-dom';
import { GoogleLogout } from 'react-google-login';

function NavBar(){
    // Code for Google OAuth
    const clientId = '7130970063-8l4ukqnaa0o24aiklhbbb8vbo8rpos8a.apps.googleusercontent.com';
    // Hide buttons if user logs out
    const logOut = () => {
        setProfile(null);
        document.getElementById("loginControl").hidden=false;
    
        document.getElementById("btnGoogleLogin").hidden=false;
        document.getElementById("btnGoogleLogout").hidden=true;
        document.getElementById("btnManager").hidden=true;
        document.getElementById("btnServer").hidden=true;
        document.getElementById("btnCustomer").hidden=true;
      };
    // Return HTML code for the navigation bar
    return(
        <nav class="navigation">
            <a href="/"><img src="/cfa-logo.png" width="50" height="50"></img></a>
            <div class="more-header">
                <a href="/customer">Customer</a>
                <a href="/server">Server</a>
                <a href="/manager">Manager</a>
                <a href="/googlemap">Locations</a>
            </div>
        <GoogleLogout clientId={clientId} 
            buttonText="Log out" onLogoutSuccess={logOut}
        />
        </nav>
    )
}

export default NavBar;