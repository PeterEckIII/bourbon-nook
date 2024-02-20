import Select, { StylesConfig } from "react-select";

import { Options } from "~/types/options";

interface StatusProps {
  options: Options;
}

const colorStyles: StylesConfig = {
  control: (styles) => ({ ...styles, width: "24rem" }),
};

export default function Status({ options }: StatusProps) {
  return (
    <div className="mt-2">
      <label
        htmlFor="status"
        className="font-semibold text-lg text-gray-600 block mt-2"
      >
        Status
      </label>
      <Select
        styles={colorStyles}
        className="my-2"
        options={options}
        defaultValue={options[0]}
        isClearable={false}
        isSearchable={true}
        name="status"
        id="status"
      />
    </div>
  );
}
