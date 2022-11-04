import { cleanup } from "./../helpers/cleanup";
import { truncateDB } from "../helpers/truncateDB";
import { loader as reviewsLoader } from "../../app/routes/reviews";
import { createUserSession, logout } from "../../app/session.server";
import { createUser } from "../../app/models/user.server";
import { prisma } from "../../app/db.server";

beforeEach(async () => {
  await truncateDB();
});

afterEach(async () => {
  const req = new Request("http://localhost:3000");
  await logout(req);
  await cleanup();
});

const URL = "https://localhost:3000/reviews?index";

describe("Reviews (root)", () => {
  describe("Review Loader", () => {
    it("Allows a logged in user to access their reviews", async () => {
      const user = await createUser("test2@example.com", "Testing2022!");
      const request = new Request(URL);
      await createUserSession({
        request,
        userId: user.id,
        remember: true,
        redirectTo: "",
      });
      request.headers.set(
        "Set-Cookie",
        "__session=eyJ1c2VySWQiOiJjbDl4N2IwZzIwMDAwc2Y2cXFjcGo0MGZzIn0=.8liVUBbgbKEN+KhDD669KUmU2rFSfsPUMplVmHyHiiI"
      );
      expect(request.headers.get("Set-Cookie")).toEqual(
        "__session=eyJ1c2VySWQiOiJjbDl4N2IwZzIwMDAwc2Y2cXFjcGo0MGZzIn0=.8liVUBbgbKEN+KhDD669KUmU2rFSfsPUMplVmHyHiiI"
      );

      let result;
      try {
        await reviewsLoader({
          request,
          params: {},
          context: {},
        });
      } catch (error) {
        result = error;
      }
      expect((result as Response).status).toEqual(302);
      expect(
        await prisma.user.findUnique({ where: { id: user.id } })
      ).not.toBeNull();
    });
  });
});
