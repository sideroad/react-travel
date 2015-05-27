'use strict';

import React      from 'react';
import Marty      from 'marty';
import UserStore  from '../stores/UserStore';
import Router     from 'react-router';
import { Route, RouteHandler, DefaultRoute, State, Link, Redirect } from 'react-router';
import { DropdownButton, Nav, CollapsibleNav, MenuItem, NavItem, Navbar} from 'react-bootstrap';


class Navigation extends React.Component {
  render() {
    let user = this.props.user;
    let $link = user.id && user.picture ? 
                (<span><img className="user" src={user.picture} alt={user.name} />{user.name}</span>) : 
                (<span>{user.name}</span>);
    let $user = user.id ? (
          <DropdownButton title={$link} >
            <MenuItem eventKey='1' href="/logout" >Logout</MenuItem>
          </DropdownButton>
      ) : (
        <NavItem eventKey={1} href='/login'>Login</NavItem>
      );

    return (
      <Navbar brand={<Link className="navbar-brand" to="app">Logo will be here</Link>} toggleNavKey={0} >
        <CollapsibleNav eventKey={0}>
          <Nav navbar right>
            {$user}
          </Nav>
        </CollapsibleNav>
      </Navbar>
    );
  }
};

export default Marty.createContainer(Navigation, {
  listenTo: UserStore,
  fetch: {
    user() {
      return UserStore.take();
    }
  }
});

