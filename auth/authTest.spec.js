const request = require("supertest");
const server = require("../api/server");
const db = require("../database/dbConfig");

beforeEach(() => {
  return db.migrate.rollback().then(() => db.migrate.latest());
});

describe("Register User", () => {
  it("POST /api/auth/register", async () => {
    const res = await request(server)
      .post("/api/auth/register")
      .send({ username: "christian", password: "test123" });
    expect(res.status).toBe(201);

    expect(res.body).toHaveProperty("token");

    expect(res.type).toBe("application/json");
  });
});
describe("fail the registration", () => {
  it("POST /api/auth/register", async () => {
    const res = await request(server)
      .post("/api/fail")
      .send({ username: "christian", password: "test123" });
    expect(res.status).toBe(404);

    expect(res.type).toBe("text/html");
  });
});
describe("Login User", () => {
  it("POST /api/auth/login", async () => {
    const res = await request(server)
      .post("/api/auth/register")
      .send({ username: "christian4", password: "test123" });
    expect(res.status).toBe(201);

    expect(res.body).toHaveProperty("token");

    expect(res.type).toBe("application/json");
  });
});
describe("faill the login", () => {
  it("POST /api/auth/login", async () => {
    const res = await request(server)
      .post("/api/fail")
      .send({ username: "christian4", password: "test123" });
    expect(res.status).toBe(404);
  });
});
