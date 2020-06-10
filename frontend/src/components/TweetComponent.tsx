import React from 'react';
import { Paper } from '@material-ui/core'

class TweetComponent extends React.Component <{data: any}> {
  render() {
    let data = this.props.data;

    return (
      <Paper className="tweet" elevation={7}>
            <img className="img" src={data.user.profile_image_url} alt={data.user.name}/>
            <div className="text">{data.text}</div>
          <div className="date">
            {new Date(data.created_at).toLocaleTimeString()}
          </div>
            <a className="username" href={`https://twitter.com/${data.user.screen_name}`} target="_blank">{`@${data.user.screen_name}`}</a>
      </Paper>
    );
  }
}

export default TweetComponent;