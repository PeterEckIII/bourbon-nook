import type { StorybookConfig } from "@storybook/react-vite";
import { mergeConfig, mergeAlias } from "vite";

const config: StorybookConfig = {
  stories: [
    "../stories/**/*.mdx",
    "../stories/**/*.stories.@(js|jsx|mjs|ts|tsx)",
    "../app/components/**/*.stories.@(js|jsx|ts|tsx|mjs)",
  ],
  addons: [
    "@storybook/addon-links",
    "@storybook/addon-essentials",
    "@storybook/addon-onboarding",
    "@storybook/addon-interactions",
    "@storybook/addon-a11y",
    "@storybook/addon-actions",
  ],
  core: {},
  framework: {
    name: "@storybook/react-vite",
    options: {
      builder: {
        viteConfigPath: "./.storybook/sbvite.config.ts",
      },
    },
  },
  docs: {
    autodocs: "tag",
  },
  async viteFinal(config) {
    return mergeConfig(config, {
      ...config,
      resolve: {
        ...config.resolve,
        alias: [{ find: "~", replacement: "/app" }],
      },
    });
  },
};
export default config;
