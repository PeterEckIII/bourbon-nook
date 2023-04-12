type CaptionProps = {
  caption: string;
  info: string;
};

export default function Caption({ caption, info }: CaptionProps) {
  return (
    <caption className="sr-only table-caption">
      {caption}
      <br />
      <span>{info}</span>
    </caption>
  );
}
