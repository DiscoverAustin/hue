import React from 'react';
import { Link } from 'react-router-dom';
import { Divider, Form, Label, Button, Header, Menu } from 'semantic-ui-react'
import EntryList from './EntryList.jsx';

class Nav extends React.Component {
  constructor(props) {
    super(props);
  }
  

  // Renders different versions of the componet depending if a user is logged in
  render (props) {
    if (this.props.user !== undefined) { // This renders if a user is logged in
      return (
        <Menu className="myMenu">

          <Menu.Item name='home' className="nav" href='#/'>
              <h1 className="text">hue</h1>
          </Menu.Item>

          <Menu.Item name='submit' className="nav text" href='#/submit'>
              New Post
          </Menu.Item>

          <Menu.Item name='sort' className="nav text" href='#/' onClick={this.props.sortByVotes}>
              Popular
          </Menu.Item>

          <Menu.Item name='nightmode' className="nav text" onClick={() => this.props.toggleClass()} >
              {this.props.nightmode ? 'Day Mode' : 'Night Mode'}
          </Menu.Item>

          <Menu.Menu position="right" onClick={this.toggleClass}>
            <Menu.Item name='logout' position='right' className="nav text"
              href="#/login" onClick={() => this.props.authenticate('#\logout')}>
                Logout
            </Menu.Item>

            <Menu.Item position='right' name='username' className="nav text"
              href={`#/user/${this.props.user}`}>
                <i className="user icon"></i>
                {this.props.user} 
            </Menu.Item>

          </Menu.Menu>

        </Menu>
      )
    } else { // This renders if a user is not logged in
      return (
        <Menu className="myMenu">

          <Menu.Item name='home' className="nav" href='#/'>
              <h1 className="text">hue</h1>
          </Menu.Item>

          <Menu.Item name='submit' className="nav text" href='#/submit'>
              New Post
          </Menu.Item>

            <Menu.Menu position="right"> 
            <Menu.Item name='login' className="nav text" href="#/login">
                Login
            </Menu.Item>
            
            <Menu.Item name='username' className="nav" href="#/login">
              <i className="user icon"></i> 
            </Menu.Item>
            
          </Menu.Menu>

        </Menu>
      );
    }
  }
}

export default Nav;
