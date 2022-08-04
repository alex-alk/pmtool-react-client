import React, { Component } from "react";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { logout } from "../../actions/securityActions";
import { Navbar, Nav, NavDropdown } from "react-bootstrap";

class Header extends Component {
  logout() {
    this.props.logout();
    window.location.href = "/";
  }
  render() {
    const { validToken, user } = this.props.security;
    const userIsAuthenticated = (
      <Navbar.Collapse id="mobile-nav">
        <ul className="navbar-nav mr-auto">
          <li className="nav-item">
            <Link className="nav-link text-light" to="/dashboard">
              Dashboard
            </Link>
          </li>
        </ul>

        <ul className="navbar-nav ml-auto">
          <li className="nav-item">
            <Link className="nav-link text-light" to="/dashboard">
              <i className="fas fa-user-circle mr-1"></i> {user.fullname}
            </Link>
          </li>
          <li className="nav-item">
            <Link
              className="nav-link text-light"
              to="/logout"
              onClick={this.logout.bind(this)}
            >
              Logout
            </Link>
          </li>
        </ul>
      </Navbar.Collapse>
    );

    const userIsNotAuthenticated = (
      <Navbar.Collapse id="mobile-nav">
        <ul className="navbar-nav ml-auto">
          <li className="nav-item">
            <Link className="nav-link text-white" to="/register">
              Sign Up
            </Link>
          </li>
          <li className="nav-item">
            <Link className="nav-link text-white" to="/login">
              Login
            </Link>
          </li>
        </ul>
      </Navbar.Collapse>
    );

    let headerLinks;

    if (validToken && user) {
      headerLinks = userIsAuthenticated;
    } else {
      headerLinks = userIsNotAuthenticated;
    }

    return (
      <Navbar
        expand="sm"
        className="navbar navbar-expand-sm navbar-dark bg-dark mb-4"
      >
        <div className="container">
          <Link className="navbar-brand" to="/">
            Project Management Tool
          </Link>

          <Navbar.Toggle aria-controls="mobile-nav" />
          {headerLinks}
        </div>
      </Navbar>
    );
  }
}

Header.propTypes = {
  logout: PropTypes.func.isRequired,
  security: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
  security: state.security,
});

export default connect(mapStateToProps, { logout })(Header);
