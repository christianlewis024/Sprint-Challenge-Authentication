const request = require("supertest");
const server = require("../api/server");
const db = require("../database/dbConfig");

describe("jokes tests", () => {
  user = { username: "test", password: "test123" };

  beforeEach(async () => {
    await db("users").truncate();
  });

  describe("successfully hit jokes endpoint", () => {
    it("should return status 200", async () => {
      let token;
      await request(server)
        .post("/api/auth/register")
        .send(user)
        .then((res) => {
          token = res.body.token;
        });
      console.log(token);
      return await request(server)
        .get("/api/jokes")
        .set({ authorization: token })
        .then((res) => expect(res.status).toBe(200));
    });

    it("fail jokes endpoint", async () => {
      let token = 555;

      return await request(server)
        .get("/api/jokes")
        .set({ authorization: token })
        .then((res) => expect(res.status).toBe(401));
    });
  });
});
