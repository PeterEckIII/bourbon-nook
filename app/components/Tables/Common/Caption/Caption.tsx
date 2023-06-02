type CaptionProps = {
  caption: string;
  info: string;
  ableToBeTabbedTo?: boolean;
};

export default function Caption({
  caption,
  info,
  ableToBeTabbedTo,
}: CaptionProps) {
  return (
    <caption className="sr-only table-caption" id="caption">
      {caption}
      {ableToBeTabbedTo && (
        <div>
          <small>(scroll to see more)</small>
        </div>
      )}
      <br />
      <span>{info}</span>
    </caption>
  );
}
