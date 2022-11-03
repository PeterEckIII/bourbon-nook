import { logout } from "../../app/session.server";
import { truncateDB } from "../helpers/truncateDB";
import { loader as joinLoader } from "../../app/routes/join";
import { action as joinAction } from "../../app/routes/join";
import { createUser } from "../../app/models/user.server";

beforeEach(async () => {
  await truncateDB();
});

afterEach(async () => {
  const req = new Request("http://localhost:3000");
  await logout(req);
});

const URL = "http://localhost:3000/join";

describe("Join", () => {
  describe("Join Loader", () => {
    it("Loads the join page", async () => {
      const request = new Request(URL);
      const response: Response = await joinLoader({
        request,
        params: {},
        context: {},
      });
      expect(response.status).toBe(200);
      expect(response).toBeInstanceOf(Response);
    });
  });

  describe("Join Action", () => {
    it("Allows a user to register a new account", async () => {
      let body = new URLSearchParams({
        email: "test@example.com",
        password: "MyTestUser128838!",
      });

      let request = new Request(`${URL}?_data=routes%2Fjoin`, {
        method: "POST",
        body,
      });

      const response = await joinAction({
        request,
        params: {},
        context: {},
      });

      expect(response.status).toBe(302);
    });

    it("Shows a too short password error", async () => {
      let body = new URLSearchParams({
        email: "test@example.com",
        password: "gh!",
      });

      let request = new Request(`${URL}?_data=routes%2Fjoin`, {
        method: "POST",
        body,
      });

      const response = await joinAction({
        request,
        params: {},
        context: {},
      });

      expect(response.status).toBe(400);
      expect(response.statusText).toBe("Password is too short");
    });

    it("Shows a password required error", async () => {
      let body = new URLSearchParams({
        email: "test@example.com",
      });

      let request = new Request(`${URL}?_data=routes%2Fjoin`, {
        method: "POST",
        body,
      });

      const response = await joinAction({
        request,
        params: {},
        context: {},
      });

      expect(response.status).toBe(400);
      expect(response.statusText).toBe("Password is required");
    });

    it("Shows an error if the email is taken", async () => {
      await createUser("test@example.com", "Vitest2022!!");
      let body = new URLSearchParams({
        email: "test@example.com",
        password: "asdjhflkajsdhfjkalhsdfahsdf",
      });

      let request = new Request(`${URL}?_data=routes%2Fjoin`, {
        method: "POST",
        body,
      });

      const response = await joinAction({
        request,
        params: {},
        context: {},
      });

      expect(response.status).toBe(400);
      expect(response.statusText).toBe("A user already exists with this email");
    });
  });
});
