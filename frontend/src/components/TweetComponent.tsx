import React from 'react';

class TweetComponent extends React.Component <{data: any}> {
  render() {
    let data = this.props.data;

    return (
      <div className="tweet">
        <div className="row">
          <div className="col s2">
            <img src={data.user.profile_image_url} alt={data.user.name} className="circle responsive-img" />
          </div>
          <div className="col s10">
            <span className="text">{data.text}</span>
          </div>
        </div>
          <div className="date">
            {new Date(data.created_at).toLocaleTimeString()}
          </div>
          <div className="user">
            <a href={`https://twitter.com/${data.user.screen_name}`} target="_blank">{`@${data.user.screen_name}`}</a>
          </div>
      </div>
    );
  }
}

export default TweetComponent;