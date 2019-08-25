import React, { Component } from "react";
import { Col, Button, Form, FormGroup, Label, Input,Container } from "reactstrap";
import ListProductsComponent from './ListProductsComponent';


class SearchBar extends Component {

  state = {
    query: "",
    data: [],
    filteredData: []
  };

  handleInputChange = event => {
    const query = event.target.value;

    this.setState(prevState => {
      const filteredData = prevState.data.filter(element => {
        return element.proName.toLowerCase().includes(query.toLowerCase());
      });

      return {
        query,
        filteredData
      };
    }, this.getData);
  };

  getData = () => {
    fetch(`ListProductsComponent.Products`)
      .then(response => response.json())
      .then(data => {
        const { query } = this.state;
        const filteredData = data.filter(element => {
          return element.proName.toLowerCase().includes(query.toLowerCase());
        });

        this.setState({
          data,
          filteredData
        });
      });
  };

  componentWillMount() {
    this.getData();
  }

  render() {
    return (
    <Container className="Search">

            <Form className="searchForm" >

                <FormGroup>
                  <Input
                    type="search"
                    name="search"
                    id="txtSearch"
                    placeholder="Search Product"
                    icon="search"
                                value={this.state.query}
                                onChange={this.handleInputChange}
                  />
                  <div>{this.state.filteredData.map(i => <p>{i.proName}</p>)}</div>
                </FormGroup>
            </Form>
          </Container>

    );
  }


}

export default SearchBar;