let chai = require("chai");
let chaiHttp = require("chai-http");
const expect = require("chai").expect;
const { response } = require("express");
let app = require("../models/post")
let server = require("../app");
chai.should();
const mongoose = require('mongoose');
const { type } = require("express/lib/response");
const { path } = require("../app");
chai.use(chaiHttp);




//-----------------------------------
describe("POST API /api", () => {
  
  before(() => {
    mongoose.connection.dropCollection("message");
  });
  const admini = {
    email: "hiheritier7@gmail.com",
    password: "heritier",
  };
 describe("/get admin", () => {
  it("should fetch the admin successfully", (done) => {
    chai
      .request(server)
      .post("/auth/login")
      .send(admini)
      .set({ Authorization: `Bearer ${"6263c896208a64a623fb0fe3"}` })
      .end((err, res) => {
        res.should.have.status(200);
        res.body.should.be.a("object");
        done();
      });
  });

  // it("should not fetch the admin successfully", (done) => {
  //   chai
  //     .request(server)
  //     .post("/auth/loginn")
  //     .send(admini)

  //     .set({ Authorization: `Bearer ${"6263c896208a64a623fb0fe3"}` })
  //     .end((err, res) => {
  //       res.should.have.status(404);
  //       res.body.should.be.a("object");
  //       done();
  //     });
  // });

});
//test to post a post

describe("POST API /query", () => {
  before(() => {
    mongoose.connection.dropCollection("message");
  });
  const messages = {
    username: "peter",
    email: "peter7@gmail.com",
    message: "hello world",
  };

  it("should successfully create a message and return 201", (done) => {
    chai
      .request(server)
      .post("/query/message")
      .send(messages)
      .end((err, res) => {
        if (err) return done(err);
        console.log(res.status)
        expect(res.status).to.be.equal(201);
        return done();
      });
  });

  // it("should not successfully create a message and return 404", (done) => {
  //   chai
  //     .request(server)
  //     .post("/query/messagee")
  //     .send(messages)
  //     .end((err, res) => {
  //       if (err) return done(err);
  //       console.log(res.status)
  //       expect(res.status).to.be.equal(404);
  //       return done();
  //     });
  // });

  it("should delete a message and return 404", (done) => {
    chai
      .request(server)
      .delete("/query/message/:id")
      .set({ Authorization: `Bearer ${"eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6ImhpaGVyaXRpZXI3QGdtYWlsLmNvbSIsInJvbGUiOiJhZG1pbiIsInVzZXJJZCI6IjYyNjNjODk2MjA4YTY0YTYyM2ZiMGZlMyIsImlhdCI6MTY1MTIzMzg5NSwiZXhwIjoxNjUxMjM3NDk1fQ.KkMCa8Y4xCvxGplcTx4yaRes-Odnhom5I7gwWywkW-s"}` })
      .send(messages)
      .end((err, res) => {
        if (err) return done(err);
        console.log(res.status)
        expect(res.status).to.be.equal(404);
        return done();
      });
  });

  // it("should not delete a message and return 404", (done) => {
  //   chai
  //     .request(server)
  //     .delete("/query/message/:id1")
  //     .send(messages)
  //     .end((err, res) => {
  //       if (err) return done(err);
  //       console.log(res.status)
  //       expect(res.status).to.be.equal(404);
  //       return done();
  //     });
  // });

  it("should GET all messages and return 200", (done) => {
    chai
      .request(server)
      .get("/query/messages")
      .send(messages)
      .set({ Authorization: `Bearer ${"eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6ImhpaGVyaXRpZXI3QGdtYWlsLmNvbSIsInJvbGUiOiJhZG1pbiIsInVzZXJJZCI6IjYyNjNjODk2MjA4YTY0YTYyM2ZiMGZlMyIsImlhdCI6MTY1MTIzMzg5NSwiZXhwIjoxNjUxMjM3NDk1fQ.KkMCa8Y4xCvxGplcTx4yaRes-Odnhom5I7gwWywkW-s"}` })
      .end((err, res) => {
        if (err) return done(err);
        console.log(res.status)
        expect(res.status).to.be.equal(200);
        return done();
      });
  });

  

});

//Test create(POST) admin

describe("POST API /auth/seed", () => {
  before(() => {
    mongoose.connection.dropCollection("user");
  });
  const admin = {
    username: "hiheritier",
    email: "hiheritier7@gmail.com",
    password: "heritier",
    role: "admin",
  };
it("should successfully create admin and return 201", (done) => {
  chai
    .request(server)
    .post("/auth/seed/")
    .send(admin)
    .end((err, res) => {
      if (err) return done(err);
      console.log(res.status)
      expect(res.status).to.be.equal(201);
      return done();
    });
});

// it("should not successfully create admin and return 404", (done) => {
//   chai
//     .request(server)
//     .post("/auth/seedd/")
//     .send(admin)
//     .end((err, res) => {
//       if (err) return done(err);
//       console.log(res.status)
//       expect(res.status).to.be.equal(404);
//       return done();
//     });
// });
});


//-------------Post

describe("POST API /api/posts", () => {
  before(() => {
    mongoose.connection.dropCollection("post");
  });
  const post = {
    Image: "Image",
    title: "hiheritier",
    content: "heritier",
    
  };
it("should successfully create a post and return 422", (done) => {
  chai
    .request(server)
    .post("/api/post/")
    .send(post)
    .set({ Authorization: `Bearer ${"eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6ImhpaGVyaXRpZXI3QGdtYWlsLmNvbSIsInJvbGUiOiJhZG1pbiIsInVzZXJJZCI6IjYyNjNjODk2MjA4YTY0YTYyM2ZiMGZlMyIsImlhdCI6MTY1MTIzMzg5NSwiZXhwIjoxNjUxMjM3NDk1fQ.KkMCa8Y4xCvxGplcTx4yaRes-Odnhom5I7gwWywkW-s"}` })
    .end((err, res) => {
      if (err) return done(err);
      console.log(res.status)
      expect(res.status).to.be.equal(422);
      return done();
    });
});

// it("should not successfully create a post and return 404", (done) => {
//   chai
//     .request(server)
//     .post("/api/postd/")
//     .send(post)
//     .end((err, res) => {
//       if (err) return done(err);
//       console.log(res.status)
//       expect(res.status).to.be.equal(404);
//       return done();
//     });
// });

it("should successfully GET all post and return 200", (done) => {
  chai
    .request(server)
    .get("/api/posts/")
    .send(post)
    .end((err, res) => {
      if (err) return done(err);
      console.log(res.status)
      expect(res.status).to.be.equal(200);
      return done();
    });
});



it("should successfully GET post by id and return 404", (done) => {
  chai
    .request(server)
    .get("/api/posts/:id")
    .set({ Authorization: `Bearer ${"eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6ImhpaGVyaXRpZXI3QGdtYWlsLmNvbSIsInJvbGUiOiJhZG1pbiIsInVzZXJJZCI6IjYyNjNjODk2MjA4YTY0YTYyM2ZiMGZlMyIsImlhdCI6MTY1MTIzMzg5NSwiZXhwIjoxNjUxMjM3NDk1fQ.KkMCa8Y4xCvxGplcTx4yaRes-Odnhom5I7gwWywkW-s"}` })
    .send(post)
    .end((err, res) => {
      if (err) return done(err);
      console.log(res.status)
      expect(res.status).to.be.equal(404);
      return done();
    });
});

it("should successfully Update a post and return 422", (done) => {
  chai
    .request(server)
    .put("/api/post/:id")
    .send(post)
    .set({ Authorization: `Bearer ${"eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6ImhpaGVyaXRpZXI3QGdtYWlsLmNvbSIsInJvbGUiOiJhZG1pbiIsInVzZXJJZCI6IjYyNjNjODk2MjA4YTY0YTYyM2ZiMGZlMyIsImlhdCI6MTY1MTIzMzg5NSwiZXhwIjoxNjUxMjM3NDk1fQ.KkMCa8Y4xCvxGplcTx4yaRes-Odnhom5I7gwWywkW-s"}` })
    .end((err, res) => {
      if (err) return done(err);
      console.log(res.status)
      expect(res.status).to.be.equal(422);
      return done();
    });
});

it("should successfully delete a post and return 500", (done) => {
  chai
    .request(server)
    .delete("/api/post/:id")
    .send(post)
    .set({ Authorization: `Bearer ${"eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6ImhpaGVyaXRpZXI3QGdtYWlsLmNvbSIsInJvbGUiOiJhZG1pbiIsInVzZXJJZCI6IjYyNjNjODk2MjA4YTY0YTYyM2ZiMGZlMyIsImlhdCI6MTY1MTIzMzg5NSwiZXhwIjoxNjUxMjM3NDk1fQ.KkMCa8Y4xCvxGplcTx4yaRes-Odnhom5I7gwWywkW-s"}` })
    .end((err, res) => {
      if (err) return done(err);
      console.log(res.status)
      expect(res.status).to.be.equal(500);
      return done();
    });
});

});







describe("POST API /api", () => {
  
  before(() => {
    mongoose.connection.dropCollection("message");
  });
  const userCreate = {
    username : "hiheritier",
    email: "hiheritier7@gmail.com",
    password: "heritier",
  };
 describe("/get admin", () => {
  it("should fetch the user successfully", (done) => {
    chai
      .request(server)
      .post("/auth/signup")
      .send(userCreate)
      .end((err, res) => {
        res.should.have.status(404);
        res.body.should.be.a("object");
        done();
      });
  });

  // it("should not fetch the user successfully", (done) => {
  //   chai
  //     .request(server)
  //     .post("/auth/signup")
  //     .send(userCreate)
  //     .end((err, res) => {
  //       res.should.have.status(404);
  //       res.body.should.be.a("object");
  //       done();
  //     });
  // });

});




// describe("Posts API", () =>{
  
//   // test to get all post
//   describe("GET /api/posts",() => {
//     it("It should return all posts",(done) => {
//       chai.request(app)
//       .get("/api/posts")
//       .end((err, response) => {
//         expect(res.status).to.be.equal(200);
//         expect(res.body).to.be.a("object");
//         expect(res.body).not.to.eql(0);
//         done();
//       })
//     });
//   });
 
//   it("It should return all posts",(done) => {
//     chai.request(app)
//     .get("/api/posti")
//     .end((err, response) => {
//       response.should.have.status(404);
//       done();
//     })
//   });
    
//      // Test the GET (by id) route
     

     
     
//      /**
//       * Test the POST route
//       */
     
//      /**
//       * Test the PUT route
//      */
    
//     /**
//      * Test the DELETE route
//      */





});
})