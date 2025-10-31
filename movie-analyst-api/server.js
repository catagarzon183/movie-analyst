const express = require("express");
const app = express();
const publicIp = require("public-ip");
const mysql = require("mysql2");
const dotenv = require("dotenv");

// Carga del archivo de entorno dinámico (.env.dev, .env.test, etc.)
const envFile = process.env.NODE_ENV ? `.env.${process.env.NODE_ENV}` : '.env';
dotenv.config({ path: __dirname + '/.env.dev' });
console.log(`🌱 Loaded environment: ${envFile}`);

// Conexión a MySQL
const connection = mysql.createConnection({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASS,
  database: process.env.DB_NAME
});

connection.connect((err) => {
  if (err) {
    console.error("❌ Error connecting to database:", err.message);
  } else {
    console.log("✅ Connected to MySQL database successfully!");
  }
});

// Healthcheck
app.get("/", (req, res) => {
  res.status(200).json({
    uptime: process.uptime(),
    message: "OK",
    timestamp: Date.now()
  });
});

// Movies endpoint
function getMovies(callback) {
  connection.query("SELECT * FROM movie_db.moviereview", (err, rows) => {
    callback(err, rows);
  });
}

app.get("/movies", (req, res) => {
  getMovies((err, movies) => {
    if (err) {
      res.status(500).json({ message: err });
    } else if (movies) {
      res.status(200).json(movies);
    } else {
      res.status(404).json({ message: "Movies not found" });
    }
  });
});

// Reviewers endpoint
function getReviewers(callback) {
  connection.query("SELECT * FROM movie_db.reviewer", (err, rows) => {
    callback(err, rows);
  });
}

app.get("/authors", (req, res) => {
  getReviewers((err, authors) => {
    if (err) {
      res.status(500).json({ message: err });
    } else if (authors) {
      res.status(200).json(authors);
    } else {
      res.status(404).json({ message: "Authors not found" });
    }
  });
});

// Publications endpoint
function getPublications(callback) {
  connection.query("SELECT * FROM movie_db.publication", (err, rows) => {
    callback(err, rows);
  });
}

app.get("/publications", (req, res) => {
  getPublications((err, publications) => {
    if (err) {
      res.status(500).json({ message: err });
    } else if (publications) {
      res.status(200).json(publications);
    } else {
      res.status(404).json({ message: "Publications not found" });
    }
  });
});

// Server IP endpoint
app.get("/server_ip", async (req, res) => {
  try {
    const ip = await publicIp.v4();
    res.status(200).json({ message: ip });
  } catch {
    res.status(409).json({ message: "IP address not found" });
  }
});

// Launch server only if not running tests
const PORT = process.env.PORT || 3000;

if (process.env.NODE_ENV !== 'test') {
  app.listen(PORT, () => {
    console.log(`🚀 Server listening on port ${PORT}`);
  });
} else {
  console.log(`🧪 Test environment detected — skipping server.listen()`);
}

module.exports = app;