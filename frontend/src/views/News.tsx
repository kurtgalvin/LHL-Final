import React, { useState, useEffect } from 'react';
import ArticleComponent from '../components/ArticleComponent'
import socketIOClient from "socket.io-client";
const NewsAPI = require('newsapi');
let newsapi = new NewsAPI(process.env.REACT_APP_new_NEWSAPI);



function Tweetlist() {
  // const [items, setItems] = useState([]);
  const [articles, setArticles] = useState([]);
  // try {
  useEffect(() => {
    newsapi.v2.topHeadlines({
      // sources: 'bbc-news',
      q: 'covid',
      category: 'health',
      language: 'en',
      country: 'ca',
      pageSize: '5'
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

function Tweetlist2() {
  const [items, setItems] = useState<any>([]);
  useEffect(() => {
    const socket = socketIOClient('/');

    socket.on('connect', () => {
      console.log("Socket Connected");
      socket.on("tweets", (data : any) => {
        console.info(data);
        let newList = [data].concat(items.slice(0, 15));
        setItems ({items: newList});
      });
    });
    socket.on('disconnect', () => {
      socket.off("tweets")
      socket.removeAllListeners();
      console.log("Socket Disconnected");
    });
  }, [])
  console.log(items)
  return <div></div>

};

interface IProps {

}


const NewsView: React.FC<IProps> = () => {
  return (
    <div>
      News
      <Tweetlist/>
      <Tweetlist2/>
    </div>
  )
}

export default NewsView