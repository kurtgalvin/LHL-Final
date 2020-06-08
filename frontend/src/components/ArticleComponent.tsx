import React from 'react';
import '../styles/news.scss'

class ArticleComponent extends React.Component <{data: object}> {
  render() {
    let data : any = this.props.data;
      return (
       <div className ="container">
        <div className="Article">
          <a href={data['url']}>
            <img src={data['urlToImage']} alt={data['author']} width="300" />
          </a>
          <div className="description">
            <p className="desc">{data['title']}</p>
            <p className="date">{data['publishedAt']}</p>
          </div>
        </div>
      </div>
      )
  }
};

export default ArticleComponent;