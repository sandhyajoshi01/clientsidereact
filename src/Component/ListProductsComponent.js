import React,{ Component } from 'react';
import {Card, Button, CardImg, CardTitle, CardText,
 CardColumns, CardSubtitle, CardBody,CardGroup } from 'reactstrap';
 import { Grid, Row, Col } from 'react-flexbox-grid';
import UserService from '../Service/UserService';
import AdminService from '../Service/AdminService';
import SearchBar from './SearchProduct';
import cart from './Cart';


class ListProductsComponent extends Component{
  constructor(props){
    super(props)
    this.state={
    Products:[],
    Message:null
    }
    this.displayProducts=this.displayProducts.bind(this);
    this.addToCart=this.addToCart.bind(this);

  }
  componentDidMount(){
    this.displayProducts();
  }
  displayProducts(){
    UserService.getAllProducts().then(
      response=>{
      console.log(response);
      this.setState({ Products: response.data })
      }
    )
  }

  addToCart(Product) {
        localStorage.setItem('currentProduct', JSON.stringify(Product));
        this.props.history.push('/cart/'+Product.id);
    }

  render() {
          return (
          <>
          <Row>
          <SearchBar/>
          </Row>
          <Row>
          {this.state.Products.map(Product=>
          <Col>
          <CardGroup style={{marginTop:"20px",marginBottom:"20px",marginRight:"10px"}} >
          <Card style={{width:"30rem"}}>
          <Row className="ProductContainer" >
          <Col  md="4" >
           <CardImg top width="100%" src={Product.proImageURL} alt={Product.proName} style={{maxHeight:"350px"}}/>

                     <Card key ={Product.product_ID} />
                     </Col>
                     <Col md="8">
                     <CardBody>

                         <CardTitle>{Product.proName}</CardTitle>
                         <CardTitle>{Product.proBrand}</CardTitle>
                         <CardSubtitle>${Product.proPrice} CAD</CardSubtitle>
                         <CardText>{Product.proDesc}</CardText>
                         <Button onClick={() => this.addToCart(Product)}>Add to Cart</Button>
                       </CardBody>
                   </Col>
                   </Row>
                   </Card>
                   </CardGroup>
                   </Col>
                   )}
                   </Row>
                   </>
          )
      }
}

export default ListProductsComponent;