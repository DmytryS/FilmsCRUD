import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router';
import { Navbar, Nav, NavItem, Button} from 'react-bootstrap';

class Header extends Component {
  static contextTypes = {
    router: PropTypes.object
  };

  componentWillUnmount() {
    this.props.resetMe();
  }

  componentWillReceiveProps(nextProps) {
    if(nextProps.deletedFilm.error && nextProps.deletedFilm.error.message) {
      alert(nextProps.deletedFilm.error.message || 'Could not delete. Please try again.');
    } else if(nextProps.deletedFilm.post && !nextProps.deletedFilm.error) {
      this.context.router.push('/');
    }
  }

  renderLinks() {
    const { type } = this.props;
    if(type === 'films_index') {
      return (
        <Navbar>
          <Navbar.Collapse>
            <Nav pullRight>
              <NavItem componentClass={Link} href="/films/new" to="/films/new">Add film</NavItem>
            </Nav>
          </Navbar.Collapse>
        </Navbar>
      );
    } else if(type === 'films_add') {
      return (
        <Navbar>
          <Navbar.Header>
            <Navbar.Brand>
              <Link to="/">Main</Link>
            </Navbar.Brand>
          </Navbar.Header>
        </Navbar>
      );
    } else if(type === 'films_show') {
      return (
        <Navbar>
          <Navbar.Header>
            <Navbar.Brand>
              <Link to="/">Main</Link>
            </Navbar.Brand>
          </Navbar.Header>
          <Navbar.Collapse>
            <Nav pullRight>
              <NavItem>
                <Button bsStyle="warning" onClick={()=> {this.props.onDeleteClick();this.context.router.push('/');}}>Delete Film</Button>
              </NavItem>
            </Nav>
          </Navbar.Collapse>
        </Navbar>
      );
    }
  };

  render() {
    return (
      <div>
        {this.renderLinks()}
      </div>

    );
  }
}

export default Header