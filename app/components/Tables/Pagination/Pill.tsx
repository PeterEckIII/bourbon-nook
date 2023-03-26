type PillProps = {
  character: string;
  disabled: boolean;
  onClick: () => void;
};

export default function Pill({ character, disabled, onClick }: PillProps) {
  return (
    <li className="tracking-widget my-auto mx-1 box-border flex h-8 min-w-[32px] items-center rounded-2xl px-3 text-center text-lg leading-6 selection:bg-black selection:bg-opacity-10 hover:cursor-pointer hover:bg-black hover:bg-opacity-5">
      <button onClick={onClick} disabled={disabled}>
        {character}
      </button>
    </li>
  );
}
