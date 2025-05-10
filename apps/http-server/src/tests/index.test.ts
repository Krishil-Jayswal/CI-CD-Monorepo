import { app } from "../index.js";
import request from "supertest";
import { expect, it, describe, vi } from "vitest";

vi.mock("db", () => {
    return {
        prisma: {
            request: {
                create: vi.fn()
            }
        }
    }
})

describe("Test sum endpoint", () => {
  it("Should return 400 when invalid data is sent", async () => {
    const response = await request(app)
      .post("/sum")
      .send({
        a: "qfjkrfjr",
        b: [10],
      });
    expect(response.status).toBe(400);
    expect(response.body.message).toBe("Invalid data format.");
  });

  it("Should return 200 when valid data is sent", async () => {
    const response = await request(app).post("/sum").send({
      a: 3,
      b: 4,
    });
    expect(response.status).toBe(200);
    expect(response.body.sum).toBe(7);
  });
});
