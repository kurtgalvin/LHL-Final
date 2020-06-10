import React, { useState, useEffect } from 'react';
import ArticleComponent from '../components/ArticleComponent'
import socketIOClient from "socket.io-client";
import TweetComponent from '../components/TweetComponent';
import { Paper } from '@material-ui/core'
const NewsAPI = require('newsapi');
let newsapi = new NewsAPI(process.env.REACT_APP_new_NEWSAPI);



function Articleslist() {
  const [articles, setArticles] = useState([]);
  // try {
  useEffect(() => {
    newsapi.v2.topHeadlines({
      // sources: 'vancouver sun',
      q: 'covid-19',
      category: 'health',
      language: 'en',
      country: 'ca',
      pageSize: '6'
    }).then((response : any) => {
       setArticles(response.articles);
    }).catch((err: Error) => {
      console.log(err)
    })

  }, []);

  console.log(articles)
  return <div className="Articles">
    {articles.map((article, index) => (
      <ArticleComponent key={index} data={article} />
    ))}
  </div>

};

function Tweetlist() {
  const [items, setItems] = useState<any>([]);
  useEffect(() => {
    const socket = socketIOClient('/');

    socket.on('connect', () => {
      console.log("Socket Connected");
      socket.on("tweets", (data : any) => {
        console.info(data);
        // let newList = [data].concat(items.slice(0, 15));
        setItems((oldState: any) => {
          // {items: newList});
          return [...oldState, data].slice(0, 15)
        });
      });
    });
    socket.on('disconnect', () => {
      socket.off("tweets")
      socket.removeAllListeners();
      console.log("Socket Disconnected");
    });
  }, [])
  console.log(items)
  return <Paper className= "Tweets" elevation={3}>
    {items.map((tweet: any, index: any) => (
      <TweetComponent key={index} data={tweet} />
    ))}
  </Paper>

};

interface IProps {

}


const NewsView: React.FC<IProps> = () => {
  return (
    <div className="News">
      <Articleslist/>
      <Tweetlist/>
    </div>
  )
}

export default NewsView