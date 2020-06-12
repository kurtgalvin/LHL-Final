import { userInfo } from "os";

const Twitter = require('twitter');

export default (app : any, io : any) => {
  let twitter = new Twitter({
    consumer_key: process.env.CONSUMER_KEY,
    consumer_secret: process.env.CONSUMER_SECRET,
    access_token_key: process.env.TWITTER_ACCESS_TOKEN_KEY,
    access_token_secret: process.env.TWITTER_ACCESS_TOKEN_SECRET
  });

  let socketConnection: any;
  const sendMessage = (msg : any) => {
    console.log("here", Array.isArray(msg), msg.text)
    socketConnection.emit("tweets", msg);
  }

  const twitterIDs = [
    // '146569971', 
    '724478906829426688'
  ]

  const stream = () => {
    twitterIDs.forEach(twitterID => {
      twitter.stream('statuses/filter', { follow: twitterID }, (stream : any) => {
        stream.on('data', (tweet : any) => {
          console.log("Stream")
          sendMessage(tweet);
        });
  
        stream.on('error', (error : any) => {
          console.log("stream ERROR");
        });
      });
    })
  }

  const fetchRecentTweets = () => {
    twitterIDs.forEach(twitterID => {
      twitter.get('statuses/user_timeline', { track: twitterID }, function(error: any, tweets: any, response: any) {
        if (!error) {
          sendMessage(tweets.slice(0, 4));
        } else {
          console.log("fetch ERROR")
        }
      });
    })
  }

  //Establishes socket connection.
  io.on("connection", (socket : any) => {
    socketConnection = socket;
    fetchRecentTweets()
    stream();
    socket.on("connection", () => console.log("Client connected"));
    socket.on("disconnect", () => console.log("Client disconnected"));
  });
};

