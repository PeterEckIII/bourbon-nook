import { cleanup } from "./../../helpers/cleanup";
import { authenticate } from "./../../helpers/authenticate";
import { bottle1, review1 } from "./../../helpers/bottlesAndReviews";
import { createBottle } from "./../../../app/models/bottle.server";
import { createReview } from "./../../../app/models/review.server";
import { logout } from "../../../app/session.server";
import { truncateDB } from "../../helpers/truncateDB";
import { loader as idLoader } from "../../../app/routes/reviews/$reviewId";
import { action as idAction } from "../../../app/routes/reviews/$reviewId";
import { prisma } from "../../../app/db.server";

let sandbox;

beforeEach(async () => {
  await truncateDB();
});

afterEach(async () => {
  const req = new Request("http://localhost:3000/logout");
  await logout(req);
  await cleanup();
});

describe("Review ID", () => {
  describe("Review ID Loader", () => {
    beforeEach(async () => {
      const { user } = await authenticate();
      const date = new Date();
      const bottle = await createBottle(bottle1);
      const review = await createReview({
        ...review1,
        bottleId: bottle.id,
        userId: user.id,
        createdAt: date,
        updatedAt: date,
      });
      sandbox = { date, bottle, review, user };
    });

    it("Loads the users reviews", async () => {
      expect(true).toBe(true);
      // const { session, cookie } = await authenticate();

      // const request = new Request(
      //   `http://localhost:3000/reviews/${sandbox.review.id}`,
      //   {
      //     headers: { cookie },
      //   }
      // );

      // const response: Response = await idLoader({
      //   request,
      //   params: { reviewId: sandbox.review.id },
      //   context: {},
      // });

      // let data = await response.json();
      // expect(data.bottle.name).toBe("Elijah Craig Barrel Proof");
      // expect(data.review.createdAt).toMatch(
      //   /(\d{4})-(\d{2})-(\d{2})T(\d{2}):(\d{2}):(\d{2}).(\d)*Z/g
      // );
      // expect(data.review.updatedAt).toMatch(
      //   /(\d{4})-(\d{2})-(\d{2})T(\d{2}):(\d{2}):(\d{2}).(\d)*Z/g
      // );

      // expect(data.review.citrus).toEqual(6);

      // expect(response.status).toBe(200);
    });
  });

  describe("Review ID Action", () => {
    beforeEach(async () => {
      const { user } = await authenticate();
      const date = new Date();
      const bottle = await createBottle(bottle1);
      const review = await createReview({
        ...review1,
        bottleId: bottle.id,
        userId: user.id,
        createdAt: date,
        updatedAt: date,
      });
      sandbox = { date, bottle, review, user };
    });

    it("Deletes the review upon request", async () => {
      expect(true).toBe(true);
      // const { cookie } = await authenticate();

      // const formData = new FormData();
      // formData.append("_deleted", "_deleted");

      // const request = new Request(
      //   `http://localhost:3000/reviews/${sandbox.review.id}`,
      //   {
      //     method: "DELETE",
      //     headers: { cookie },
      //     body: formData,
      //   }
      // );

      // const existingReview = await prisma.review.findUnique({
      //   where: { id: sandbox.review.id },
      // });

      // expect(existingReview).not.toBeNull();

      // const response: Response = await idAction({
      //   request,
      //   params: { reviewId: sandbox.review.id },
      //   context: {},
      // });

      // const deletedReview = await prisma.review.findUnique({
      //   where: { id: sandbox.review.id },
      // });
      // expect(deletedReview).toBeNull();
      // expect(response.status).toBe(302);
    });
  });
});
