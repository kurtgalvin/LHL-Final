const express = require('express');
const router  = express.Router();


module.exports = (db: any) => {

  router.get("/", (req: Request, res: Response) => {
  
  });

  // googlePlaceID VARCHAR(255),
  // type VARCHAR(255) NOT NULL,
  // lat DECIMAL NOT NULL,
  // lng DECIMAL NOT NULL

  router.post("/", (req: any, res: Response) => {
    
    const queryParams = [req.body.name, req.body.google_place_id, req.body.type, req.body.lat, req.body.lng];
    
    console.log('--------------------------------');
    console.log(queryParams);
    db.query("INSERT INTO stores (name, google_place_id, type, lat, lng) VALUES($1, $2, $3, $4, $5) RETURNING id ", queryParams)
    .then((data: any) => 
      console.log(data.rows[0].id)
      )


  })

  return router;
};