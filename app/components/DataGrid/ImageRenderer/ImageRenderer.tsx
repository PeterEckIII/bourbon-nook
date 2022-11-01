import Spinner from "~/components/Icons/Spinner";

export default function ImageRenderer(props: any) {
  return (
    <div className="flex items-center justify-center">
      {props.value === undefined ? (
        <Spinner />
      ) : (
        <div className="flex">
          <div className="hidden h-[50px] w-[50px] md:block">
            <img
              src={props.value.imageUrl}
              alt={`Bottle of ${props.value.name}`}
              height={50}
              width={50}
            />
          </div>
          <div className="break-words md:ml-4">
            <p className="break-words font-medium">{props.value.name}</p>
          </div>
        </div>
      )}
    </div>
  );
}
