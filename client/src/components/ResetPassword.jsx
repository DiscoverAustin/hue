import React from 'react';
import { Divider, Form, Label, Button, Header, Menu, Icon, Input, Container } from 'semantic-ui-react';
import axios from 'axios';

export default class resetPassword extends React.Component {

  constructor(props) {
    super(props)
    this.state = {
      newPassword: '',
      confirmPassword: '',
      passwordsMatch: false
    }
  }

  handleNewPassword = (e) => {
    const newPassword = e.target.value;
    this.setState({newPassword});
  }

  handleConfirmPassword = (e) => {
    const confirmPassword = e.target.value;
    this.setState({confirmPassword});
    if (this.state.newPassword === this.state.confirmPassword) {
      this.setState({passwordsMatch: true});
    } else {
      this.setState({passwordsMatch: false});
    }
  }

  handleSavePassword = () => {
    const username = this.props.location.search.split('=')[1];
    axios.post('/api/changePassword', { password: this.state.newPassword, username })
    .then((res) => {
      this.props.history.push('/');
    })
    .catch((e) => {
      console.error(e);
      this.props.history.push('/');
    });
  }

  render = () => {
    return (
      <Container text>
        <Header as='h2'>Reset Password</Header>
        <p>Enter your new password below</p>
        <Input onKeyUp={this.handleNewPassword} type="password" placeholder="Enter Password"></Input>
        <br></br>
        <br></br>
        {this.state.newPassword !== '' && (<Input onKeyUp={this.handleConfirmPassword} placeholder="Confirm Password"></Input>)}
        <br></br>
        <br></br>
        {this.state.confirmPassword !== '' && this.state.newPassword === this.state.confirmPassword && ( <Button positive onClick={this.handleSavePassword}>Save Password</Button>)}
      </Container>
    )
  }
};
