const {Client} = require('cassandra-driver');

let client;

const  db = async () => {
    client = new Client({
      cloud: { secureConnectBundle: './secure-connect-database_name.zip' },
      credentials: { username: 'clientId', password: 'clientSecret' }
    }).connect();
  
    await client.connect();
    // return client
  
    // // Execute a query
    // const rs = await client.execute('SELECT * FROM system.local');
    // console.log(`Hello from cluster: ${rs.first()['cluster_name']}`);
  
    // await client.shutdown();
  }
  
//   // Run the async function
//   run();

module.exports = db;