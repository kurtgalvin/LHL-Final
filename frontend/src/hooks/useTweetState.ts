import { useState } from 'react'

export default (initTweets: any[]): [any[], (tweet: any | any[]) => void] => {
  const [tweets, setTweets] = useState(initTweets);

  const addTweet = (tweet: any | any[]) => {
    console.log("NEW TWEET")
    setTweets(oldState => {
      const filteredResult: any = {};
      const result = Array.isArray(tweet) ? [...tweet, ...oldState] : [tweet, ...oldState];
      
      result.forEach(t => filteredResult[t.id] = t)
      return Object.keys(filteredResult).sort((aID, bID) => {
        if (new Date(filteredResult[aID].created_at) > new Date(filteredResult[bID].created_at)) {
          return -1
        } return 1
      }).map(id => filteredResult[id])
    });
  }

  return [tweets, addTweet]
}