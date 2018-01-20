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
      <Grid>
        <Grid.Column  width={10}>
          <EntryList 
            data = {this.props.data}
            user = {this.props.user}
            deleteEntry = {this.props.deleteEntry}
            getEntries = {this.props.getEntries}
            getComments = {this.props.getComments}
          />
        </Grid.Column>
        <Grid.Column width={6}>
          <Search 
            data = {this.props.data}
            handleSearch = {this.props.handleSearch}
          />
        </Grid.Column>
      </Grid>
    )
  }
}

export default Home;
