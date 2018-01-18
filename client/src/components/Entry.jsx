import React from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import { Feed, Icon, Divider } from 'semantic-ui-react'
import ta from 'time-ago';

class Entry extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      thumbsUp: this.props.data.up_votes || 0,
      thumbsDown: this.props.data.down_votes || 0,
      prestige: 0,
      comments: []
    };
    this.handleClick = this.handleClick.bind(this);
  }

  componentDidMount() {
    this.props.getComments(this.props.data.id)
    .then(res => {
      this.setState({
        comments: res.data
      })
    })
  }

  // Deletes an entry
  handleClick() {
    this.props.deleteEntry(this.props.data.id)
    .then(() => {
      console.log('deleted entry');
      this.props.getEntries();
    });
  }

  upVote() {
    axios.post(`/upVoteEntry?user=${this.props.user}&&entry=${this.props.data.id}`)
    .then(() => {
      this.getEntryVotes();
    })
  }

  downVote() {
    axios.post(`/downVoteEntry?user=${this.props.user}&&entry=${this.props.data.id}`)
    .then(() => {
      this.getEntryVotes();
    })
  }

  // Updates state
  getEntryVotes() {
    axios.get(`/getEntryVotes?id=${this.props.data.id}`)
    .then((obj) => {
      const prest = obj.data[0].up_votes + obj.data[0].down_votes
      this.setState({
        thumbsUp: obj.data[0].up_votes,
        thumbsDown: obj.data[0].down_votes,
        prestige: prest
      })
    })
  }

  componentWillReceiveProps(nextprops){
    this.getEntryVotes();
  }

  // Renders different versions of the componet depending if a user is logged in
  render () {
    if(this.props.user === this.props.data.name){
      return (
        <div>
        <Feed>
          <Feed.Event>
            <Feed.Content>
              <Feed.Date>{ta.ago(this.props.data.created_at)}</Feed.Date>
              <Feed.Summary>
                <a href={this.props.data.url}>{this.props.data.title}</a>
              </Feed.Summary>
              <Feed.Extra text>
                by <Link to={`/user/${this.props.data.name}`}>{this.props.data.name}</Link>
              </Feed.Extra>
              <Feed.Meta>
                <Feed.Like>
                  <Icon name='thumbs up' onClick={this.upVote.bind(this)}/>
                </Feed.Like>
                {this.state.thumbsUp}
                <Feed.Like>
                  <Icon name='thumbs down' onClick={this.downVote.bind(this)}/>
                </Feed.Like>
                {this.state.thumbsDown}
                <Link to={`/thread/${this.props.data.id}`}><Icon name='comments'></Icon></Link>
                {this.state.comments.length}
                <a onClick={this.handleClick}>remove</a>
              </Feed.Meta>
            </Feed.Content>
          </Feed.Event>
        </Feed>
        <Divider></Divider>
        </div>
      );
    }
    return (
      <div>
      <Feed>
        <Feed.Event>
          <Feed.Content>
            <Feed.Date>{ta.ago(this.props.data.created_at)}</Feed.Date>
            <Feed.Summary>
              <a href={this.props.data.url}>{this.props.data.title}</a>
            </Feed.Summary>
            <Feed.Extra text>
              by <Link to={`/user/${this.props.data.name}`}>{this.props.data.name}</Link>
            </Feed.Extra>
              <Feed.Meta>
                <Feed.Like>
                  <Icon name='thumbs up' onClick={this.upVote.bind(this)}/>
                </Feed.Like>
                {this.state.thumbsUp}
                <Feed.Like>
                  <Icon name='thumbs down' onClick={this.downVote.bind(this)}/>
                </Feed.Like>
                {this.state.thumbsDown}
                <Link to={`/thread/${this.props.data.id}`}><Icon name='comments'></Icon></Link>
                {this.state.comments.length}
              </Feed.Meta>
          </Feed.Content>
        </Feed.Event>
      </Feed>
      <Divider></Divider>
      </div>
    );
  }
}

export default Entry;
