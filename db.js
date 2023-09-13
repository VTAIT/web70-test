const { MongoClient } = require("mongodb");
const { orderData, inventoryData, userData } = require("./constans/data");

const db = {};

const connectToDb = () => {
  const client = new MongoClient("mongodb://localhost:27017");
  client.connect(() => {
    const database = client.db("test");
    db.inventories = database.collection("inventories");
    db.orders = database.collection("orders");
    db.users = database.collection("users");

    // importData
    db.inventories.insertMany(inventoryData, function(err, res) {
      if (err) throw err;
      console.log("Number of documents inserted: " + res.insertedCount);
      db.close();
    });

    db.orders.insertMany(orderData, function(err, res) {
      if (err) throw err;
      console.log("Number of documents inserted: " + res.insertedCount);
      db.close();
    });

    db.users.insertMany(userData, function(err, res) {
      if (err) throw err;
      console.log("Number of documents inserted: " + res.insertedCount);
      db.close();
    });
  });
};

module.exports = { connectToDb, db };
