import React, {Component} from 'react';

import NavbarHead from './Navbar';
import Carousel from './Carousel';
import ListProductsComponent from './ListProductsComponent';
import Footer from './Footer';

class Home extends Component{
    constructor(props) {
        super(props);
        this.state={
            cart:[]
        }
        this.getCart=this.getCart.bind(this)
    }

    getCart(cart){
        this.setState({cart:cart})

    }

        render() {
           return (
           <>
           <div className="home" backgroundColor="text-muted">

               <div className="container">
               <NavbarHead/>
               <Carousel/>
               <ListProductsComponent cart={this.getCart}/>
               <Footer/>

                </div>
                </div>
                </>

           );
    }
  }
 export default Home;