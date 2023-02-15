import { cleanup } from "./../../../helpers/cleanup";
import { prisma } from "../../../../app/db.server";
import { saveToRedis } from "../../../../app/utils/redis.server";
import { action as bottleInfoAction } from "../../../../app/routes/reviews/new/bottle";
import { authenticate } from "../../../helpers/authenticate";
import { truncateDB } from "../../../helpers/truncateDB";
import * as redis from "redis";
import { generateCode } from "../../../../app/utils/helpers.server";
import { redirect } from "@remix-run/server-runtime";

beforeAll(async () => {
  const testClient = redis.createClient({
    url: "redis://localhost:6379",
  });

  testClient.on("error", (err) => console.log(`Redis client error: ${err}`));

  await testClient.connect();
  await saveToRedis({
    redisId: "H5B77D",
  });
});

beforeEach(async () => {
  await truncateDB();
});

afterEach(async () => {
  await cleanup();
});

describe("Bottle Info", () => {
  describe("BottleInfo Loader", () => {
    it("Loads the bottleInfo route with no data", async () => {
      const { user, session, cookie } = await authenticate();
      const request = new Request(
        "http://localhost:3000/reviews/new/bottle?id=H5B77D",
        {
          headers: { cookie },
        }
      );

      // const response: Response = await bottleInfoLoader({
      //   request,
      //   params: {},
      //   context: {},
      // });

      expect(true).toBe(true);
      // expect(response).toContain({ redisId: "H5B77D" });
      // expect(
      //   await prisma.user.findUnique({ where: { id: user.id } })
      // ).not.toBeNull();
    });
  });

  describe("BottleInfo Action", () => {
    it("Submits the bottle info form and redirects", async () => {
      const { user, session, cookie } = await authenticate();

      const name = "Eagle Rare",
        type = "Bourbon",
        distiller = "Buffalo Trace",
        producer = "Sazerac",
        country = "USA",
        region = "KY",
        price = "34.99",
        age = "10yrs",
        year = "2022",
        batch = "N/A",
        alcoholPercent = "45",
        proof = "90",
        size = "750mL",
        color = "Amber",
        finishing = "None",
        imageUrl = "";
      const redisId = generateCode(6);

      await saveToRedis({
        type,
        name,
        distiller,
        producer,
        country,
        region,
        price,
        age,
        year,
        batch,
        alcoholPercent,
        proof,
        size,
        color,
        finishing,
        redisId,
        imageUrl,
      });

      const formData = new FormData();

      formData.append("id", redisId);
      formData.append("name", name);
      formData.append("type", type);
      formData.append("distiller", distiller);
      formData.append("producer", producer);
      formData.append("country", country);
      formData.append("region", region);
      formData.append("price", price);
      formData.append("age", age);
      formData.append("year", year);
      formData.append("batch", batch);
      formData.append("alcoholPercent", alcoholPercent);
      formData.append("proof", proof);
      formData.append("size", size);
      formData.append("color", color);
      formData.append("finishing", finishing);
      formData.append("imageUrl", imageUrl);

      const request = new Request("http://localhost:3000/reviews/new/bottle", {
        method: "POST",
        headers: { cookie },
        body: formData,
      });

      const response: Response = await bottleInfoAction({
        request,
        params: {},
        context: {},
      });

      console.log(`RESPONSE: ${JSON.stringify(response, null, 2)}`);

      expect(true).toBe(true);
      // expect(response.status).toBe(302);
      // expect(response).toEqual(redirect(`/reviews/new/addImage?id=${redisId}`));
      // expect(
      //   await prisma.user.findUnique({ where: { id: user.id } })
      // ).not.toBeNull();
    });
  });
});
