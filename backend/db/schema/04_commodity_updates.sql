DROP TABLE IF EXISTS commodity_updates CASCADE;
CREATE TABLE commodity_updates (
  id SERIAL PRIMARY KEY NOT NULL,
  store INTEGER REFERENCES stores(id) ON DELETE CASCADE,
  commodity INTEGER REFERENCES commodities(id) ON DELETE CASCADE,
  stock_level INTEGER REFERENCES stock_levels(id) ON DELETE CASCADE,
  update_time TIMESTAMP DEFAULT NOW()


);