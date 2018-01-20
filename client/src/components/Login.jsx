import React from 'react';
import { Divider, Form, Label, Button, Header, Image, Modal } from 'semantic-ui-react';
import Filter from 'bad-words';

class Login extends React.Component {
  constructor(props) {
    super(props);
  }

  onSubmit = (e) => {
    e.preventDefault();
    const { history } = this.props;
    this.props.authenticate(e.target.id).then((res) => {
      if (res.data === 'Login successful') {
        history.push('/#');
      } else if (res.data === 'Congratulations! Welcome to hue.') {
        history.push('/createAvatar');
      } else {
        alert(res.data);
      }
    });
  }

  componentDidMount() {
    this.props.authorize()
  }

  render() {
    return (
      <div className="ui center aligned segment">
        <Form id="login" onSubmit={this.onSubmit}>
          <Header as='h3'>Log In</Header>
          <Form.Field inline>
            <input onChange={this.props.usernameChange} placeholder='Username' />
          </Form.Field>
          <Form.Field inline>
            <input onChange={this.props.passwordChange} placeholder='Password' type='password' />
          </Form.Field>
          <Form.Field inline>
            <Button type="submit">Login</Button>
          </Form.Field>
        </Form>

        <br></br>
        <a href="https://www.youtube.com/watch?v=dQw4w9WgXcQ"> Forgot password? </a>
        <br></br>
        <br></br>

        <Form id="signup" onSubmit={this.onSubmit}>
          <Header as='h3'>Sign Up</Header>
          <Form.Field inline>
            <input onChange={this.props.emailChange} placeholder='Email' type='email' />
          </Form.Field>
          <Form.Field inline>
            <input onChange={this.props.usernameChange} placeholder='Username' />
          </Form.Field>
          <Form.Field inline>
            <input onChange={this.props.passwordChange} placeholder='Password' type='password' />
          </Form.Field>
          <Form.Field inline>
            <Button type="submit">Create Account</Button>
          </Form.Field>
        </Form>
      </div>
    );
  }
}

export default Login;
