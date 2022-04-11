import React, { Component } from "react";
import { Card, CardBody, CardFooter, Col, Container, Row} from "reactstrap";

import SearchBar from "./search/SearchBar";
import { Link } from "react-router-dom";

class Home extends Component {

  constructor(props) {
    super(props);

    this.state = {
      graphentities: [],
      graphfacts: [],
    };
  }

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
                  !this.props.is_logged_in &&
                    (
                      <React.Fragment>
                        <Link className="btn btn-outline-dark card-link" to="/register">Register</Link>
                        <Link className="btn btn-outline-dark card-link" to="/login">Login</Link>
                      </React.Fragment>
                    )
                }
                
              </CardBody>
              <CardFooter className="fw-bold text-end">Made by Alex Phair</CardFooter>
            </Card>
          </Col>

          {
            this.props.is_logged_in && (
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