// Get our dependencies
var express = require("express");
var app = express();
var publicIp = require("public-ip");
var mysql = require("mysql");
var dotenv = require("dotenv");

// Load environment variables
if (process.env.NODE_ENV === "test") {
  dotenv.config({ path: "./.env.test" });  // Use test env for Jenkins or npm test
} else {
  dotenv.config(); // Default .env for local/prod
}

// --- Safe database connection ---
var connection;
try {
  connection = mysql.createConnection({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASS,
    database: process.env.DB_NAME,
  });
  connection.connect((err) => {
    if (err) {
      console.error("⚠️ Error connecting to database:", err.message);
    } else {
      console.log("✅ Connected to MySQL database");
    }
  });
} catch (err) {
  console.error("⚠️ MySQL connection failed:", err.message);
}

// --- Healthcheck endpoint ---
app.get("/", function (req, res) {
  res.status(200).json({
    uptime: process.uptime(),
    message: "OK",
    timestamp: Date.now(),
  });
});

// --- Movies API endpoint ---
function getMovies(callback) {
  if (!connection) return callback(new Error("No DB connection"), null);
  connection.query("SELECT * FROM movie_db.moviereview", callback);
}

app.get("/movies", function (req, res) {
  getMovies(function (err, moviesResult) {
    if (err) {
      res.status(500).json({ message: err.message });
    } else if (moviesResult && moviesResult.length > 0) {
      res.status(200).json(moviesResult);
    } else {
      res.status(404).json({ message: "Movies not found" });
    }
  });
});

// --- Reviewers API endpoint ---
function getReviewers(callback) {
  if (!connection) return callback(new Error("No DB connection"), null);
  connection.query("SELECT * FROM movie_db.reviewer", callback);
}

app.get("/reviewers", function (req, res) {
  getReviewers(function (err, authors) {
    if (err) {
      res.status(500).json({ message: err.message });
    } else if (authors && authors.length > 0) {
      res.status(200).json(authors);
    } else {
      res.status(404).json({ message: "Authors not found" });
    }
  });
});

// --- Publications API endpoint ---
function getPublications(callback) {
  if (!connection) return callback(new Error("No DB connection"), null);
  connection.query("SELECT * FROM movie_db.publication", callback);
}

app.get("/publications", function (req, res) {
  getPublications(function (err, publications) {
    if (err) {
      res.status(500).json({ message: err.message });
    } else if (publications && publications.length > 0) {
      res.status(200).json(publications);
    } else {
      res.status(404).json({ message: "Publications not found" });
    }
  });
});

// --- Server IP API endpoint ---
app.get("/server_ip", async function (req, res) {
  try {
    var ip = await publicIp.v4();
    res.status(200).json({ message: ip || "IP not found" });
  } catch (err) {
    res.status(500).json({ message: "Error retrieving IP" });
  }
});

// --- Start server ---
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`🚀 Server listening on port: ${PORT}`);
});

module.exports = app;

