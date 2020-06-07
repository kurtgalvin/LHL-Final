// load .env data into process.env
require('dotenv').config();

// other dependencies
const fs = require('fs');
const chalk = require('chalk');
const Client = require('pg-native');


// PG connection setup
const connectionString = process.env.DATABASE_URL ||
  `postgresql://${process.env.DB_USER}:${process.env.DB_PASS}@${process.env.DB_HOST}:${process.env.DB_PORT}/${process.env.DB_NAME}`;
const client = new Client();

// Loads the schema files from db/schema
const runSchemaFiles = function() {
  console.log(chalk.cyan(`-> Loading Schema Files ...`));
  const schemaFilenames = fs.readdirSync('./db/schema');

  for (const fn of schemaFilenames) {
    const sql = fs.readFileSync(`./db/schema/${fn}`, 'utf8');
    console.log(`\t-> Running ${chalk.green(fn)}`);
    client.querySync(sql);
  }
};

const runSeedFiles = function() {
  console.log(chalk.cyan(`-> Loading Seeds ...`));
  const schemaFilenames = fs.readdirSync('./db/seeds');

  for (const fn of schemaFilenames) {
    const sql = fs.readFileSync(`./db/seeds/${fn}`, 'utf8');
    console.log(`\t-> Running ${chalk.green(fn)}`);
    client.querySync(sql);
  }
};

const populateMarkerData = function () {
  console.log(chalk.cyan(`-> Loading Marker data ...`));
  const {markers} = require('../db/markerdata.ts');
  const query1 = "INSERT INTO stores (name, google_place_id, type, lat, lng) VALUES($1, $2, $3, $4, $5) RETURNING id ";
  const query2 = "INSERT INTO commodity_updates (store, commodity, stock_level) VALUES ($1, $2, $3)";
  for(const key in markers) {
    const queryParams = [markers[key].name, markers[key].google_id, markers[key].type, markers[key].lat, markers[key].lng ];
    const resp = client.querySync(query1, queryParams);
 
    // +1 because data prep did 0-2, actual ids 1-3
    client.querySync(query2, [resp[0].id, 1, markers[key].tp_stock + 1]);
    client.querySync(query2, [resp[0].id, 2, markers[key].hs_stock + 1]);
    client.querySync(query2, [resp[0].id, 3, markers[key].mask_stock + 1]);
  }


}



try {
  console.log(`-> Connecting to PG using ${connectionString} ...`);
  client.connectSync(connectionString);
  runSchemaFiles();
  runSeedFiles();
  populateMarkerData();
  client.end();
} catch (err) {
  console.error(chalk.red(`Failed due to error: ${err}`));
  client.end();
}


