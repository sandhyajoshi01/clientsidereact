import React, { Component } from "react";
import { Col, Button, Form, FormGroup, Label, Input } from "reactstrap";
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
    });
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
      <div className="searchForm">
        <form>
          <input
            placeholder="Search for..."
            value={this.state.query}
            onChange={this.handleInputChange}
          />
        </form>
        <div>{this.state.filteredData.map(i => <p>{i.proName.toLowerCase()}</p>)}</div>
      </div>
    );
  }


}

export default SearchBar;