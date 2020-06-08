import React, { useState, useEffect } from 'react';
import ArticleComponent from '../components/ArticleComponent'
import socketIOClient from "socket.io-client";
import TweetComponent from '../components/TweetComponent';
const NewsAPI = require('newsapi');
let newsapi = new NewsAPI(process.env.REACT_APP_new_NEWSAPI);



function Newslist() {
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
  return <div>
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
        let newList = [data].concat(items.slice(0, 15));
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
  return <div>
    {items.map((tweet: any, index: any) => (
      <TweetComponent key={index} data={tweet} />
    ))}
  </div>

};

interface IProps {

}


const NewsView: React.FC<IProps> = () => {
  return (
    <div>
      <Newslist/><Tweetlist/>
    </div>
    
  )
}

export default NewsView