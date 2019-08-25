import React, {Component} from 'react';

import NavbarHead from './Navbar';
import Carousel from './Carousel';
import ListProductsComponent from './ListProductsComponent';
import Footer from './Footer';

class Home extends Component{

        render() {
           return (
           <>
           <div className="home" backgroundColor="text-muted">

               <div className="container">
               <NavbarHead/>
               <Carousel/>
               <ListProductsComponent/>
               <Footer/>

                </div>
                </div>
                </>

           );
    }
  }
 export default Home;