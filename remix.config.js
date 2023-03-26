/**
 * @type {import('@remix-run/dev').AppConfig}
 */
module.exports = {
  cacheDirectory: "./node_modules/.cache/remix",
  ignoredRouteFiles: ["**/.*", "**/*.css", "**/*.test.{js,jsx,ts,tsx}"],
  serverDependenciesToBundle: [
    "@table-library/react-table-library",
    "@table-library/react-table-library/theme",
    "@table-library/react-table-library/pagination",
    "@table-library/react-table-library/compact",
    "@table-library/react-table-library/sort",
    "@table-library/react-table-library/baseline",
  ],
};
