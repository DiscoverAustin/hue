import React from 'react';
import { Link } from 'react-router-dom';
import { Grid, Card, Image, Feed, Icon, Divider, Comment, Tab } from 'semantic-ui-react'

import Entry from './Entry.jsx';
import CommentEntry from './CommentEntry.jsx';
import CommentData from './CommentData.jsx';

class UserProfile extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      entries: [],
      comments: [],
      redirect: false
    };
    this.handleClick = this.handleClick.bind(this);
  }

  componentDidMount() {
    this.props.authorize()
    this.props.getUserEntries(this.props.match.params.name)
    .then(data => {
        if(data.data.length === 0){
          this.setState({redirect:  true});
        }
        return data;
      }
    )
    .then(data => this.setState({entries: data.data}));

    this.props.getUserComments(this.props.match.params.name)
    .then(data => this.setState({comments: data.data}));
  }

  componentWillReceiveProps(nextprops){
    this.props.getUserEntries(nextprops.match.params.name)
    .then(data => {
        if(data.data.length === 0){
          this.setState({redirect:  true});
        }
        return data;
      }
    )
    .then(data => this.setState({entries: data.data}));

    this.props.getUserComments(nextprops.match.params.name)
    .then(data => this.setState({comments: data.data}));
  }

  handleClick() {
    // this.props.deleteEntry(this.props.data.id)
    // .then(() => console.log('handleClick ran'));
  }

  render (props) {

  const ProfileCard = () => (
  <Card>
    <Image src='../../img/default_yellow.jpg' />
    <Card.Content>
      <Card.Header>
        {this.props.match.params.name}
      </Card.Header>
      <Card.Meta>
        <span className='date'>
          Net Prestige: find a way to get total upvotes - downvotes
        </span>
      </Card.Meta>
      <Card.Description>
        {this.props.match.params.name} is a an accomplish grackle tracker and can usually be found in local H-E-B parking lots.
      </Card.Description>
    </Card.Content>
  </Card>
)

    const panes = [
      {menuItem: 'Entries', render: () => {
        return (
          <div>
            <div>
              <br />
              {this.state.entries.map((entry, index) => 
                <Entry 
                  key={index} 
                  data={entry} 
                  user={this.props.user} 
                  deleteEntry={this.props.deleteEntry}
                />)}
            </div>
          </div>
        )
      }},
      {menuItem: 'Comments', render: () => {
        return(
          <div>
            <div>
            <Comment.Group>
              {this.state.comments.map((comment, index) => {
                return ( <div key={index}>
                <CommentData 
                  comment = {comment}
                  getEntry={this.props.getEntry}
                />
                <CommentEntry
                  comment = {comment}
                  user = {this.props.user}
                  deleteComment = {this.props.deleteComment}
                  entry={comment.entryid}
                /> 
                <Divider></Divider>
                </div>
                )}
              )}
            </Comment.Group>
            </div>
          </div>
        )
      }}
    ]


    return (
      <Grid>
        <Grid.Column  width={12}>
          <Tab className='profilegrid' panes={panes} />
        </Grid.Column>
        <Grid.Column width={4}>
          <ProfileCard/>
        </Grid.Column>
      </Grid>
    )
  }
}

export default UserProfile;
