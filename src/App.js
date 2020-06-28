import React from 'react';
import { BrowserRouter as Router, Switch, Route, Link } from 'react-router-dom';
import './App.css';
import Home from './Component/Home';
import login from './Component/Login';
import signup from './Component/Signup';
import cart from './Component/Cart';
import checkout from './Component/Checkout';
import usercontrol from "./Component/UserControl";
import PurchaseHistory from "./Component/PurchaseHistory";
import ContractHistory from "./Component/ContractHistory";


function App() {
    return (
        <>
            <Router>
                <div>
                    <Switch>
                        <Route exact path='/' component={Home}/>
                        <Route path='/login' component={login}/>
                        <Route path='/signup' component={signup}/>
                        <Route path='/cart' component={cart}/>
                        <Route path='/checkout' component={checkout}/>
                        <Route path='/usercontrol'component={usercontrol}/>
                        <Route path='/purchasehistory' component={PurchaseHistory}/>
                        <Route path='/contracthistory' component={ContractHistory}/>
                    </Switch>
                </div>
            </Router>

        </>

    );

}

export default App;
