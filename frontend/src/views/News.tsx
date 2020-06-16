import React, { useState, useEffect } from 'react';
import socketIOClient from "socket.io-client";
import axios from 'axios';

import ArticleComponent from '../components/ArticleComponent'
import TweetComponent from '../components/TweetComponent';
import useTweetState from '../hooks/useTweetState';

function Articleslist() {
  const [articles, setArticles] = useState([]);
  useEffect(() => {
    axios.get("/api/news")
      .then(res => {
        setArticles(res.data.articles)
      })
  }, [])
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

    return () => {
      socket.disconnect()
    }
  }, [])

  return <div className= "Tweets">
    {tweets.slice(0, 4).map((tweet: any, index: any) => (
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