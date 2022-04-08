import React, { Component } from "react";
import { Card, CardBody, CardFooter, CardLink, Col, Container, Row} from "reactstrap";

// import GraphEntityList from "./graphentity/GraphEntityList";
// import NewGraphEntityModal from "./graphentity/NewGraphEntityModal";

import axios from "axios";

import { GRAPH_ENTITY_API_URL, GRAPH_FACT_API_URL } from "../constants";
import SearchBar from "./search/SearchBar";
import Utilities from "../helpers/Utilities";
// import GraphFactList from "./graphfact/GraphFactList";
// import NewGraphFactModal from "./graphfact/NewGraphFactModal";

class Home extends Component {

  constructor(props) {
    super(props);

    this.getGraphFacts = this.getGraphFacts.bind(this);
    this.resetState = this.resetState.bind(this);
    this.state = {
      is_logged_in: false,
      graphentities: [],
      graphfacts: [],
    };
  }

  componentDidMount() {
    this.resetState();
  }

  getGraphFacts = () => {
    axios.get(GRAPH_FACT_API_URL).then(res => this.setState({ graphfacts: res.data }));
  };

  resetState = () => {
    this.setState({ is_logged_in: Utilities.isLoggedIn() })
  };

  render() {
    return (
      <Container>
        <Row className="align-items-start justify-content-center">
          <Col xs="12" className="mb-5">
            <Card color="light">
              <CardBody className="text-center">
                <h1 className="card-title display-2">Graph Explorer</h1>
                <p className="lead">Explore Facts and Entities from Wikidata and make edits</p>
                {
                  !this.state.is_logged_in &&
                    (
                      <React.Fragment>
                        <CardLink className="btn btn-outline-dark" href="/register">Register</CardLink>
                        <CardLink className="btn btn-outline-dark" href="/login">Login</CardLink>
                      </React.Fragment>
                    )
                }
                
              </CardBody>
              <CardFooter className="fw-bold text-end">Made by Alex Phair</CardFooter>
            </Card>
          </Col>

          {
            this.state.is_logged_in && (
              <Col xs="12">
                <SearchBar/>
              </Col>
            )
          }


        </Row>
      </Container>
    );
  }
}

export default Home;