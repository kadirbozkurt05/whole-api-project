const express = require("express");
const fs = require("fs");
const app = express();
const bodyParser = require("body-parser");

const PORT = process.env.PORT || 3000;
const HOST = process.env.HOST || "localhost";

app.get("/rooms", (req, res) => {
  fs.readFile("res/rooms.json", (err, data) => {
    if (err) {
      res.statusCode(404);
      res.contentType("text/html");
      res.write("<h1>NOT FOUND</h1>");
    } else {
      res.contentType = "application/json";
      res.json(data);
      res.end();
    }
  });
});

app.get("/residents", (req, res) => {
  fs.readFile("res/residents.json", (err, data) => {
    if (err) {
      res.statusCode(404);
      res.contentType("text/html");
      res.write("<h1>NOT FOUND</h1>");
    } else {
      res.contentType = "application/json";
      res.json(JSON.parse(data));
      res.end();
    }
  });
});

app.get("/room/:id", (req, res) => {
  fs.readFile("res/residents.json", (err, data) => {
    if (err) {
      res.statusCode(404);
      res.contentType("text/html");
      res.write("<h1>NOT FOUND</h1>");
    } else {
      const residentsData = JSON.parse(data);
      const roomNumber = parseInt(req.params.id);
      const room = residentsData.residents.filter(
        (resident) => resident.roomNumber == roomNumber
      );
      res.contentType = "application/json";
      res.json(room);
      res.end();
    }
  });
});

app.get("/resident/:id", (req, res) => {
  fs.readFile("res/residents.json", (err, data) => {
    if (err) {
      res.statusCode(404);
      res.contentType("text/html");
      res.write("<h1>NOT FOUND</h1>");
    } else {
      const residentsData = JSON.parse(data);
      const id = parseInt(req.params.id);
      const resident = residentsData.residents.find(
        (resident) => resident.id === id
      );
      res.contentType = "application/json";
      res.json(resident);
      res.end();
    }
  });
});

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.post("/residents", (req, res) => {
  fs.readFile("res/residents.json", (err, data) => {
    if (err) {
      res.statusCode(404);
      res.contentType("text/html");
      res.write("<h1>NOT FOUND</h1>");
    } else {
      const residentsData = JSON.parse(data);
      const residents = residentsData.residents;
      console.log(residents);
      const resId = residents.length + 1;

      const requestBody = req.body;
      requestBody.id = resId;

      residents.push(requestBody);

      const result = { residents };
      fs.writeFile("res/residents.json", JSON.stringify(result), (err) => {
        if (err) {
          res.statusCode(404);
          res.contentType("text/html");
          res.write("<h1>NOT FOUND</h1>");
        } else {
          res.json(residents);
          res.end();
        }
      });
    }
  });
});
app.listen(PORT,()=>{
    console.log(`App is running on server ${HOST}`);
});
