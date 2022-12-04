import React from 'react';
import { GoogleLogin } from 'react-google-login';

function logIn(){
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
	
}

export default logIn;