const serverless = require("serverless-http");
const express = require("express");
var fs = require("fs");

const app = express();

const COWS_LENGTH = 428;

app.get("/", function(req, res) {
  res.json({
    result: "Welcome to Ascii Cows API. Go to /random for a random cow"
  });
});

app.get("/cow", function(req, res) {
  res.setHeader("Content-type", "text/plain");
  res.charset = "UTF-8";
  content = fs
    .readFileSync("./data/cows.txt", "utf8")
    .replace(/\n$/, "")
    .split("\n\n\n");

  var randomCowIndex = Math.floor(Math.random() * (COWS_LENGTH - 1)) + 0;

  res.send(content[[randomCowIndex]]);
});

//  ---------------------- SUPER HEROES ----------------------------- //
app.get("/superheroes", function(req, res) {
  superheroes = JSON.parse(fs.readFileSync("./data/superheroes.json", "utf8"));

  res.json({
    result: superheroes
  });
});

app.get("/superheroes/random", function(req, res) {
  superheroes = JSON.parse(fs.readFileSync("./data/superheroes.json", "utf8"));
  var randomIndex = Math.floor(Math.random() * (superheroes.length - 1)) + 0;
  res.json({
    result: superheroes[randomIndex]
  });
});

//  ---------------------- SUPER VILLIANS ----------------------------- //
app.get("/supervillians", function(req, res) {
  supervillians = JSON.parse(
    fs.readFileSync("./data/supervillians.json", "utf8")
  );

  res.json({
    result: supervillians
  });
});

app.get("/supervillians/random", function(req, res) {
  supervillians = JSON.parse(
    fs.readFileSync("./data/supervillians.json", "utf8")
  );
  var randomIndex = Math.floor(Math.random() * (supervillians.length - 1)) + 0;
  res.json({
    result: supervillians[randomIndex]
  });
});

//  ---------------------- SUPERB LIKE WORDS ----------------------------- //
app.get("/superb-like-words", function(req, res) {
  superbLikeWords = JSON.parse(
    fs.readFileSync("./data/superb-like-words.json", "utf8")
  );

  res.json({
    result: superbLikeWords
  });
});

module.exports.handler = serverless(app);
