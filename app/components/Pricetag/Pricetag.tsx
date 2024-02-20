interface PricetagProps {
  price: string | null;
}

export default function Pricetag({ price }: PricetagProps) {
  return <div className="price-tag">${price}</div>;
}
