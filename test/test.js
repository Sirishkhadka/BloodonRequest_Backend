var chai = require("chai");
var chaiHttp = require("chai-http");
var should = chai.should();

chai.use(chaiHttp);
var server = require("../index.js");

//login  user test
describe("Users", function () {
  describe("POST user login test verified user", function () {
    it("it should login a single user, provided registered and verified emailphone and correct password is entered", function (done) {
      //now request api
      chai
        .request(server)
        .post("/users/login")
        .set("content-type", "application/x-www-form-urlencoded")
        .send({
          emailId: "sirishk90@gmail.com",
          password: "Baxan12#",
        })
        .end(function (err, res) {
          res.should.have.status(200);
          done();
        });
    });
  });
});

//login  failed incorrect email user test
describe("Users", function () {
  describe("POST user login test verified user", function () {
    it("it should not login a  user, provided with incorrect emailId  is entered", function (done) {
      //now request api
      chai
        .request(server)
        .post("/users/login")
        .set("content-type", "application/x-www-form-urlencoded")
        .send({
          emailId: "test@gmail.com",
          password: "Baxan12#",
        })
        .end(function (err, res) {
          res.should.have.status(404);
          done();
        });
    });
  });
});

//login  failed incorrect password user test
describe("Users", function () {
  describe("POST user login test verified user", function () {
    it("it should not login a  user, provided with incorrect emailId  is entered", function (done) {
      //now request api
      chai
        .request(server)
        .post("/users/login")
        .set("content-type", "application/x-www-form-urlencoded")
        .send({
          emailId: "sirishk90@gmail.com",
          password: "Baxan12",
        })
        .end(function (err, res) {
          res.should.have.status(401);
          done();
        });
    });
  });
});

//user register test
describe("Users", function () {
  describe("POST user registration test", function () {
    it("it should register a single user", function (done) {
      //now request api
      chai
        .request(server)
        .post("/users/signup")
        .set("content-type", "application/x-www-form-urlencoded")
        .send({
          fullName: "hey",
          gender: "Male",
          bloodGroup: "AB-",
          country: "Nepal",
          contactNumber: "981452644",
          address: "Pokhara",
          emailId: "hey@gmail.com",
          password: "hey1234",
          image: "imageFile-1622446162157.jpg",
        })
        .end(function (err, res) {
          res.should.have.status(201);
          done();
        });
    });
  });
});

//user duplicate email register test
describe("Users", function () {
  describe("POST user registration test", function () {
    it("it should not register a user if email already exist", function (done) {
      //now request api
      chai
        .request(server)
        .post("/users/signup")
        .set("content-type", "application/x-www-form-urlencoded")
        .send({
          fullName: "hey",
          gender: "Male",
          bloodGroup: "AB-",
          country: "Nepal",
          contactNumber: "981452644",
          address: "Pokhara",
          emailId: "baxanacharya@gmail.com",
          password: "hey1234",
          image: "imageFile-1622446162157.jpg",
        })
        .end(function (err, res) {
          res.should.have.status(403);
          done();
        });
    });
  });
});

//get all blood donations
describe("GET", function () {
  describe("get donations list test", function () {
    it("it should get blood donation list ", function (done) {
      chai
        .request(server)
        .get("/requests/requestBlood") //then get the data
        //.set("Authorization", "Bearer " + Token) //set the header first
        .end(function (err, res) {
          res.should.have.status(200);
          done();
        });
    });
  });
});
