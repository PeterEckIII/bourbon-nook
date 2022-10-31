import { prisma } from "~/db.server";
import bcrypt from "bcryptjs";

async function seed() {
  const email = "rachel@remix.run";

  // cleanup the existing database
  await prisma.user.delete({ where: { email } }).catch(() => {
    // no worries if it doesn't exist yet
  });

  const hashedPassword = await bcrypt.hash("racheliscool", 10);

  const user = await prisma.user.create({
    data: {
      email,
      password: {
        create: {
          hash: hashedPassword,
        },
      },
    },
  });

  const eagleRare = await prisma.bottle.create({
    data: {
      name: "Eagle Rare",
      type: "Bourbon",
      distiller: "Buffalo Trace",
      bottler: "Buffalo Trace",
      producer: "Sazerac",
      year: "2022",
      batch: "N/A",
      country: "USA",
      region: "Kentucky",
      price: "34.99",
      age: "NAS",
      alcoholPercent: "45%",
      proof: "90",
      size: "750ml",
      color: "amber",
      finishing: "None",
    },
  });

  const staggJr16 = await prisma.bottle.create({
    data: {
      name: "Stagg Jr.",
      type: "Bourbon",
      distiller: "Buffalo Trace",
      bottler: "Buffalo Trace",
      producer: "Sazerac",
      year: "2021",
      batch: "16",
      country: "USA",
      region: "Kentucky",
      price: "59.99",
      age: "NAS",
      alcoholPercent: "65.45%",
      proof: "130.9",
      size: "750ml",
      color: "mahogany",
      finishing: "None",
    },
  });

  await prisma.review.create({
    data: {
      bottleId: eagleRare.id,
      date: "2022-03-30T19:47:18+00:00",
      setting: "N/A",
      glassware: "Glencairn",
      restTime: "20min",
      nose: "The nose is straightforward and to the point. The cherry and oak are well-balanced, though the cherry (and a hint of grape) do dominate.",
      palate:
        "The palate starts with rich cherry bordering on cherry cough syrup. There is a slight twinge of oak that comes up to meet it, but it is quickly washed away with more cherry, some grape, and light baking spice",
      finish:
        "Predictable, medium, more cherry, light bit of leather as it fades out",
      thoughts:
        "This bottle is alright at $34.99 or whatever it comes out to nowadays, but nowhere near my favorite sipper. I'll have a bottle around for guests. It also makes a damn good old fashioned.",
      pepper: 1,
      bakingSpice: 0,
      cinnamon: 3,
      herbal: 0,
      mint: 0,
      cherry: 1,
      strawberry: 5,
      raspberry: 2,
      blackberry: 2,
      blueberry: 1,
      apple: 3,
      banana: 0,
      grape: 0,
      stone: 0,
      citrus: 0,
      tropical: 4,
      coffee: 0,
      tobacco: 0,
      leather: 1,
      oak: 0,
      toasted: 0,
      smokey: 0,
      peanut: 4,
      almond: 0,
      pecan: 2,
      walnut: 0,
      oily: 1,
      floral: 0,
      corn: 3,
      rye: 1,
      wheat: 0,
      malt: 0,
      dough: 0,
      vanilla: 4,
      caramel: 3,
      molasses: 2,
      butterscotch: 2,
      honey: 3,
      chocolate: 1,
      toffee: 0,
      sugar: 3,
      value: 6.5,
      overallRating: 6.0,
      userId: user.id,
      imageId: "",
    },
  });

  await prisma.review.create({
    data: {
      bottleId: staggJr16.id,
      date: "2022-03-30T19:47:18+00:00",
      setting: "N/A",
      glassware: "Glencairn",
      restTime: "10min",
      nose: "Rich chocolate and cherry coke take front stage with crashes of proof, oak, and spices.",
      palate:
        "Exploding with flavor. This dram is really special. You get more chocolate and well-rounded cherry -- not like an Eagle Rare where it's ALL cherry, this is more like a dark cherry syrup from a jar of cocktail cherries. Mature oak reminds you of the age and the proof is really well balanced. Not nearly drinking at 130+ proof. ",
      finish:
        "Long, rich, rewarding. All of the flavor from the palate and nose come back but are joined by leather, tobacco, and deep rich oak.",
      thoughts:
        "Absolutely incredible. One of my all-time favorites and if you can find it at retail it's the best buy in bourbon not named BTAC / Pappy.",
      pepper: 1,
      bakingSpice: 0,
      cinnamon: 3,
      herbal: 0,
      mint: 0,
      cherry: 1,
      strawberry: 5,
      raspberry: 2,
      blackberry: 2,
      blueberry: 1,
      apple: 3,
      banana: 0,
      grape: 0,
      stone: 0,
      citrus: 0,
      tropical: 4,
      coffee: 0,
      tobacco: 0,
      leather: 1,
      oak: 0,
      toasted: 0,
      smokey: 0,
      peanut: 4,
      almond: 0,
      pecan: 2,
      walnut: 0,
      oily: 1,
      floral: 0,
      corn: 3,
      rye: 1,
      wheat: 0,
      malt: 0,
      dough: 0,
      vanilla: 4,
      caramel: 3,
      molasses: 2,
      butterscotch: 2,
      honey: 3,
      chocolate: 1,
      toffee: 0,
      sugar: 3,
      overallRating: 9.5,
      value: 10.0,
      userId: user.id,
      imageId: "",
    },
  });

  console.log(`Database has been seeded. 🌱`);
}

seed()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
