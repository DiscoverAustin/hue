import React from 'react'
import { Button, Header, Image, Modal, Input, Icon } from 'semantic-ui-react';
// import betterHue from './betterHue.png';
import axios from 'axios';

export default class PasswordReset extends React.Component {

  state = {
      email: '',
      emailSubmitted: false
  }

  handleEmailChange = (e) => {
    const email = e.target.value;
    this.setState({email});
  }

  resetPasswordClick = () => {
    this.setState({ emailSubmitted: true })
    axios.post('/api/resetPassword', { email: this.state.email })
    .then((res) => { console.log('password reset') })
    .catch((e) => { console.error(e) });
  }

  handleOpen = () => this.setState({ modalOpen: true })

  handleClose = () => this.setState({ modalOpen: false, emailSubmitted: false, email: '' })

  // <input  onKeyUp={this.onEmailChange} type="email" placeholder="yourEmail@domain.com">{this.state.email}</input>

  render = () => (
    <Modal
      style={{ height:'300px' }}
      size='small'
      trigger={<Button onClick={this.handleOpen}>Forgot Password?</Button>}
      onClose={this.handleCLose}
      open={this.state.modalOpen}
    >
      { !this.state.emailSubmitted ? (
        <Modal.Content>
          <Modal.Header><h2>Reset Password</h2></Modal.Header>
            <hr></hr>
            <br></br>
          <Modal.Content image>
            <Modal.Description>
              <p>To reset your password, enter the email associated with your user account below</p>
              <Input iconPosition='left' placeholder='Email' onKeyUp={this.handleEmailChange}>
                <Icon name='mail outline' />
                <input></input>
              </Input>
            </Modal.Description>
          </Modal.Content>
          <br></br>
          <Button positive onClick={ this.resetPasswordClick }>Reset Password </Button>
        </Modal.Content>
        ) :
        <Modal.Content>
          <Modal.Header><h2>Reset Password</h2></Modal.Header>
          <hr></hr>
          <br></br>
          <Modal.Content>
            <Modal.Description>
              <p>Thanks! You should receive an email with instructions for resetting your password shortly.</p>
            </Modal.Description>
          </Modal.Content>
          <br></br>
          <br></br>
          <Button positive onClick={ this.handleClose }>Close</Button>
        </Modal.Content>
        }
    </Modal>
  )
}
