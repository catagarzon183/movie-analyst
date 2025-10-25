process.env.NODE_ENV = "test";

const chai = require("chai");
const chaiHttp = require("chai-http");
const expect = chai.expect;
const server = require("../server");
const mysql = require("mysql2");

chai.use(chaiHttp);

describe("✅ Basic API Health Tests", function() {

  // Test 1: Verificar que el servidor responde
  it("should return 200 OK on / route", function(done) {
    chai.request(server)
      .get("/")
      .end(function(err, res) {
        expect(res).to.have.status(200);
        expect(res.body).to.have.property("message").that.equals("OK");
        done();
      });
  });

  // Test 2: Verificar conexión a la base de datos
  it("should connect successfully to the database", function(done) {
    const connection = mysql.createConnection({
      host: process.env.DB_HOST,
      user: process.env.DB_USER,
      password: process.env.DB_PASS,
      database: process.env.DB_NAME
    });

    connection.connect(function(err) {
      expect(err).to.be.null;
      connection.end();
      done();
    });
  });

});
