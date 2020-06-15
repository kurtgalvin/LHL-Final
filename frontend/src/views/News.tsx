import React, { useState, useEffect } from 'react';
import ArticleComponent from '../components/ArticleComponent'
import socketIOClient from "socket.io-client";
import TweetComponent from '../components/TweetComponent';
import useTweetState from '../hooks/useTweetState';

function Articleslist() {
  const [articles, setArticles] = useState([]);
  useEffect(() => {
    fetch('https://api.smartable.ai/coronavirus/news/CA', {
      headers: {
        "Subscription-Key": (process.env.SUBSCRIPTION_KEY as string)
      }
    })
      .then(function (response) {
        return response.json();
      })
      .then(function (data: any) {
        setArticles(data.news);
        console.log(data.news);
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