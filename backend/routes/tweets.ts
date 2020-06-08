const Twitter = require('twitter');

export default (app : any, io : any) => {
  let twitter = new Twitter({
    consumer_key: process.env.CONSUMER_KEY,
    consumer_secret: process.env.CONSUMER_SECRET,
    access_token_key: process.env.TWITTER_ACCESS_TOKEN_KEY,
    access_token_secret: process.env.TWITTER_ACCESS_TOKEN_SECRET
  });

  let socketConnection : any;
  let twitterStream;

  let twitterID = '1169723316669566976'
  let twitterID2 = '724478906829426688'

  const stream = () => {
    console.log('Resuming for ' + twitterID);
    twitter.stream('statuses/filter', { follow: twitterID }, (stream : any) => {
      //{ track: Keywords }
      stream.on('data', (tweet : any) => {
        console.log(tweet)
        sendMessage(tweet);
      });

      stream.on('error', (error : any) => {
        console.log(error);
      });

      twitterStream = stream;
    });
  }

  const stream2 = () => {
    console.log('Resuming for ' + twitterID2);
    twitter.stream('statuses/filter', { follow: twitterID2 }, (stream : any) => {
      stream.on('data', (tweet : any) => {
        sendMessage(tweet);
      });

      stream.on('error', (error : any) => {
        console.log(error);
      });

      twitterStream = stream;
    });
  }

  //Establishes socket connection.
  io.on("connection", (socket : any) => {
    socketConnection = socket;
    stream();
    stream2();
    socket.on("connection", () => console.log("Client connected"));
    socket.on("disconnect", () => console.log("Client disconnected"));
  });

  const sendMessage = (msg : any) => {
    if (msg.text.includes('RT')) {
      return;
    }
    socketConnection.emit("tweets", msg);
  }
};

