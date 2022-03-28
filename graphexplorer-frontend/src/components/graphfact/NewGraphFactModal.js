import React from "react";
import { Button, Modal, ModalHeader, ModalBody } from "reactstrap";
import NewGraphFactForm from "./NewGraphFactForm";

class NewGraphFactModal extends React.Component {
    state = {
        active: false
    };

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
                    graphentities={this.props.graphentities}
                  />
                </ModalBody>
              </Modal>
            </React.Fragment>
          );
    }
}

export default NewGraphFactModal;