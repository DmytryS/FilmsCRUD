import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router';
import { Navbar, FormGroup, FormControl, Nav, NavItem, Button} from 'react-bootstrap';


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
          <Navbar.Header>
            <Navbar.Toggle />
          </Navbar.Header>
          <Navbar.Collapse>
            <Navbar.Form pullLeft>
              <FormGroup>
                <FormControl type="text" placeholder="Search" />
              </FormGroup>{' '}
              <Button type="submit">Submit</Button>
            </Navbar.Form>
            <Nav pullRight>
              <NavItem>
                <Link to="films/new">Add Film</Link>
              </NavItem>
              <NavItem>
                <div className="form-group">
                  <label>Import from file</label>
                  <input type="file"/>
                </div>
              </NavItem>
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
            <Navbar.Toggle />
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
            <Navbar.Toggle />

            <Nav pullRight>
              <NavItem>
                <Button bsStyle="warning" onClick={()=> {this.props.onDeleteClick()}}>Delete Film</Button>
              </NavItem>
            </Nav>
          </Navbar.Header>
        </Navbar>
      );
    }
  };

  render() {
    return (
      <nav className="navbar navbar-default navbar-static-top">
        <div id="navbar" className="navbar-collapse collapse">
          {this.renderLinks()}
        </div>
      </nav>
    );
  }
}

export default Header