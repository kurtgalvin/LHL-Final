import express from "express"
const router = express.Router()
const fetch = require('node-fetch');

const recentNewsCache: any = {
  lastUpdate: null,
  articles: []
}
const delay = 15 * 60 * 1000

module.exports = () => {
  router.get("/", (req, res) => {
    if (!recentNewsCache.lastUpdate || recentNewsCache.lastUpdate < Date.now() - delay) {
      fetch('https://api.smartable.ai/coronavirus/news/CA', {
        headers: {
          "Subscription-Key": (process.env.SUBSCRIPTION_KEY as string)
        }
      })
        .then(function (response : any) {
          return response.json();
        })
        .then(function (data: any) {
          if (data.news){
            recentNewsCache.lastUpdate = Date.now()
            recentNewsCache.articles = data.news.filter((a : any) => a.images !== null)
            res.setHeader("Content-Type", "application/json")
            res.end(JSON.stringify({articles : data.news.filter((a : any) => a.images !== null)}));
          }
        })
    } else {
      res.setHeader("Content-Type", "application/json")
      res.end(JSON.stringify({articles : recentNewsCache.articles}))
    }
  })
  return router;
}