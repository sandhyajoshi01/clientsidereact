import React,{ Component } from 'react';
import {Card, Button, CardImg, CardTitle, CardText,
 CardColumns, CardSubtitle, CardBody,CardGroup } from 'reactstrap';
 import { Grid, Row, Col } from 'react-flexbox-grid';
import UserService from '../Service/UserService';
import AdminService from '../Service/AdminService';
import SearchBar from './SearchProduct';


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
          <>
          <Row>
          <SearchBar/>
          </Row>

          <Row >
          {this.state.Products.map( Product=>
          <Col>
          <CardGroup style={{marginTop:"20px"}} >
          <Card style={{width:"30rem"}}>
          <Row class="ProductContainer" >
          <Col  md="4" >
           <CardImg top width="100%" src={Product.proImageURL} alt={Product.proName} />
                     <Card key ={Product.product_ID} />
                     </Col>
                     <Col md="8">
                     <CardBody>

                         <CardTitle>{Product.proName}</CardTitle>
                         <CardSubtitle>${Product.proPrice} CAD</CardSubtitle>
                         <CardText>{Product.proDesc}</CardText>
                         <Button>Add to Cart</Button>
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