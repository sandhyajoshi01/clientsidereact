import React from 'react';
import { BrowserRouter as Router, Switch, Route, Link } from 'react-router-dom';
import './App.css';
import Home from './Component/Home';
import login from './Component/Login';
import signup from './Component/Signup2';
import cart from './Component/Cart';

function App() {
  return (
<>
 <Router>
          <div>
           <Switch>
           <Route exact path='/' component={Home} />
           <Route path='/login' component={login} />
           <Route path='/signup' component={signup} />
           <Route path='/cart' component={cart} />
           </Switch>
           </div>
           </Router>

       </>

  );

}

export default App;
