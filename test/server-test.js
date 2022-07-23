var chai = require("chai");
var chaiHttp = require("chai-http");
var server = require("../backend/server");
var should = chai.should();

chai.use(chaiHttp);

describe("Basic unit tests for users (list, add, delete, update)", function () {
  //tests for users
  it("should list all users from database", async () => {
    var res = await chai.request(server).get("/api/users");
    res.should.be.json;
    res.body.should.be.a("array");
  });

  var userid;
  it("should add a new user to the database", async () => {
    var res1 = await chai.request(server).get("/api/users");
    var before = res1.body.length;

    var res2 = await chai.request(server).post("/adduser").send({
      username: "testUser",
      password: "testUser",
      name: "testUser",
      email: "testUser@gmail.com"
    });
    userid = res2.body[0].userid;
    var res3 = await chai.request(server).get("/api/users");
    var after = res3.body.length;
    (after - before).should.equal(1);
  });

  it("should delete a user from the database", async () => {
    var res2 = await chai.request(server).get("/api/users");
    var res3 = await chai.request(server).post(`/deluser/${userid}`);
    var res4 = await chai.request(server).get("/api/users");
    (res2.body.length - res4.body.length).should.equal(1);
  });
});
