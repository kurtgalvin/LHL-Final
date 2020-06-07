import React, { useState, useEffect } from 'react';
import ArticleComponent from '../components/ArticleComponent'
const NewsAPI = require('newsapi');
let newsapi = new NewsAPI(process.env.REACT_APP_new_NEWSAPI);



function Tweetlist() {
  // const [items, setItems] = useState([]);
  const [articles, setArticles] = useState([]);
  useEffect(() => {
    newsapi.v2.topHeadlines({
      // sources: 'bbc-news',
      q: 'covid',
      category: 'health',
      language: 'en',
      country: 'ca',
      pageSize: '5'
    }).then((response : any) => {
      // response.articles.forEach((article) => { console.log(article.title); });
       setArticles(response.articles);
    })
  }, [])
  console.log(articles)
  return <div>
{articles.map((article, index) => (
        // <h1>{article['title']} {article['description']}</h1>
        <ArticleComponent key={index} data={article} />
    ))}
  </div>
};


interface IProps {

}


const NewsView: React.FC<IProps> = () => {
  return (
    <div>
      News
      <Tweetlist/>
    </div>
  )
}

export default NewsView