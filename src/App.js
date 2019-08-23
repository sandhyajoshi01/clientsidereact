import React from 'react';
import { BrowserRouter as Router, Switch, Route, Link } from 'react-router-dom';
import './App.css';
import NavbarHead from './Component/Navbar';
import login from './Component/Login';
import signup from './Component/Signup';
import ListProductsComponent from './Component/ListProductsComponent';



function App() {
  return (
<>
 <Router>
          <div>
           <Switch>
                        <Route path='/login' component={login} />
                        <Route path='/signup' component={signup} />
                    </Switch>
                    </div>
                    </Router>
    <div className="container">
    <NavbarHead/>
    <ListProductsComponent/>

       </div>
       </>

  );

}

export default App;
