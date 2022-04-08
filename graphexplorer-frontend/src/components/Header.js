import React, { Component } from "react";
import { Collapse, Nav, NavItem, Navbar, NavbarBrand, NavbarToggler, NavLink } from "reactstrap";
import Utilities from "../helpers/Utilities";
class Header extends Component {
  constructor(props) {
    super(props);

    this.onLogout = this.onLogout.bind(this);
    this.toggle = this.toggle.bind(this);
    this.state = {
      isOpen: false,
      is_logged_in: false
    };
  }

  componentDidMount() {
    this.setState({ is_logged_in: Utilities.isLoggedIn() })
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
        <NavbarBrand href="/">Graph Explorer</NavbarBrand>

              <NavbarToggler onClick={this.toggle} />

              <Collapse className="justify-content-end" isOpen={this.state.isOpen} navbar>
                <Nav navbar>
                  {
                    !this.state.is_logged_in ? (
                      <React.Fragment>
                        <NavItem>
                          <NavLink href="/register">Register</NavLink>
                        </NavItem>
                        <NavItem>
                          <NavLink href="/login">Login</NavLink>
                        </NavItem>
                      </React.Fragment>
                    ) : (
                      <NavItem>
                        <NavLink href="/" onClick={this.onLogout}>Logout</NavLink>
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