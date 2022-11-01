import NoteField from "../NoteField";
import NoteGroup from "../NoteGroup";
interface NotesDetailsProps {
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

export default function NotesDetails({
  fruit,
  spice,
  earthy,
  grain,
  sweet,
  rating,
}: NotesDetailsProps) {
  return (
    <div className="flex justify-between">
      <NoteGroup labelName="Fruit">
        <NoteField labelName="Cherry" value={fruit.cherry} />
        <NoteField labelName="Strawberry" value={fruit.strawberry} />
        <NoteField labelName="Raspberry" value={fruit.raspberry} />
        <NoteField labelName="Blackberry" value={fruit.blackberry} />
        <NoteField labelName="Blueberry" value={fruit.blueberry} />
        <NoteField labelName="Apple" value={fruit.apple} />
        <NoteField labelName="Banana" value={fruit.banana} />
        <NoteField labelName="Grape" value={fruit.grape} />
        <NoteField labelName="Stone Fruit" value={fruit.stone} />
        <NoteField labelName="Citrus" value={fruit.citrus} />
        <NoteField labelName="Tropical" value={fruit.tropical} />
      </NoteGroup>
      <NoteGroup labelName="Spice">
        <NoteField labelName="Black Pepper" value={spice.pepper} />
        <NoteField labelName="Baking Spice" value={spice.bakingSpice} />
        <NoteField labelName="Cinnamon" value={spice.cinnamon} />
        <NoteField labelName="Herbal" value={spice.herbal} />
        <NoteField labelName="Mint" value={spice.mint} />
      </NoteGroup>
      <NoteGroup labelName="Sweet">
        <NoteField labelName="Vanilla" value={sweet.vanilla} />
        <NoteField labelName="Caramel" value={sweet.caramel} />
        <NoteField labelName="Molasses" value={sweet.molasses} />
        <NoteField labelName="Butterscotch" value={sweet.butterscotch} />
        <NoteField labelName="Honey" value={sweet.honey} />
        <NoteField labelName="Chocolate" value={sweet.chocolate} />
        <NoteField labelName="Toffee" value={sweet.toffee} />
        <NoteField labelName="Sugar" value={sweet.sugar} />
      </NoteGroup>
      <NoteGroup labelName="Earthy">
        <NoteField labelName="Coffee" value={earthy.coffee} />
        <NoteField labelName="Tobacco" value={earthy.tobacco} />
        <NoteField labelName="Leather" value={earthy.leather} />
        <NoteField labelName="Oak" value={earthy.oak} />
        <NoteField labelName="Toasted" value={earthy.toasted} />
        <NoteField labelName="Smokey" value={earthy.smokey} />
        <NoteField labelName="Peanut" value={earthy.peanut} />
        <NoteField labelName="Almond" value={earthy.almond} />
        <NoteField labelName="Pecan" value={earthy.pecan} />
        <NoteField labelName="Walnut" value={earthy.walnut} />
        <NoteField labelName="Floral" value={earthy.floral} />
        <NoteField labelName="Oily" value={earthy.oily} />
      </NoteGroup>
      <NoteGroup labelName="Grain">
        <NoteField labelName="Corn" value={grain.corn} />
        <NoteField labelName="Rye" value={grain.rye} />
        <NoteField labelName="Wheat" value={grain.wheat} />
        <NoteField labelName="Malt" value={grain.malt} />
        <NoteField labelName="Dough" value={grain.dough} />
      </NoteGroup>
      <NoteGroup labelName="Rating">
        <NoteField labelName="Value for Money" value={rating.value} />
        <NoteField labelName="Overall Rating" value={rating.overallRating} />
      </NoteGroup>
    </div>
  );
}
