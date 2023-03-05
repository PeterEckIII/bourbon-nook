import { prisma } from "~/db.server";
import bcrypt from "bcryptjs";

async function seed() {
  const email = "rachel@remix.run";
  const email2 = "john@remix.run";

  const account1 = await prisma.user.findFirst({ where: { email } });
  const account2 = await prisma.user.findFirst({ where: { email: email2 } });
  if (account1) {
    await prisma.user.delete({
      where: {
        email: email,
      },
    });
  }

  if (account2) {
    await prisma.user.delete({
      where: {
        email: email2,
      },
    });
  }

  const hashedPassword = await bcrypt.hash("racheliscool", 10);

  const hashedPassword2 = await bcrypt.hash("peteriscool", 10);

  try {
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

    const user2 = await prisma.user.create({
      data: {
        email: email2,
        password: {
          create: {
            hash: hashedPassword2,
          },
        },
      },
    });

    try {
      const eagleRare = await prisma.bottle.create({
        data: {
          userId: user.id,
          status: "OPENED",
          name: "Eagle Rare",
          type: "Bourbon",
          distiller: "Buffalo Trace",
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
          imageUrl: "",
        },
      });

      const staggJr16 = await prisma.bottle.create({
        data: {
          userId: user.id,
          status: "OPENED",
          name: "Stagg Jr.",
          type: "Bourbon",
          distiller: "Buffalo Trace",
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
          imageUrl: "",
        },
      });

      try {
        const review1 = await prisma.review.create({
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
            pepper: 1.0,
            bakingSpice: 0.0,
            cinnamon: 3.0,
            herbal: 0.0,
            mint: 0.0,
            cherry: 1.0,
            strawberry: 5.0,
            raspberry: 2.0,
            blackberry: 2.0,
            blueberry: 1.0,
            apple: 3.0,
            banana: 0.0,
            grape: 0.0,
            stone: 0.0,
            citrus: 0.0,
            tropical: 4.0,
            coffee: 0.0,
            tobacco: 0.0,
            leather: 1.0,
            oak: 0.0,
            toasted: 0.0,
            smokey: 0.0,
            peanut: 4.0,
            almond: 0.0,
            pecan: 2.0,
            walnut: 0.0,
            oily: 1.0,
            floral: 0.0,
            corn: 3.0,
            rye: 1.0,
            wheat: 0.0,
            malt: 0.0,
            dough: 0.0,
            vanilla: 4.0,
            caramel: 3.0,
            molasses: 2.0,
            butterscotch: 2.0,
            honey: 3.0,
            chocolate: 1.0,
            toffee: 0.0,
            sugar: 3.0,
            value: 6.5,
            overallRating: 6.0,
            userId: user.id,
          },
        });

        const review2 = await prisma.review.create({
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
            pepper: 1.0,
            bakingSpice: 0.0,
            cinnamon: 3.0,
            herbal: 0.0,
            mint: 0.0,
            cherry: 1.0,
            strawberry: 5.0,
            raspberry: 2.0,
            blackberry: 2.0,
            blueberry: 1.0,
            apple: 3.0,
            banana: 0.0,
            grape: 0.0,
            stone: 0.0,
            citrus: 0.0,
            tropical: 4.0,
            coffee: 0.0,
            tobacco: 0.0,
            leather: 1.0,
            oak: 0.0,
            toasted: 0.0,
            smokey: 0.0,
            peanut: 4.0,
            almond: 0.0,
            pecan: 2.0,
            walnut: 0.0,
            oily: 1.0,
            floral: 0.0,
            corn: 3.0,
            rye: 1.0,
            wheat: 0.0,
            malt: 0.0,
            dough: 0.0,
            vanilla: 4.0,
            caramel: 3.0,
            molasses: 2.0,
            butterscotch: 2.0,
            honey: 3.0,
            chocolate: 1.0,
            toffee: 0.0,
            sugar: 3.0,
            value: 6.5,
            overallRating: 6.0,
            userId: user.id,
          },
        });

        try {
          const comment1 = await prisma.comment.create({
            data: {
              body: "Root comment",
              reviewId: review1.id,
              userId: user.id,
            },
          });

          await prisma.comment.create({
            data: {
              parentId: comment1.id,
              body: "Child comment",
              reviewId: review1.id,
              userId: user2.id,
            },
          });

          await prisma.comment.create({
            data: {
              body: "Awesome!",
              reviewId: review2.id,
              userId: user2.id,
            },
          });

          console.log(`Database has been seeded. 🌱`);
        } catch (error) {
          console.log(`Error creating comments: ${error}`);
        }
      } catch (error) {
        console.log(`Error creating reviews: ${error}`);
      }
    } catch (error) {
      console.log(`Error creating bottles: ${error}`);
    }
  } catch (error) {
    console.log(`Error creating user: ${error}`);
  }
}

seed()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
