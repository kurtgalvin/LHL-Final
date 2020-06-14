import { userInfo } from "os";

const Twitter = require('twitter');

let twitter = new Twitter({
  consumer_key: process.env.CONSUMER_KEY,
  consumer_secret: process.env.CONSUMER_SECRET,
  access_token_key: process.env.TWITTER_ACCESS_TOKEN_KEY,
  access_token_secret: process.env.TWITTER_ACCESS_TOKEN_SECRET
});


export default (app : any, io : any) => {

  let socketConnection: any;
  const sendMessage = (msg : any) => {
    socketConnection.emit("tweets", msg);
  }

  const twitterIDs = [
    '724478906829426688',
    '146569971', 
    '141379865'
  ]

  const stream = () => {
    const params = { follow: twitterIDs.join(',') };
    twitter.stream('statuses/filter', params, (stream: any) => {
      stream.on('data', (tweet: any) => {
        if (!tweet.msg.include("RT")) {
          sendMessage(tweet);
        } else {
          console.log('RT >>>', tweet.msg)
        }
      });

      stream.on('error', (error: any) => {
        console.log(error, "^^^ stream ERROR");
      });
    })
  }

  const fetchRecentTweets = () => {
    twitterIDs.forEach(twitterID => {
      const params = { user_id: twitterID, include_rts: false }
      twitter.get('statuses/user_timeline', params, (error: any, tweets: any, response: any) => {
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

