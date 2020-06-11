import React from 'react';
import { Paper } from '@material-ui/core'
import '../styles/news.scss'


class ArticleComponent extends React.Component <{data: object}> {
  render() {
    let data : any = this.props.data;
    return (
      <Paper className="Article" elevation={3}>
        <a href={data['url']} target="_blank">
          <img src={data['urlToImage']} alt={data['author']} width="300" />
        </a>
        <div className="overlay">
    <div className="text">Read More</div>
        </div>
        <p className="title">{data['title']}</p>
        <p className="date">{new Date(data.publishedAt).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}</p>
      </Paper>
    )
  }
};

export default ArticleComponent;