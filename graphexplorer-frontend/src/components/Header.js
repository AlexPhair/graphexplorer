import React, { Component } from "react";
import { Link } from "react-router-dom";
import { Collapse, Nav, NavItem, Navbar, NavbarToggler } from "reactstrap";
import Utilities from "../helpers/Utilities";
class Header extends Component {
  constructor(props) {
    super(props);

    this.onLogout = this.onLogout.bind(this);
    this.toggle = this.toggle.bind(this);
    this.state = {
      isOpen: false
    };
  }

  toggle() {
    this.setState({
      isOpen: !this.state.isOpen
    });
  }

  onLogout(e) {
    Utilities.deleteLoginToken();
  }

  render() {
    return (
      <Navbar color="dark" dark expand="md">
        <Link to="/" className="navbar-brand">Graph Explorer</Link>
              <NavbarToggler onClick={this.toggle} />
              <Collapse className="justify-content-end" isOpen={this.state.isOpen} navbar>
                <Nav navbar>
                  {
                    !this.props.is_logged_in ? (
                      <React.Fragment>
                        <NavItem>
                          <Link to="/register" className="nav-link">Register</Link>
                        </NavItem>
                        <NavItem>
                          <Link to="/login" className="nav-link">Login</Link>
                        </NavItem>
                      </React.Fragment>
                    ) : (
                      <NavItem>
                        <Link to="/" className="nav-link" onClick={this.onLogout}>Logout</Link>
                      </NavItem>
                    )
                  }
                </Nav>
              </Collapse>

      </Navbar>
    );
  }
}

export default Header;