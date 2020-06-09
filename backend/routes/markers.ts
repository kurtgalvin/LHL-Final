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
        output[record.google_place_id] = {...record, lat: Number(record.lat), lng: Number(record.lng)}; 
      }
      res.setHeader('Content-Type', 'application/json');
      res.end(JSON.stringify({data:output}));
    
    })                  
                  
                  
  });

  router.post("/stockUpdate/:markerId", (req: any, res: Response) => {
    const markerId = req.params.markerId;
    let commodityId;
    let stockLevel;
    let stockLevelId;
    switch(Object.keys(req.body)[0]) {
      case 'tp_stock': 
        commodityId = 1;
        stockLevel = req.body.tp_stock;
        break;
      case 'hs_stock':
        commodityId = 2;
        stockLevel = req.body.hs_stock;
        break;
      case 'mask_stock':
        commodityId = 3;
        stockLevel = req.body.mask_stock;
        break;
    }

    stockLevelId = stockLevel=== 'Unknown' ? 1 : stockLevel === 'Out of Stock' ? 2 : 3;
    const queryParams = [markerId, commodityId, stockLevelId]
    const query = "INSERT INTO commodity_updates (store, commodity, stock_level) VALUES($1, $2, $3) "
    db.query(query, queryParams)
    .then((data: any) => {});
  });

 
  router.post("/", (req: any, res: any) => {
    
    const queryParams = [req.body.name, req.body.google_place_id, req.body.type, req.body.lat, req.body.lng];
  
    db.query("INSERT INTO stores (name, google_place_id, type, lat, lng) VALUES($1, $2, $3, $4, $5) RETURNING id ", queryParams)
    .then((data: any) => {
      const id = data.rows[0].id;
      console.log(id);
      db.query("INSERT INTO commodity_updates (store, commodity, stock_level) VALUES($1, 1, 1), ($1,2,1), ($1, 3, 1)", [id])
      .then( res.json({id}));
    }
      )


  })

  return router;
};