import React, { Component } from "react";
import { Col, Container, Row } from "reactstrap";

import GraphEntityList from "./graphentity/GraphEntityList";
import NewGraphEntityModal from "./graphentity/NewGraphEntityModal";

import axios from "axios";

import { GRAPH_ENTITY_API_URL, GRAPH_FACT_API_URL } from "../constants";
import GraphFactList from "./graphfact/GraphFactList";
import NewGraphFactModal from "./graphfact/NewGraphFactModal";

class Home extends Component {
  state = {
    graphentities: [],
    graphfacts: [],
  };

  componentDidMount() {
    this.resetState();
  }

  getGraphEntities = () => {
    axios.get(GRAPH_ENTITY_API_URL).then(res => this.setState({ graphentities: res.data }));
  };

  getGraphFacts = () => {
    axios.get(GRAPH_FACT_API_URL).then(res => this.setState({ graphfacts: res.data }));
  };

  resetState = () => {
    this.getGraphEntities();
    this.getGraphFacts();
  };

  render() {
    return (
      <Container style={{ marginTop: "20px" }}>
        <p>Graph Entities:</p>
        <Row>
          <Col>
            <GraphEntityList
              graphentities={this.state.graphentities}
              resetState={this.resetState}
            />
          </Col>
        </Row>
        <Row>
          <Col>
            <NewGraphEntityModal create={true} resetState={this.resetState} />
          </Col>
        </Row>
        <hr/>
        <p>Graph Facts:</p>
        <Row>
          <Col>
            <GraphFactList
              graphfacts={this.state.graphfacts}
              graphentities={this.state.graphentities}
              resetState={this.resetState}
            />
          </Col>
        </Row>
        <Row>
          <Col>
            <NewGraphFactModal create={true} graphentities={this.state.graphentities} resetState={this.resetState} />
          </Col>
        </Row>
      </Container>
    );
  }
}

export default Home;