process.env.NODE_ENV = "test";

//Require the dev-dependencies
let chai = require("chai");
let chaiHttp = require("chai-http");
let expect = require("chai").expect;
let should = chai.should();
let server = require('../server');


chai.use(chaiHttp);
//Our parent block
describe("UI", () => {
  /*
   * Test the /GET route
   */
  describe("GET home page", () => {
    it("it should reply 200 over /", done => {
    chai.request(server) 
      .get('/')
      .end(function(err, res){
            expect(res.status).to.equal(200);
          done();
        });
      });
  });
  describe("GET movies page", () => {
    it("it should reply 200 over /movies", done => {
    chai.request(server) 
      .get('/movies')
      .end(function(err, res){
            expect(res.status).to.equal(200);
          done();
        });
      });
  });
  describe("GET reviewers page", () => {
    it("it should reply 200 over /authors", done => {
    chai.request(server) 
      .get('/authors')
      .end(function(err, res){
            expect(res.status).to.equal(200);
          done();
        });
      });
  });
  describe("GET publications page", () => {
    it("it should reply 200 over /publications", done => {
    chai.request(server) 
      .get('/publications')
      .end(function(err, res){
            expect(res.status).to.equal(200);
          done();
        });
      });
  });
});