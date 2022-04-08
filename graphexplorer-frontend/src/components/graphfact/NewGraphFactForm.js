import React from "react";
import {Button, Form, FormGroup, Input, Label } from "reactstrap";
import axios from 'axios';

import { GRAPH_FACT_API_URL } from "../../constants";
import Utilities from "../../helpers/Utilities";

class NewGraphEntityForm extends React.Component {
    state = {
        id: 0,
        leftEntity: "",
        property: "",
        rightEntity: "",
    }

    componentDidMount() {
        if (this.props.graphfact) {
            const { id, leftEntity, property, rightEntity } = this.props.graphfact;
            this.setState({id, leftEntity, property, rightEntity});
        }
    }

    onChange = e => {
        this.setState({ [e.target.name]: e.target.value });
    }

    createGraphFact = e => {
        e.preventDefault();
        Utilities.getAuthenticatedAxiosRequest()
            .post(GRAPH_FACT_API_URL, this.state).then(() => {
                this.props.resetState();
                this.props.toggle();
            })
    }

    editGraphFact = e => {
        e.preventDefault();
        Utilities.getAuthenticatedAxiosRequest()
            .put(GRAPH_FACT_API_URL + this.props.graphfact.id, this.state).then(() => {
                this.props.resetState();
                this.props.toggle();
            })
    }

    render() {
        const properties = this.props.graphentities.filter(graphentity => graphentity.wikidataId.startsWith("P"))
        const entities = this.props.graphentities.filter(graphentity => graphentity.wikidataId.startsWith("Q"))

        return (
            <Form onSubmit={this.props.graphfact ? this.editGraphFact : this.createGraphFact}>
                <FormGroup>
                    <Label for="leftEntity">Left Entity:</Label>
                    <Input type="select" name="leftEntity" id="leftEntity" onChange={this.onChange} defaultValue={this.props.graphfact ? this.props.graphfact.leftEntity: "DEFAULT"}>
                        <option value="DEFAULT" disabled>Choose a Left Entity...</option>
                        {entities.map(graphentity => <option key={graphentity.wikidataId} value={graphentity.wikidataId}>{graphentity.label}</option>)}
                    </Input>
                </FormGroup>
                <FormGroup>
                    <Label for="property">Property:</Label>
                    <Input type="select" name="property" id="property" onChange={this.onChange} defaultValue={this.props.graphfact ? this.props.graphfact.property: "DEFAULT"}>
                        <option value="DEFAULT" disabled>Choose a Property...</option>
                        {properties.map(graphentity => <option key={graphentity.wikidataId} value={graphentity.wikidataId}>{graphentity.label}</option>)}
                    </Input>
                </FormGroup>
                <FormGroup>
                    <Label for="rightEntity">Right Entity:</Label>
                    <Input type="select" name="rightEntity" id="rightEntity" onChange={this.onChange} defaultValue={this.props.graphfact ? this.props.graphfact.rightEntity: "DEFAULT"}>
                        <option value="DEFAULT" disabled>Choose a Right Entity...</option>
                        {entities.map(graphentity => <option key={graphentity.wikidataId} value={graphentity.wikidataId}>{graphentity.label}</option>)}
                    </Input>
                </FormGroup>
                <Button>Send</Button>
            </Form>
        );
      }
}

export default NewGraphEntityForm;