const path = require("path");

module.exports = function override(config) {
  config.resolve.alias = {
    ...config.resolve.alias,
    "@": path.resolve(__dirname, "src"),
    "@components": path.resolve(__dirname, "src/components"),
    "@utils": path.resolve(__dirname, "src/utils"),
    "@types": path.resolve(__dirname, "src/types"),
    "@mock-data": path.resolve(__dirname, "src/mock-data"),
    "@modules": path.resolve(__dirname, "src/modules"),
    "@pages": path.resolve(__dirname, "src/pages"),
    "@contexts": path.resolve(__dirname, "src/contexts"),
  };
  return config;
};
