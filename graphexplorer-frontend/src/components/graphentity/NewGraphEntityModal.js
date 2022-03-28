import React from "react";
import { Button, Modal, ModalHeader, ModalBody } from "reactstrap";
import NewGraphEntityForm from "./NewGraphEntityForm";

class NewGraphEntityModal extends React.Component {
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
            title = "Creating a new Graph Entity";
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
            title = "Editing an existing Graph Entity";
            button = <Button onClick={this.toggle}>Edit</Button>;
        }

        return (
            <React.Fragment>
              {button}
              <Modal isOpen={this.state.active} toggle={this.toggle}>
                <ModalHeader toggle={this.toggle}>{title}</ModalHeader>
      
                <ModalBody>
                  <NewGraphEntityForm
                    resetState={this.props.resetState}
                    toggle={this.toggle}
                    graphentity={this.props.graphentity}
                  />
                </ModalBody>
              </Modal>
            </React.Fragment>
          );
    }
}

export default NewGraphEntityModal;