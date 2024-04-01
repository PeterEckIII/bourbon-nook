import Select, { StylesConfig } from "react-select";

import { Options } from "~/types/options";

const options = [
  { value: "OPENED", label: "Opened" },
  { value: "FINISHED", label: "Finished" },
  { value: "CLOSED", label: "Closed" },
] satisfies Options;

const colorStyles: StylesConfig = {
  control: (styles) => ({ ...styles, width: "24rem" }),
};

export default function Status() {
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
        inputId="status"
      />
    </div>
  );
}
