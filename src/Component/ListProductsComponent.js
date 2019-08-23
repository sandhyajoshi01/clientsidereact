import React,{ Component } from 'react';
import UserService from '../Service/UserService';
import AdminService from '../Service/AdminService';
import imageLoader from './images.js';

class ListProductsComponent extends Component{
  constructor(props){
    super(props)
    this.state={
    Products:[],
    Images:[],
    Message:null
    }
    this.displayProducts=this.displayProducts.bind(this);

  }
  componentDidMount(){
    this.displayProducts();
    const images=imageLoader();
    this.setState({images});
  }
  displayProducts(){
    UserService.getAllProducts().then(
      response=>{
      console.log(response);
      this.setState({ Products: response.data })
      }
    )
  }
  deleteProduct(ID){
  AdminService.deleteProduct(ID).then(
  response=>{
  this.setState({message:`Delete of Product ${ID} successful!`});
  this.displayProducts();
  }
  )
  }

  render() {
          return (
              <div className="container">
                  <div className="container">
                      <table className="table">
                          <thead>
                              <tr>
                                  <th>Name</th>
                                  <th>Price</th>
                              </tr>
                          </thead>
                          <tbody>
                              {
                                  this.state.Products.map(
                                      Product =>
                                          <tr key={Product.product_ID}>
                                              <td>{Product.proName}</td>
                                              <td>${Product.proPrice}</td>
                                              <td><button className="btn AddToCart"
                                               onClick={() => this.addProduct(Product.product_ID)}>Add to cart</button></td>
                                          </tr>
                                  )
                              }
                          </tbody>
                      </table>
                  </div>
              </div>
          )
      }

}

export default ListProductsComponent;