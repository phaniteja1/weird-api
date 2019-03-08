const serverless = require("serverless-http");
const express = require("express");
var fs = require("fs");
const axios = require("axios");
const cheerio = require("cheerio");

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

//  ---------------------- RANDOM ASCII FACE ----------------------------- //
app.get("/ascii-faces", function(req, res) {
  asciiFaces = JSON.parse(fs.readFileSync("./data/ascii-faces.json", "utf8"));

  res.json({
    result: asciiFaces
  });
});

app.get("/ascii-faces/:id", function(req, res) {
  asciiFaces = JSON.parse(fs.readFileSync("./data/ascii-faces.json", "utf8"));

  res.json({
    result: asciiFaces[req.params.id]
  });
});

app.get("/ascii-faces/random", function(req, res) {
  asciiFaces = JSON.parse(fs.readFileSync("./data/ascii-faces.json", "utf8"));
  var randomIndex = Math.floor(Math.random() * (asciiFaces.length - 1)) + 0;
  res.json({
    result: asciiFaces[randomIndex]
  });
});

//  ---------------------- CODING LOVE GIF ----------------------------- //
function getRandomInt(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

async function get_coding_love_random_gif() {
  // rnadomize page number
  let random_page_number = getRandomInt(1, 10);
  let page_url = `https://thecodinglove.com/page/${random_page_number}`;
  // send a request to the coding love page
  const page = await axios(page_url);
  // load the page to cheerio to be able to parse it
  const $ = cheerio.load(page.data);
  // randomize post number
  let random_post_number = getRandomInt(1, 4);
  let title_path = `body > main > div > div > div:nth-child(${2 *
    random_post_number}) > h1 > a`;
  let gif_title = $(title_path).text();
  let gif_link = $(
    `body > main > div > div > div:nth-child(${2 *
      random_post_number}) > div.blog-post-content > p > video > object`
  ).attr("data");
  // return the title and link to the gif as a json
  return {
    title: gif_title,
    link: gif_link
  };
}

app.get("/coding-love-gif", async (req, res) => {
  const json = await get_coding_love_random_gif();

  res.set("Content-Type", "application/json");
  res.status(200).send(json);
});

//  ---------------------- ROBOT RANDOM IMAGE ----------------------------- //
app.get("/robot", function(req, res) {
  axios
    .get("https://robohash.org/hello-world.png", {
      responseType: "arraybuffer"
    })
    .then(function(response) {
      res.writeHead(200, { "Content-type": "image/png" });
      res.end(response.data, "Base64");
    });
});

module.exports.handler = serverless(app);
