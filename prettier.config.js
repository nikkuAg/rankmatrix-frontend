module.exports = {
  semi: true,
  singleQuote: true,
  trailingComma: 'all',
  arrowParens: 'always',
  tabWidth: 2,
  printWidth: 100,
  endOfLine: 'lf',
  plugins: ['@ianvs/prettier-plugin-sort-imports'],
  importOrder: ['^react$', '<THIRD_PARTY_MODULES>', '^@/(.*)$', '^[./]'],
  importOrderParserPlugins: ['typescript', 'jsx', 'decorators-legacy', 'js'],
};
