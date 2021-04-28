const path = require("path");
const cors = require("cors");
const express = require("express");
const mysql = require("mysql2");
require("dotenv").config();   // FOR ENVIRONMENT VARIABLE

const app = express();
app.use(cors());
app.use(express.json());

app.use(express.static(path.join(__dirname, "build")));

app.get("/*", (req, res) => {
  res.sendFile(path.join(__dirname, "build", "index.html"));
});

const db = mysql.createPool({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB,
});

const listener = app.listen(process.env.PORT || 3000, () => {
  console.log('Server listening to port ' + listener.address().port)
})

// READ
app.get("/wizards", (req, res) => {
  db.query("SELECT * FROM students", (err, result) => {
    if (err) {
      console.log(err);
    } else {
      res.send(result);
    }
  });
});

// CREATE
app.post("/wizards", (req, res) => {
  db.query("INSERT INTO students SET ?", req.body, (err, result) => {
    if (err) {
      console.log(err);
    } else {
      res.send("Review Added to Database");
    }
  });
});

// UPDATE
app.put("/wizards", (req, res) => {
  db.query(
    "UPDATE students SET name = ?, wand = ? WHERE id = ?",
    [req.body.name, req.body.wand, req.body.id],
    (err, result) => {
      if (err) {
        console.log(err);
      } else {
        res.send(result);
      }
    }
  );
});

// DELETE
app.delete("/wizards/:id", (req, res) => {
  db.query(
    "DELETE FROM students WHERE id = ?",
    req.params.id,
    (err, result) => {
      if (err) {
        console.log(err);
      } else {
        res.send(result);
      }
    }
  );
});
