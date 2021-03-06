import React from 'react';
import { Link } from 'react-router-dom';
import { Grid, Divider, Form, Label, Button, Header, Menu } from 'semantic-ui-react'
import EntryList from './EntryList.jsx';
import Search from './Search.jsx';



class Home extends React.Component {
  constructor(props) {
    super(props);
  }

  componentDidMount() {
    this.props.authorize()
  }

  render (props) {


    return (
          <EntryList 
            data = {this.props.data}
            user = {this.props.user}
            deleteEntry = {this.props.deleteEntry}
            getEntries = {this.props.getEntries}
            getComments = {this.props.getComments}
          />
    )
  }
}

export default Home;
