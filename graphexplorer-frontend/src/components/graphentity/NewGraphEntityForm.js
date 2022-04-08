import React from "react";
import {Button, Form, FormGroup, Input, Label } from "reactstrap";

import axios from 'axios';

import { GRAPH_ENTITY_API_URL } from "../../constants";
import Utilities from "../../helpers/Utilities";

class NewGraphEntityForm extends React.Component {
    state = {
        wikidataId: "",
        label: ""
    }

    componentDidMount() {
        if (this.props.graphentity) {
            const { wikidataId, label } = this.props.graphentity;
            this.setState({wikidataId, label});
        }
    }

    onChange = e => {
        this.setState({ [e.target.name]: e.target.value });
    }

    // TODO: Only allow Q/P IDs
    createGraphEntity = e => {
        e.preventDefault();
        
        Utilities.getAuthenticatedAxiosRequest()
          .post(GRAPH_ENTITY_API_URL, this.state)
          .then(() => {
              this.props.resetState();
              this.props.toggle();
          });
    }

    editGraphEntity = e => {
        e.preventDefault();

        Utilities.getAuthenticatedAxiosRequest()
          .put(GRAPH_ENTITY_API_URL + this.props.graphentity.wikidataId, this.state)
          .then(() => {
            this.props.resetState();
            this.props.toggle();
          });
    }

    render() {
        return (
          <Form onSubmit={this.props.graphentity ? this.editGraphEntity : this.createGraphEntity}>
            <FormGroup>
              <Label for="wikidataId">Wikidata Id:</Label>
              <Input
                type="text"
                name="wikidataId"
                onChange={this.onChange}
                value={this.state.wikidataId}
                disabled={!this.props.create}
              />
            </FormGroup>
            <FormGroup>
              <Label for="label">Label:</Label>
              <Input
                type="text"
                name="label"
                onChange={this.onChange}
                value={this.state.label}
              />
            </FormGroup>
            <Button>Send</Button>
          </Form>
        );
      }
}

export default NewGraphEntityForm;