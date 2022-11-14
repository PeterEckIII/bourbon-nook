import { cleanup } from "./../../../helpers/cleanup";
import { prisma } from "../../../../app/db.server";
import { saveToRedis } from "../../../../app/utils/redis.server";
import { loader as noteLoader } from "../../../../app/routes/reviews/new/notes";
import { action as noteAction } from "../../../../app/routes/reviews/new/notes";
import { authenticate } from "../../../helpers/authenticate";
import { truncateDB } from "../../../helpers/truncateDB";
import * as redis from "redis";
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

describe("Notes Route", () => {
  describe("Notes Loader", () => {
    it("Loads the redis data", async () => {
      const { user, session, cookie } = await authenticate();

      const request = new Request(
        `http://localhost:3000/reviews/new/notes?id=H5B77D`,
        {
          headers: { cookie },
        }
      );

      const response: Response = await noteLoader({
        request,
        params: {},
        context: {},
      });

      expect(response).toContain({
        redisId: "H5B77D",
      });
      expect(
        await prisma.user.findUnique({ where: { id: user.id } })
      ).not.toBeNull();
    });
  });
  describe("Notes Action", () => {
    it("Submits the form and redirects", async () => {
      const { user, session, cookie } = await authenticate();

      const cherry = 6,
        strawberry = 6,
        raspberry = 6,
        blackberry = 6,
        blueberry = 6,
        apple = 6,
        banana = 6,
        grape = 6,
        stone = 6,
        citrus = 6,
        tropical = 6,
        pepper = 6,
        bakingSpice = 6,
        cinnamon = 6,
        herbal = 6,
        mint = 6,
        coffee = 6,
        tobacco = 6,
        leather = 6,
        oak = 6,
        toasted = 6,
        smokey = 6,
        peanut = 6,
        almond = 6,
        pecan = 6,
        walnut = 6,
        oily = 6,
        floral = 6,
        corn = 6,
        rye = 6,
        wheat = 6,
        malt = 6,
        dough = 6,
        vanilla = 6,
        caramel = 6,
        molasses = 6,
        butterscotch = 6,
        honey = 6,
        chocolate = 6,
        toffee = 6,
        sugar = 6,
        overallRating = 6,
        value = 6;

      const redisId = "H5B66G";

      await saveToRedis({
        redisId,
        cherry,
        strawberry,
        raspberry,
        blackberry,
        blueberry,
        apple,
        banana,
        grape,
        stone,
        citrus,
        tropical,
        pepper,
        bakingSpice,
        cinnamon,
        herbal,
        mint,
        coffee,
        tobacco,
        leather,
        oak,
        toasted,
        smokey,
        peanut,
        almond,
        pecan,
        walnut,
        oily,
        floral,
        corn,
        rye,
        wheat,
        malt,
        dough,
        vanilla,
        caramel,
        molasses,
        butterscotch,
        honey,
        chocolate,
        toffee,
        sugar,
        overallRating,
        value,
      });

      const formData = new FormData();
      formData.append("id", redisId);
      formData.append("cherry", String(cherry));
      formData.append("strawberry", String(strawberry));
      formData.append("raspberry", String(raspberry));
      formData.append("blackberry", String(blackberry));
      formData.append("blueberry", String(blueberry));
      formData.append("apple", String(apple));
      formData.append("banana", String(banana));
      formData.append("grape", String(grape));
      formData.append("stone", String(stone));
      formData.append("citrus", String(citrus));
      formData.append("tropical", String(tropical));
      formData.append("pepper", String(pepper));
      formData.append("bakingSpice", String(bakingSpice));
      formData.append("cinnamon", String(cinnamon));
      formData.append("herbal", String(herbal));
      formData.append("mint", String(mint));
      formData.append("coffee", String(coffee));
      formData.append("tobacco", String(tobacco));
      formData.append("leather", String(leather));
      formData.append("oak", String(oak));
      formData.append("toasted", String(toasted));
      formData.append("smokey", String(smokey));
      formData.append("peanut", String(peanut));
      formData.append("almond", String(almond));
      formData.append("pecan", String(pecan));
      formData.append("walnut", String(walnut));
      formData.append("oily", String(oily));
      formData.append("floral", String(floral));
      formData.append("corn", String(corn));
      formData.append("rye", String(rye));
      formData.append("wheat", String(wheat));
      formData.append("malt", String(malt));
      formData.append("dough", String(dough));
      formData.append("vanilla", String(vanilla));
      formData.append("caramel", String(caramel));
      formData.append("molasses", String(molasses));
      formData.append("butterscotch", String(butterscotch));
      formData.append("honey", String(honey));
      formData.append("chocolate", String(chocolate));
      formData.append("toffee", String());
      formData.append("sugar", String(sugar));
      formData.append("overallRating", String(overallRating));
      formData.append("value", String(value));

      const request = new Request(
        `http://localhost:3000/reviews/new/notes?id=${redisId}`,
        {
          method: "POST",
          headers: { cookie },
          body: formData,
        }
      );

      const response: Response = await noteAction({
        request,
        params: {},
        context: {},
      });

      expect(response.status).toBe(302);
      expect(response).toEqual(redirect(`/reviews/new/confirm?id=${redisId}`));
      expect(prisma.user.findUnique({ where: { id: user.id } })).not.toBeNull();
    });
  });
});
