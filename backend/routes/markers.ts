const express = require('express');
const router  = express.Router();


module.exports = (db: any) => {

  router.get("/", (req: Request, res: any) => {
    const query = `SELECT * , (SELECT title from stock_levels join commodity_updates  on stock_levels.id = stock_level 
                    WHERE store = stores.id and commodity=1 ORDER by update_time DESC LIMIT 1) as tp_stock,
                    (SELECT title from stock_levels join commodity_updates  on stock_levels.id = stock_level 
                    WHERE store = stores.id and commodity=2 ORDER by update_time DESC LIMIT 1) as hs_stock,
                    (SELECT title from stock_levels join commodity_updates  on stock_levels.id = stock_level 
                    WHERE store = stores.id and commodity=3 ORDER by update_time DESC LIMIT 1) as mask_stock
                    FROM stores;`

    db.query(query)
    .then((data: any) => {
      const output: {[index: string]: string | number} = {};
      for(const record of data.rows) {
        output[record.id] = {...record, lat: Number(record.lat), lng: Number(record.lng)}; 
      }
      console.log(output);
      res.setHeader('Content-Type', 'application/json');
      res.end(JSON.stringify({data:output}));
    
    })                  
                  
                  
  });

 
// UNTESTED & Unfinished  -- MAY NOT ACTUALLY NEED
  router.post("/", (req: any, res: Response) => {
    
    const queryParams = [req.body.name, req.body.google_place_id, req.body.type, req.body.lat, req.body.lng];
  
    db.query("INSERT INTO stores (name, google_place_id, type, lat, lng) VALUES($1, $2, $3, $4, $5) RETURNING id ", queryParams)
    .then((data: any) => 
      console.log(data.rows[0].id)
      )


  })

  return router;
};