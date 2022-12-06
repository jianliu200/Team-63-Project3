import { Auth0Provider } from '@auth0/auth0-react';
import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import {BrowserRouter,HashRouter} from 'react-router-dom';

//rendering the front end
const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <HashRouter>
    
      <App />
   
    </HashRouter>
  </React.StrictMode>
  
  , 
  // document.querySelector('#root')
)


/*"start": "react-scripts start"*/

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals