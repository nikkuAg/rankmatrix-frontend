module.exports = {
  semi: true,
  singleQuote: false,
  trailingComma: "all",
  arrowParens: "always",
  tabWidth: 2,
  printWidth: 100,
  endOfLine: "lf",
  plugins: ["@trivago/prettier-plugin-sort-imports", "@ianvs/prettier-plugin-sort-imports"],
  importOrder: ["^react$", "<THIRD_PARTY_MODULES>", "^@/(.*)$", "^[./]"],
  importOrderSeparation: false,
  importOrderSortSpecifiers: true,
  importOrderParserPlugins: ["typescript", "jsx", "decorators-legacy"],
};
