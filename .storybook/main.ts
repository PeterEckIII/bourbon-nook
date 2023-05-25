import type { StorybookConfig } from "@storybook/react-vite";
import path from "path";

const config: StorybookConfig = {
  stories: ["../app/components/**/*.stories.@(js|ts|jsx|tsx)"],
  addons: [
    "@storybook/addon-links",
    "@storybook/addon-essentials",
    "@storybook/addon-interactions",
    "@storybook/addon-actions",
    "@storybook/addon-styling",
    "@storybook/addon-console",
  ],
  framework: {
    name: "@storybook/react-vite",
    options: {},
  },
  docs: {
    autodocs: "tag",
  },
  viteFinal: async (config) => {
    return {
      ...config,
      define: {
        "process.env": process.env,
      },
      resolve: {
        alias: [
          {
            find: "~",
            replacement: path.resolve(__dirname, "../app"),
          },
        ],
      },
    };
  },
};
export default config;
