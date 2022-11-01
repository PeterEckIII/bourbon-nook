import { useState } from "react";
import { Tab } from "@headlessui/react";

interface NoteTabsProps {
  fruit: {
    cherry: number;
    strawberry: number;
    raspberry: number;
    blackberry: number;
    blueberry: number;
    apple: number;
    banana: number;
    grape: number;
    stone: number;
    citrus: number;
    tropical: number;
  };
  spice: {
    pepper: number;
    bakingSpice: number;
    cinnamon: number;
    herbal: number;
    mint: number;
  };
  earthy: {
    coffee: number;
    tobacco: number;
    leather: number;
    oak: number;
    toasted: number;
    smokey: number;
    peanut: number;
    almond: number;
    pecan: number;
    walnut: number;
    oily: number;
    floral: number;
  };
  grain: {
    corn: number;
    rye: number;
    wheat: number;
    malt: number;
    dough: number;
  };
  sweet: {
    vanilla: number;
    caramel: number;
    molasses: number;
    butterscotch: number;
    honey: number;
    chocolate: number;
    toffee: number;
    sugar: number;
  };
  rating: {
    value: number;
    overallRating: number;
  };
}

function classNames(...classes: string[]) {
  return classes.filter(Boolean).join(" ");
}

export default function NoteTabs({
  fruit,
  spice,
  sweet,
  earthy,
  grain,
  rating,
}: NoteTabsProps) {
  let [categories] = useState({
    Fruit: [
      {
        id: 1,
        title: "Cherry",
        value: fruit.cherry,
      },
      {
        id: 2,
        title: "Strawberry",
        value: fruit.strawberry,
      },
      {
        id: 3,
        title: "Raspberry",
        value: fruit.raspberry,
      },
      {
        id: 4,
        title: "Blackberry",
        value: fruit.blackberry,
      },
      {
        id: 5,
        title: "Blueberry",
        value: fruit.blueberry,
      },
      {
        id: 6,
        title: "Apple",
        value: fruit.apple,
      },
      {
        id: 7,
        title: "Banana",
        value: fruit.banana,
      },
      {
        id: 8,
        title: "Grape",
        value: fruit.grape,
      },
      {
        id: 9,
        title: "Stone",
        value: fruit.stone,
      },
      {
        id: 10,
        title: "Citrus",
        value: fruit.citrus,
      },
      {
        id: 11,
        title: "Tropical",
        value: fruit.tropical,
      },
    ],
    Spice: [
      {
        id: 1,
        title: "Pepper",
        value: spice.pepper,
      },
      {
        id: 2,
        title: "Baking Spice",
        value: spice.bakingSpice,
      },
      {
        id: 3,
        title: "Cinnamon",
        value: spice.cinnamon,
      },
      {
        id: 4,
        title: "Herbal",
        value: spice.herbal,
      },
      {
        id: 5,
        title: "Mint",
        value: spice.mint,
      },
    ],
    Sweet: [
      {
        id: 1,
        title: "Vanilla",
        value: sweet.vanilla,
      },
      {
        id: 2,
        title: "Caramel",
        value: sweet.caramel,
      },
      {
        id: 3,
        title: "Molasses",
        value: sweet.molasses,
      },
      {
        id: 4,
        title: "Butterscotch",
        value: sweet.butterscotch,
      },
      {
        id: 5,
        title: "Honey",
        value: sweet.honey,
      },
      {
        id: 6,
        title: "Chocolate",
        value: sweet.chocolate,
      },
      {
        id: 7,
        title: "Toffee",
        value: sweet.toffee,
      },
      {
        id: 8,
        title: "Powdered Sugar",
        value: sweet.sugar,
      },
    ],
    Earthy: [
      {
        id: 1,
        title: "Coffee",
        value: earthy.coffee,
      },
      {
        id: 2,
        title: "Tobacco",
        value: earthy.tobacco,
      },
      {
        id: 3,
        title: "Leather",
        value: earthy.leather,
      },
      {
        id: 4,
        title: "Oak",
        value: earthy.oak,
      },
      {
        id: 5,
        title: "Toasted",
        value: earthy.toasted,
      },
      {
        id: 6,
        title: "Smokey",
        value: earthy.smokey,
      },
      {
        id: 7,
        title: "Peanut",
        value: earthy.peanut,
      },
      {
        id: 8,
        title: "Almond",
        value: earthy.almond,
      },
      {
        id: 9,
        title: "Pecan",
        value: earthy.pecan,
      },
      {
        id: 10,
        title: "Walnut",
        value: earthy.walnut,
      },
      {
        id: 11,
        title: "Oily",
        value: earthy.oily,
      },
      {
        id: 12,
        title: "Floral",
        value: earthy.floral,
      },
    ],
    Grain: [
      {
        id: 1,
        title: "Corn",
        value: grain.corn,
      },
      {
        id: 2,
        title: "Rye",
        value: grain.rye,
      },
      {
        id: 3,
        title: "Wheat",
        value: grain.wheat,
      },
      {
        id: 4,
        title: "Malt",
        value: grain.malt,
      },
      {
        id: 5,
        title: "Dough",
        value: grain.dough,
      },
    ],
    Rating: [
      {
        id: 1,
        title: "Value for Money",
        value: rating.value,
      },
      {
        id: 2,
        title: "Overall Rating",
        value: rating.overallRating,
      },
    ],
  });

  return (
    <div className="w-full max-w-md rounded-md px-2 py-4 sm:px-0">
      <Tab.Group>
        <Tab.List className="flex space-x-1 rounded-xl bg-blue-900/20 p-1">
          {Object.keys(categories).map((category) => (
            <Tab
              key={category}
              className={({ selected }) =>
                classNames(
                  "font-small w-full rounded-lg py-2.5 text-sm leading-5 text-blue-700",
                  "ring-opacity-60, ring-white ring-offset-blue-400 focus:outline-none focus:ring-2",
                  selected
                    ? "bg-white-shadow"
                    : "text-blue-100 hover:bg-white/[0.12] hover:text-white"
                )
              }
            >
              {category}
            </Tab>
          ))}
        </Tab.List>
        <Tab.Panels className="mt-2">
          {Object.values(categories).map((notes, idx) => (
            <Tab.Panel
              key={idx}
              className={classNames(
                "rounded-xl bg-white p-3",
                "ring-white ring-opacity-60 ring-offset-2 ring-offset-blue-400 focus:outline-none focus:ring-2"
              )}
            >
              <ul>
                {notes.map((note) => (
                  <li
                    key={note.id}
                    className="relative rounded-md p-3 hover:bg-gray-100"
                  >
                    <h3 className="text-sm font-medium leading-5">
                      {note.title}
                    </h3>
                    <ul className="mt-1 flex space-x-1 text-xs font-normal leading-4 text-gray-500">
                      <li>{note.value}</li>
                    </ul>
                  </li>
                ))}
              </ul>
            </Tab.Panel>
          ))}
        </Tab.Panels>
      </Tab.Group>
    </div>
  );
}
