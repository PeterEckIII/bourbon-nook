import { PrismaClient } from "@prisma/client";
import bcrypt from "bcryptjs";

const prisma = new PrismaClient();

async function seed() {
  const email = "rachel@remix.run";
  const username = "rachelrox";
  // cleanup the existing database
  await prisma.user.delete({ where: { email } }).catch(() => {
    // no worries if it doesn't exist yet
  });

  const hashedPassword = await bcrypt.hash("racheliscool", 10);

  const user = await prisma.user.create({
    data: {
      email,
      username,
      password: {
        create: {
          hash: hashedPassword,
        },
      },
    },
  });

  const bottle1 = await prisma.bottle.create({
    data: {
      userId: user.id,
      name: "Stagg Jr",
      status: "OPENED",
      type: "Bourbon",
      distiller: "Buffalo Trace",
      producer: "Sazerac",
      country: "USA",
      region: "KY",
      price: "59.99",
      age: "NAS",
      alcoholPercent: "65",
      proof: "130",
      color: "Tawny",
      year: "2023",
      batch: "23A",
      barrel: "N/A",
      size: "750mL",
      finishing: "None",
      openDate: "8/25/2023",
      killDate: "N/A",
      imageUrl: "",
    },
  });

  await prisma.review.create({
    data: {
      userId: user.id,
      bottleId: bottle1.id,
      date: "",
      setting: "",
      glassware: "",
      restTime: "",
      nose: "",
      palate: "",
      finish: "",
      thoughts: "",
      pepper: 0,
      bakingSpice: 0,
      cinnamon: 0,
      herbal: 0,
      mint: 0,
      cherry: 0,
      strawberry: 0,
      raspberry: 0,
      blackberry: 0,
      blueberry: 0,
      apple: 0,
      banana: 0,
      grape: 0,
      stone: 0,
      citrus: 0,
      tropical: 0,
      coffee: 0,
      tobacco: 0,
      leather: 0,
      oak: 0,
      toasted: 0,
      smokey: 0,
      peanut: 0,
      almond: 0,
      pecan: 0,
      walnut: 0,
      oily: 0,
      floral: 0,
      corn: 0,
      rye: 0,
      wheat: 0,
      malt: 0,
      dough: 0,
      vanilla: 0,
      caramel: 0,
      molasses: 0,
      butterscotch: 0,
      honey: 0,
      chocolate: 0,
      toffee: 0,
      sugar: 0,
      value: 0,
      overallRating: 0,
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
