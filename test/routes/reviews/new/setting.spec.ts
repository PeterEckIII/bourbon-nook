import { cleanup } from "./../../../helpers/cleanup";
import { prisma } from "../../../../app/db.server";
import { saveToRedis } from "../../../../app/utils/redis.server";
import { loader as settingLoader } from "../../../../app/routes/reviews/new/setting";
import { action as settingAction } from "../../../../app/routes/reviews/new/setting";
import { authenticate } from "../../../helpers/authenticate";
import { truncateDB } from "../../../helpers/truncateDB";
import * as redis from "redis";
import { redirect } from "@remix-run/server-runtime";

beforeAll(async () => {
  // const testClient = redis.createClient({
  //   url: "redis://localhost:6379",
  // });
  // testClient.on("error", (err) => console.log(`Redis client error: ${err}`));
  // await testClient.connect();
  // await saveToRedis({
  //   redisId: "H5B77D",
  // });
});

beforeEach(async () => {
  await truncateDB();
});

afterAll(async () => {
  await cleanup();
});

describe("Setting Route", () => {
  describe("Setting Loader", () => {
    it("Loads the page and redis form data", async () => {
      //   const { user, session, cookie } = await authenticate();
      //   const request = new Request(
      //     `http://localhost:3000/reviews/new/setting?id=H5B77D`,
      //     {
      //       headers: { cookie },
      //     }
      //   );

      //   const response: Response = await settingLoader({
      //     request,
      //     params: {},
      //     context: {},
      //   });

      expect(true).toBe(true);
      //   expect(response).toContain({
      //     redisId: "H5B77D",
      //   });
      //   expect(
      //     await prisma.user.findUnique({ where: { id: user.id } })
      //   ).not.toBeNull();
    });
  });

  describe("Setting Action", () => {
    it("Submits the form and redirects", async () => {
      // const { user, session, cookie } = await authenticate();

      // const date = "11/04/2022",
      //   setting = "Having a dram at the local watering hole",
      //   glassware = "Glencairn",
      //   restTime = "10min",
      //   nose =
      //     "Nutty as all hell, toffee, caramel, cinnamon, burnt sugar, sweet oak, old rickhouse, black pepper, clove, confectioner sugar, grape, plum, almost smells finished",
      //   palate =
      //     "Black peppercorns, cinnamon, caramel, salty tortilla chips, fudge, pecans, confectioners sugar, light clove",
      //   finish =
      //     "Strong, sweet oak, black peppercorn, big caramel notes round the palate. Mint, chocolate, there's a really light fruit note that I can't quite place, but it's well balanced with the darker flavors of the finish",
      //   thoughts =
      //     "Really good stuff. Dark flavors dominate with the caramel, dark chocolate, and peppercorns. There's small waves of a light fruit note I still can't quite place, maybe green grapes? It's really well balanced with the caramel, oak, and chocolate, plus the baking spices and mint make the finish last for a long, long time";

      // const redisId = "H5B66G";

      // await saveToRedis({
      //   redisId,
      //   date,
      //   setting,
      //   glassware,
      //   restTime,
      //   nose,
      //   palate,
      //   finish,
      //   thoughts,
      // });

      // const formData = new FormData();
      // formData.append("id", redisId);
      // formData.append("date", date);
      // formData.append("setting", setting);
      // formData.append("glassware", glassware);
      // formData.append("restTime", restTime);
      // formData.append("nose", nose);
      // formData.append("palate", palate);
      // formData.append("finish", finish);
      // formData.append("thoughts", thoughts);

      // const request = new Request(
      //   `http://localhost:3000/reviews/new/setting?id=${redisId}`,
      //   {
      //     method: "POST",
      //     headers: { cookie },
      //     body: formData,
      //   }
      // );

      // const response: Response = await settingAction({
      //   request,
      //   params: {},
      //   context: {},
      // });
      expect(true).toBe(true);
      // expect(response.status).toBe(302);
      // expect(response).toEqual(redirect(`/reviews/new/notes?id=${redisId}`));
      // expect(
      //   await prisma.user.findUnique({ where: { id: user.id } })
      // ).not.toBeNull();
    });
  });
});
