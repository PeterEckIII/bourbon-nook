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
          alcoholPercent: "45",
          proof: "90",
          size: "750ml",
          color: "amber",
          finishing: "None",
          imageUrl:
            "https://res.cloudinary.com/jpeckiii/image/upload/v1668743312/clahlht3g0000sf231dyv0f7r/d71140d4-8639-4173-b690-122530797824.webp",
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
          alcoholPercent: "65.45",
          proof: "130.9",
          size: "750ml",
          color: "mahogany",
          finishing: "None",
          imageUrl:
            "https://res.cloudinary.com/jpeckiii/image/upload/v1678149824/clevzhhez0000sfndp9eor398/b38f50bf-e3c0-4b47-b7a1-90d5ff6fb778.jpg",
        },
      });

      const ecbp = await prisma.bottle.create({
        data: {
          userId: user.id,
          status: "CLOSED",
          name: "Elijah Craig Barrel Proof",
          type: "Bourbon",
          distiller: "Elijah Craig",
          producer: "Heaven Hill",
          year: "2023",
          batch: "A123",
          country: "USA",
          region: "Kentucky",
          price: "59.99",
          age: "12yrs",
          alcoholPercent: "62.4",
          proof: "124.8",
          size: "750ml",
          color: "amber",
          finishing: "None",
          imageUrl:
            "https://res.cloudinary.com/jpeckiii/image/upload/v1664471428/cl8na0low00023qsfam5t4qo6/984fc771-9443-4852-a8f0-c92eaff1c30b_dfpprc_qasmv7.jpg",
        },
      });

      const obsk = await prisma.bottle.create({
        data: {
          userId: user.id,
          status: "CLOSED",
          name: "Four Roses SiB BS OBSK",
          type: "Bourbon",
          distiller: "Four Roses",
          producer: "Four Roses",
          year: "2021",
          batch: "Total Wine",
          country: "USA",
          region: "Kentucky",
          price: "89.99",
          age: "10yrs 5mos",
          alcoholPercent: "58.5",
          proof: "119",
          size: "750ml",
          color: "tawny",
          finishing: "None",
          imageUrl:
            "https://res.cloudinary.com/jpeckiii/image/upload/v1664476026/cl8na0low00023qsfam5t4qo6/e2677873-c4f8-4a06-8f65-0e9ef43ee470_xt4imy_o24fpy.jpg",
        },
      });

      const mm46cs = await prisma.bottle.create({
        data: {
          userId: user.id,
          status: "FINISHED",
          name: "Maker's Mark 46 Cask Strength",
          type: "Bourbon",
          distiller: "Maker's Mark",
          producer: "Maker's Mark",
          year: "2021",
          batch: "N/A",
          country: "USA",
          region: "Kentucky",
          price: "64.99",
          age: "NAS",
          alcoholPercent: "55.15",
          proof: "110.3",
          size: "750ml",
          color: "brick",
          finishing: "None",
          imageUrl:
            "https://res.cloudinary.com/jpeckiii/image/upload/v1664471449/cl8na0low00023qsfam5t4qo6/18ba680b-404d-4904-af9a-d6e9c53194a3_wuryjx.jpg",
        },
      });

      const stellumRye = await prisma.bottle.create({
        data: {
          userId: user.id,
          status: "FINISHED",
          name: "Stellum Rye",
          type: "Rye",
          distiller: "Barrell Craft Spirits",
          producer: "Barrell Craft Spirits",
          year: "2022",
          batch: "N/A",
          country: "USA",
          region: "Kentucky",
          price: "55.99",
          age: "NAS",
          alcoholPercent: "58.1",
          proof: "116.2",
          size: "750ml",
          color: "gold",
          finishing: "None",
          imageUrl:
            "https://res.cloudinary.com/jpeckiii/image/upload/v1664471449/cl8na0low00023qsfam5t4qo6/382cc406-9ea3-4c49-9b9b-d4e3cdc9bc90_mvc8ue.jpg",
        },
      });

      const wfpsp = await prisma.bottle.create({
        data: {
          userId: user.id,
          status: "FINISHED",
          name: "Weller Full Proof SP",
          type: "Bourbon",
          distiller: "Buffalo Trace",
          producer: "Sazerac",
          year: "2021",
          batch: "Woodman's",
          country: "USA",
          region: "Kentucky",
          price: "49.99",
          age: "NAS",
          alcoholPercent: "57.5",
          proof: "115",
          size: "750ml",
          color: "brick",
          finishing: "None",
          imageUrl:
            "https://res.cloudinary.com/jpeckiii/image/upload/v1664471441/cl8na0low00023qsfam5t4qo6/79aed275-dcf8-4dc3-94c7-6f1a75cc5e5f_aaklcr_vtx3bd.jpg",
        },
      });

      const rrsp = await prisma.bottle.create({
        data: {
          userId: user.id,
          status: "FINISHED",
          name: "Russell's Reserve SP",
          type: "Bourbon",
          distiller: "Wild Turkey",
          producer: "Wild Turkey",
          year: "2021",
          batch: "Binny's",
          country: "USA",
          region: "Kentucky",
          price: "59.99",
          age: "8yrs 8mos",
          alcoholPercent: "55",
          proof: "110",
          size: "750ml",
          color: "marmalade",
          finishing: "None",
          imageUrl:
            "https://res.cloudinary.com/jpeckiii/image/upload/v1664471438/cl8na0low00023qsfam5t4qo6/22b4a87b-553f-4a4e-ba7f-230ca3301c76_xsvbzi_ksi1rv.jpg",
        },
      });

      const wlw = await prisma.bottle.create({
        data: {
          userId: user.id,
          status: "OPENED",
          name: "William Larue Weller",
          type: "Bourbon",
          distiller: "Buffalo Trace",
          producer: "Sazerac",
          year: "2021",
          batch: "N/A",
          country: "USA",
          region: "Kentucky",
          price: "129.99",
          age: "12yrs 6mos",
          alcoholPercent: "62.65",
          proof: "125.3",
          size: "750ml",
          color: "amber",
          finishing: "None",
          imageUrl:
            "https://res.cloudinary.com/jpeckiii/image/upload/v1664471435/cl8na0low00023qsfam5t4qo6/63974685-2faf-4093-aa1c-504fa7c1f6c1_alwtzx_oj0giu.jpg",
        },
      });

      const btsp = await prisma.bottle.create({
        data: {
          userId: user.id,
          status: "OPENED",
          name: "Buffalo Trace Binny's SP",
          type: "Bourbon",
          distiller: "Buffalo Trace",
          producer: "Sazerac",
          year: "2022",
          batch: "Batch #30",
          country: "USA",
          region: "Kentucky",
          price: "44.99",
          age: "NAS",
          alcoholPercent: "45",
          proof: "90",
          size: "1.75L",
          color: "brick",
          finishing: "None",
          imageUrl:
            "https://res.cloudinary.com/jpeckiii/image/upload/v1658702345/cl2bz78pk0019i8ibabnf3zl4/6629fff0-695f-4f8a-b87c-a816043bd493.jpg",
        },
      });

      const seagrass = await prisma.bottle.create({
        data: {
          userId: user.id,
          status: "FINISHED",
          name: "Barrell Seagrass",
          type: "Rye",
          distiller: "Barrell Craft Spirits",
          producer: "Barrell Craft Spirits",
          year: "2022",
          batch: "3",
          country: "USA",
          region: "Kentucky",
          price: "89.99",
          age: "NAS",
          alcoholPercent: "59.92",
          proof: "119.54",
          size: "750ml",
          color: "tawny",
          finishing: "Rum, Madeira, Apricot Brandy",
          imageUrl:
            "https://res.cloudinary.com/jpeckiii/image/upload/v1662765092/cl2bz78pk0019i8ibabnf3zl4/134ed546-b235-445d-868c-657f9a0dfc61.jpg",
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

        const review3 = await prisma.review.create({
          data: {
            bottleId: ecbp.id,
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

        const review4 = await prisma.review.create({
          data: {
            bottleId: obsk.id,
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

        const review5 = await prisma.review.create({
          data: {
            bottleId: mm46cs.id,
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

        const review6 = await prisma.review.create({
          data: {
            bottleId: stellumRye.id,
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

        const review7 = await prisma.review.create({
          data: {
            bottleId: wfpsp.id,
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

        const review8 = await prisma.review.create({
          data: {
            bottleId: rrsp.id,
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

        const review9 = await prisma.review.create({
          data: {
            bottleId: wlw.id,
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

        const review10 = await prisma.review.create({
          data: {
            bottleId: btsp.id,
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

        const review11 = await prisma.review.create({
          data: {
            bottleId: seagrass.id,
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
