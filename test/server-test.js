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

    chai
      .request(server)
      .post("/adduser")
      .send({
        username: "testUser",
        password: "testUser",
        name: "testUser",
        email: "testUser@gmail.com"
      })
      .end(function (err, res) {
        expect(res.to.have.status(200));
      });
    var res3 = await chai.request(server).post("/profile/get/userInfo").send({
      username: "testUser"
    });
    userid = res3.body.userid;
    var res3 = await chai.request(server).get("/api/users");
    var after = res3.body.length;
    (after - before).should.equal(1);
  });

  it("should create user's individual data table", async () => {
    //create individual user table
    chai
      .request(server)
      .post(`/generateUserTable`)
      .send({
        userid: userid
      })
      .end();
    //get data from user table, which is still empty. However, it is proof that the table is created
    var res2 = await chai.request(server).post(`/getUserData/${userid}`);
    res2.body.should.be.a("array");
    res2.body.should.be.empty;
  });

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

describe("Functional tests for signup and login from authRouter.js", function () {
  var uid;
  it("should sign up a new user with username 'testSignup'", async () => {
    var res = await chai.request(server).post(`/auth/signup`).send({
      name: "testSignup",
      username: "testSignup",
      email: "testSignup@gmail.com",
      password: "testSignup"
    });
    res.body.signup.should.equal(true);
    //checking if the user is in the database
    var res2 = await chai.request(server).post(`/profile/get/userInfo`).send({
      username: "testSignup"
    });
    res2.body.username.should.equal("testSignup");
    let isPasswordMatch = await bcrypt.compare(
      "testSignup",
      res2.body.password
    );
    expect(isPasswordMatch).to.be.true;
    res2.body.nickname.should.equal("testSignup");
    res2.body.email.should.equal("testSignup@gmail.com");

    //checking if the individual user table is created with no values inside
    uid = res2.body.userid;
    var res3 = await chai.request(server).post(`/getUserData/${uid}`);
    res3.body.should.be.a("array");
    res3.body.should.be.empty;
  });

  it("should reject sign up because of duplicate username 'testsignup'", async () => {
    var res = await chai.request(server).post(`/auth/signup`).send({
      name: "testSignup",
      username: "testSignup",
      email: "testSignup@gmail.com",
      password: "testSignup"
    });
    res.body.signup.should.equal(false);
    res.body.status.should.equal("username taken");
  });

  it("should login with testSignup credentials", async () => {
    var res = await chai.request(server).post(`/auth/login`).send({
      username: "testSignup",
      password: "testSignup"
    });
    res.body.login.should.equal(true);
  });

  it("should reject login because of invalid password", async () => {
    var res = await chai.request(server).post(`/auth/login`).send({
      username: "testSignup",
      password: "random"
    });
    res.body.login.should.equal(false);
    res.body.status.should.equal("Error: Wrong Password");
  });

  it("should reject login because of invalid username", async () => {
    var res = await chai.request(server).post(`/auth/login`).send({
      username: "random",
      password: "testSignup"
    });
    res.body.login.should.equal(false);
    res.body.status.should.equal("Error: User Not Existed");
  });

  it("should delete a user from the database", async () => {
    var res2 = await chai.request(server).get("/api/users");
    var res3 = await chai.request(server).post(`/admindata/delete/user/${uid}`);
    var res4 = await chai.request(server).get("/api/users");
    (res2.body.length - res4.body.length).should.equal(1);
  });
});
