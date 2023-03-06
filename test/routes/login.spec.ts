import { cleanup } from "./../helpers/cleanup";
import { createUser } from "../../app/models/user.server";
import { truncateDB } from "../helpers/truncateDB";
import { loader as loginLoader } from "../../app/routes/login";
import { action as loginAction } from "../../app/routes/login";

beforeEach(async () => {
  await truncateDB();
});

afterEach(async () => {
  await cleanup();
});

const URL = "http://localhost:3000/login";

describe("Login", () => {
  describe("Login Loader", () => {
    it("Loads the login page", async () => {
      const request = new Request(URL);
      const response: Response = await loginLoader({
        request,
        params: {},
        context: {},
      });
      expect(response.status).toBe(200);
      expect(response).toBeInstanceOf(Response);
    });
  });

  describe("Login Action", () => {
    afterEach(async () => {
      await cleanup();
    });

    it("Allows the user to login", async () => {
      const user = await createUser("test2@example.com", "vItEsT201!");
      let body = new URLSearchParams({
        email: user.email,
        password: "vItEsT201!",
        redirectTo: "http://localhost:3000/reviews",
      });

      let request = new Request(`${URL}?_data=routes%2Flogin`, {
        method: "POST",
        body,
      });

      const response: Response = await loginAction({
        request,
        params: {},
        context: {},
      });
      console.log(`Response: ${JSON.stringify(response)}`);

      expect(response.status).toBe(302);
      expect(response.headers.get("Set-Cookie")).toContain(`BN__session=`);
    });

    it("Shows an incorrect password error", async () => {
      const user = await createUser("test2@example.com", "vItEsT201!");
      let body = new URLSearchParams({
        email: user.email,
        password: "akjsdhjkfjaksd",
        redirectTo: "http://localhost:300/reviews",
      });

      let request: Request = new Request(`${URL}?_data=routes%2Flogin`, {
        method: "POST",
        body,
      });

      let response: Response = await loginAction({
        request,
        params: {},
        context: {},
      });
      expect(response.status).toEqual(400);
      expect(response.statusText).toBe("Invalid email or password");
      expect(response.headers.get("Set-Cookie")).toBe(null);
    });

    it("Shows a too short password error", async () => {
      const user = await createUser("test2@example.com", "vItEsT201!");
      let body = new URLSearchParams({
        email: user.email,
        password: "jdjk",
        redirectTo: "http://localhost:300/reviews",
      });

      let request: Request = new Request(`${URL}?_data=routes%2Flogin`, {
        method: "POST",
        body,
      });

      let response: Response = await loginAction({
        request,
        params: {},
        context: {},
      });
      expect(response.status).toEqual(400);
      expect(response.statusText).toBe("Password is too short");
      expect(response.headers.get("Set-Cookie")).toBe(null);
    });

    it("Shows a password required error", async () => {
      const user = await createUser("test2@example.com", "vItEsT201!");
      let body = new URLSearchParams({
        email: user.email,
        redirectTo: "http://localhost:300/reviews",
      });

      let request: Request = new Request(`${URL}?_data=routes%2Flogin`, {
        method: "POST",
        body,
      });

      let response: Response = await loginAction({
        request,
        params: {},
        context: {},
      });
      expect(response.status).toEqual(400);
      expect(response.statusText).toBe("Password is required");
      expect(response.headers.get("Set-Cookie")).toBe(null);
    });
  });
});
