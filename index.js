const express = require("express");
var jwt = require('jsonwebtoken');
const { connectToDb, db } = require("./db");

const app = express();
app.use(express.json());

const checkToken = (req, res, next) => {
  const token = req.headers["token"];
  if (!token) {
    return res.status(400).json({
      message: "Token is not provided",
    });
  }
  try {
    const decoded = jwt.verify(token, "VuTuanAn");
    req.users = decoded;
    next();
  } catch (error) {
    if (error.message === "jwt expired") {
      return res.status(403).json({
        message: "Token is expired",
      });
    }

    return res.status(401).json({
      message: "Token is not valid",
    });
  }
}

app.get("/api/v1/getAllProduct:quantity", checkToken, (req, res) => {
  let filter = {}
  const quantity = req.query["quantity"];
  if (quantity < 100) {
    filter["instock"] = { $lte: quantity };
  }
  db.inventories.find(filter).toArray(function (err, result) {
    if (err) {
      res.send({
        "message": "Unsuccessfuly"
      });
    };

    res.send({
      "products": result
    });
    db.close();
  });
});

app.post("/api/v1/login", (req, res) => {
  const { userName, password } = req.body;

  if (!userName || !password) {
    res.send({
      "message": "Missing required fields"
    });
  }

  let filter = { userName, password };

  db.users.find(filter).toArray(function (err, result) {
    if (err) {
      res.send({
        "message": "Unsuccessfuly"
      });
    };

    if (!result) {
      res.send({
        "message": "Invalid credentials!"
      });
    }

    if (password !== result.password) {
      res.send({
        "message": "Username or password is not correct!"
      });
    }

    const jwtPayload = {
      "username": result.username
    };

    const token = jwt.sign(jwtPayload, "VuTuanAn", { 'expiresIn': 60 * 60, "algorithm": "HS256" });

    res.send({
      "token": token
    });
    db.close();
  });
});


app.post("/api/v1/order", checkToken, (req, res) => {
  const { _id, item, price, quantity } = req.body;

  if (!_id || !item || !price || !quantity) {
    res.send({
      "message": "Missing required fields"
    });
  }

  const myobj = { _id, item, price, quantity };

  db.orders.insertOne(myobj, function (err, res) {
    if (err) {
      res.send({
        "message": "Unsuccessfuly"
      });
    };

    res.send({
      "order": myobj
    });
    db.close();
  });



});

app.listen(3000, () => {
  console.log("App is running at 3000");
  connectToDb();
});
