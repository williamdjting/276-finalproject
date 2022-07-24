var chai = require("chai");
var chaiHttp = require("chai-http");
var server = require("../backend/server");
var server2 = require;
const bcrypt = require("bcrypt");
var should = chai.should();
var expect = chai.expect;

chai.use(chaiHttp);

describe("Unit tests for modifying users (show, add, delete, update)", function () {
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

  it("should create user's individual data table", async () => {
    var res = await chai.request(server).post(`/generateUserTable`).send({
      userid: userid
    });
    res.should.be.json;
    //still don't know how to check if a table is created or not, so right now check if the response is "created"
    res.body.should.equal("created");
  });

  //   it("should list user data table", async () => {
  //     var res = await chai.request(server).get(`/api/users/${userid}`);
  //     res.should.be.json;
  //     res.body.should.be.a("array");
  //   });

  it("should return user information (userid, username, password, nickname, email)", async () => {
    var res = await chai.request(server).post(`/profile/get/userInfo`).send({
      username: "testUser"
    });
    res.body.userid.should.equal(userid);
    res.body.username.should.equal("testUser");
    res.body.password.should.equal("testUser");
    res.body.nickname.should.equal("testUser");
    res.body.email.should.equal("testUser@gmail.com");
  });

  it("should return user nickname", async () => {
    var res = await chai.request(server).post(`/getNickname/${userid}`);
    res.body[0].nickname.should.equal("testUser");
  });

  it("should udpate user nickname", async () => {
    var res = await chai
      .request(server)
      .post(`/admindata/modify/nickname`)
      .send({
        input: "testNickname",
        id: userid
      });
    var res2 = await chai.request(server).post(`/getNickname/${userid}`);
    res2.body[0].nickname.should.equal("testNickname");
  });

  it("should update user password ", async () => {
    var res = await chai
      .request(server)
      .post(`/admindata/modify/password`)
      .send({
        input: "testPassword",
        id: userid
      });
    var res2 = await chai.request(server).post(`/profile/get/userInfo`).send({
      username: "testUser"
    });
    let isPasswordMatch = await bcrypt.compare(
      "testPassword",
      res2.body.password
    );
    expect(isPasswordMatch).to.be.true;
  });

  it("should update user email", async () => {
    var res = await chai.request(server).post(`/admindata/modify/email`).send({
      input: "testEmail@gmail.com",
      id: userid
    });
    var res2 = await chai.request(server).post(`/profile/get/userInfo`).send({
      username: "testUser"
    });
    res2.body.email.should.equal("testEmail@gmail.com");
  });

  it("should reset user password to 'password'", async () => {
    var res = await chai.request(server).post(`/resetPassword`).send({
      userid: userid
    });
    var res2 = await chai.request(server).post(`/profile/get/userInfo`).send({
      username: "testUser"
    });
    res2.body.password.should.equal("password");
  });

  it("should delete a user from the database", async () => {
    var res2 = await chai.request(server).get("/api/users");
    var res3 = await chai
      .request(server)
      .post(`/admindata/delete/user/${userid}`);
    var res4 = await chai.request(server).get("/api/users");
    (res2.body.length - res4.body.length).should.equal(1);
  });
});
