import React, { Component, Fragment } from "react";
import { Modal, ModalHeader, Button, ModalFooter } from "reactstrap";

import axios from "axios";

import { GRAPH_ENTITY_API_URL } from "../../constants";
import Utilities from "../../helpers/Utilities";

class GraphEntityRemovalModal extends Component {
  state = {
    active: false
  };

  toggle = () => {
    this.setState(currentValue => ({
        active: !currentValue.active
    }));
  };

  deleteGraphEntity = wikidataId => {
    Utilities.getAuthenticatedAxiosRequest()    
      .delete(GRAPH_ENTITY_API_URL + wikidataId).then(() => {
        this.props.resetState();
        this.toggle();
      });
  };

  render() {
    return (
      <Fragment>
        <Button className="ms-2" color="danger" onClick={() => this.toggle()}>
          Remove
        </Button>
        <Modal isOpen={this.state.active} toggle={this.toggle}>
          <ModalHeader toggle={this.toggle}>
            Are you sure that you want to delete Entity {this.props.graphentity.label} ({this.props.graphentity.wikidataId})?
          </ModalHeader>

          <ModalFooter>
            <Button type="button" onClick={() => this.toggle()}>
              Cancel
            </Button>
            <Button
              type="button"
              color="primary"
              onClick={() => this.deleteGraphEntity(this.props.graphentity.wikidataId)}
            >
              Yes
            </Button>
          </ModalFooter>
        </Modal>
      </Fragment>
    );
  }
}

export default GraphEntityRemovalModal;