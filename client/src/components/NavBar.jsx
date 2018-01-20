import React from 'react';
import { Link } from 'react-router-dom';
import { Divider, Form, Label, Button, Header, Menu } from 'semantic-ui-react'
import EntryList from './EntryList.jsx';
import Search from './Search.jsx';

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
              <h1 className="text">BetterHue</h1>
          </Menu.Item>

          <Menu.Item name='submit' className="nav" href='#/submit'>
              <div className='text'>New Post</div>
          </Menu.Item>

          <Menu.Item name='sort' className="nav" href='#/' onClick={this.props.sortByVotes}>
              <div className='text'>Popular</div>
          </Menu.Item>

          <Menu.Item name='sort' className="nav" href='#/' onClick={this.props.sortByTime}>
              <div className='text'>Recent</div>

          </Menu.Item>

          <Menu.Item name='nightmode' className="nav" onClick={() => this.props.toggleClass()} >
              <div className='text'>{this.props.nightmode ? 'Day Mode' : 'Night Mode'}</div>
          </Menu.Item>

          <Menu.Menu position="right" onClick={this.toggleClass}>

            <Menu.Item position="right" >
              <Search 
                data = {this.props.data}
                handleSearch = {this.props.handleSearch}
              />
            </Menu.Item>

            <Menu.Item name='logout' position='right' className="nav"
              href="#/login" onClick={() => this.props.logoutUser()}>
                <div className='text'>Logout</div>
            </Menu.Item>

            <Menu.Item position='right' name='username' className="nav"
              href={`#/user/${this.props.user}`}>
                <div className='text'><i className="user icon"></i>
                {this.props.user} </div>
            </Menu.Item>

          </Menu.Menu>

        </Menu>
      )
    } else { // This renders if a user is not logged in
      return (
        <Menu className="myMenu">

          <Menu.Item name='home' className="nav" href='#/'>
              <h1 className="text">BetterHue</h1>
          </Menu.Item>

          <Menu.Menu position="right"> 

            <Menu.Item name='login' className="nav text" href="#/login">
                <div className='text'>Login</div>
            </Menu.Item>
            
            <Menu.Item name='username' className="nav" href="#/login">
              <div className='text'><i className="user icon"></i></div>
            </Menu.Item>

          </Menu.Menu>

        </Menu>
      );
    }
  }
}

export default Nav;
