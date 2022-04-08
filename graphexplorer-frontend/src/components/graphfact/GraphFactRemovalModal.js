import React, { Component, Fragment } from "react";
import { Modal, ModalHeader, Button, ModalFooter } from "reactstrap";

import axios from "axios";

import { GRAPH_FACT_API_URL } from "../../constants";
import Utilities from "../../helpers/Utilities";

class GraphFactRemovalModal extends Component {
  state = {
    active: false
  };

  toggle = () => {
    this.setState(currentValue => ({
        active: !currentValue.active
    }));
  };

  deleteGraphFact = id => {
    Utilities.getAuthenticatedAxiosRequest()
      .delete(GRAPH_FACT_API_URL + id).then(() => {
        this.props.resetState();
        this.toggle();
      });
  };

  render() {
    return (
      <Fragment>
        <Button color="danger" onClick={() => this.toggle()}>
          Remove
        </Button>
        <Modal isOpen={this.state.active} toggle={this.toggle}>
          <ModalHeader toggle={this.toggle}>
            Are you sure that you want to delete Fact "{this.props.graphfact.leftEntity} {this.props.graphfact.property} {this.props.graphfact.rightEntity}"?
          </ModalHeader>

          <ModalFooter>
            <Button type="button" onClick={() => this.toggle()}>
              Cancel
            </Button>
            <Button
              type="button"
              color="primary"
              onClick={() => this.deleteGraphFact(this.props.graphfact.id)}
            >
              Yes
            </Button>
          </ModalFooter>
        </Modal>
      </Fragment>
    );
  }
}

export default GraphFactRemovalModal;