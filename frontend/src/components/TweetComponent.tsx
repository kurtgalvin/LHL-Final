import React from 'react';

class TweetComponent extends React.Component <{data: any}> {
  render() {
    let data = this.props.data;

    return (
      <div className='container'>
      <div className="tweet">
        <div className="row">
          <div className="image">
            <img src={data.user.profile_image_url} alt={data.user.name} className="img" />
          </div>
          <div className="msg">
            <span className="text">{data.text}</span>
          </div>
        </div>
          <div className="date">
            {new Date(data.created_at).toLocaleTimeString()}
          </div>
          <div className="username">
            <a href={`https://twitter.com/${data.user.screen_name}`} target="_blank">{`@${data.user.screen_name}`}</a>
          </div>
      </div>
      </div>
    );
  }
}

export default TweetComponent;