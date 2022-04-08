import React from "react";
import { Button, Modal, ModalHeader, ModalBody } from "reactstrap";
import { GRAPH_ENTITY_API_URL } from "../../constants";
import Utilities from "../../helpers/Utilities";
import NewGraphFactForm from "./NewGraphFactForm";

class NewGraphFactModal extends React.Component {

  constructor(props) {
    super(props);

    this.state = {
      active: false,
      graphentities: []
    };
  }

  componentDidMount() {
    Utilities.getAuthenticatedAxiosRequest()
      .get(GRAPH_ENTITY_API_URL)
      .then(res => this.setState({ graphentities: res.data }));
  }

  toggle = () => {
    this.setState(currentValue => ({
      active: !currentValue.active
    }));
  }

  render() {
    const create = this.props.create;

    let title, button;
    if (create) {
      title = "Creating a new Graph Fact";
      button = (
        <Button
          color="primary"
          className="float-right"
          onClick={this.toggle}
          style={{ minWidth: "200px" }}
        >
          Create New
        </Button>
      );        
    } else {
      title = "Editing an existing Graph Fact";
      button = <Button onClick={this.toggle}>Edit</Button>;
    }

    return (
      <React.Fragment>
        {button}
        <Modal isOpen={this.state.active} toggle={this.toggle}>
          <ModalHeader toggle={this.toggle}>{title}</ModalHeader>

          <ModalBody>
            <NewGraphFactForm
              resetState={this.props.resetState}
              toggle={this.toggle}
              graphfact={this.props.graphfact}
              graphentities={this.state.graphentities}
            />
          </ModalBody>
        </Modal>
      </React.Fragment>
    );
  }
}

export default NewGraphFactModal;