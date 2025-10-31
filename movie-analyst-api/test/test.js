process.env.NODE_ENV = "test";

const chai = require("chai");
const chaiHttp = require("chai-http");
const expect = chai.expect;
const server = require("../server");
const mysql = require("mysql2");

chai.use(chaiHttp);

describe("✅ Basic API Health Tests", function() {

  it("should return 200 OK on / route", function(done) {
    chai.request(server)
      .get("/")
      .end(function(err, res) {
        expect(res).to.have.status(200);
        expect(res.body).to.have.property("message").that.equals("OK");
        done();
      });
  });

  it("should connect successfully to the database (or skip if not available)", function(done) {
    const connection = mysql.createConnection({
      host: process.env.DB_HOST || "localhost",
      user: process.env.DB_USER || "root",
      password: process.env.DB_PASS || "",
      database: process.env.DB_NAME || "movie_db"
    });

    connection.connect(function(err) {
      if (err) {
        console.warn("⚠️ Database not reachable in CI, skipping test");
        this.skip(); // salta el test sin error
      } else {
        expect(err).to.be.null;
        connection.end();
      }
      done();
    });
  });

});
