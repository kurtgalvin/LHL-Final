import React from 'react';
import { Paper } from '@material-ui/core'

class TweetComponent extends React.Component <{data: any}> {
  render() {
    let data = this.props.data;

    return (
      <Paper className="tweet" elevation={7}>
            <img className="img" src={data.user.profile_image_url} alt={data.user.name}/>
            <img className="logo" src='https://github.com/kurtgalvin/LHL-Final/blob/Stretch/Infograph/frontend/docs/twitter.png?raw=true' width= '30px' alt='logo'/>
            <div className="text">{data.text}</div>
          <div className="date">
            {new Date(data.created_at).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
          </div>
            <a className="username" href={`https://twitter.com/${data.user.screen_name}`} target="_blank" rel="noopener noreferrer">
              {`@${data.user.screen_name}`}
            </a>
      </Paper>
    );
  }
}

export default TweetComponent;