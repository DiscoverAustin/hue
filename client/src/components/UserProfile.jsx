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
      redirect: false,
      numComments: [],
      bio: ''
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
    .then(data => this.setState({entries: data.data}))
    .then(() => {
      for (var i = 0; i < this.state.entries.length; i++) {
        this.props.getComments(this.state.entries[i].id)
        .then(res => {
          const arr = this.state.numComments.slice();
          arr.push(res.data.length);
          this.setState({numComments: arr})
        }).then(() => this.numComments())
      }
    })

    this.props.getUserComments(this.props.match.params.name)
    .then(data => this.setState({comments: data.data}));
    this.createBio();
  }

  numComments(num) {
    var arr = this.state.entries.slice();
    for (var i = arr.length - 1; i >= 0; i--) {
      arr[i].numComments = this.state.numComments[i];
    }
    this.setState({entries: arr});
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

  createBio() {
    const bios = [
      ' is an accomplished grackle tracker and can usually be found in local H-E-B parking lots.',
      ' practices getting photos to meet the rule of thirds for optimum beauty, but usually fails.',
      ' has lost 254 chess matches against Deep Blue.  Microdosing did not help',
      ' has been banned from 3 casinos for card counting and now uses those skills counting fish off the coast of Alaska',
      ' spends more time than is healthy watching you tube videos about cybersecurity',
      ' was unable to understand language until the age of 15 but has since developed a translator plugin for Google to translate Shakespeare into actual English.',
      ' volunteers to teach at risk youth how to locate radiation shelters that are off the grid.',
      ' has been known to associate with the former international criminal mastermind Henrietta.',
    ];

    let bioIndex = (Math.floor(Math.random() * 8));

    this.setState({
      bio: bios[bioIndex]
    });
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
        {this.props.match.params.name}{this.state.bio} 
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
