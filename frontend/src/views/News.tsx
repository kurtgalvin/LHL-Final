import React, { useState, useEffect } from 'react';
import ArticleComponent from '../components/ArticleComponent'
import socketIOClient from "socket.io-client";
import TweetComponent from '../components/TweetComponent';
import useTweetState from '../hooks/useTweetState';
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

  return <div className="Articles">
    {articles.map((article, index) => (
      <ArticleComponent key={index} data={article} />
    ))}
  </div>
};

function Tweetlist() {
  const [tweets, addTweets] = useTweetState([]);

  useEffect(() => {
    const socket = socketIOClient('/');

    socket.on('connect', () => {
      socket.on('tweets', addTweets)
    });

    socket.on('disconnect', () => {
      socket.off("tweets")
      socket.removeAllListeners();
      console.log("Socket Disconnected");
    });
  }, [])


  return <div className= "Tweets">
    {tweets.map((tweet: any, index: any) => (
      <TweetComponent key={tweet.id} data={tweet} />
    ))}
  </div>

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