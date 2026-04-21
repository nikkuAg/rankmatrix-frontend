import nextCoreWebVitals from 'eslint-config-next/core-web-vitals';
import unusedImports from 'eslint-plugin-unused-imports';

const eslintConfig = [
  {
    ignores: ['.next/**', 'node_modules/**', 'public/**', '.husky/**', 'next-env.d.ts'],
  },
  ...nextCoreWebVitals,
  {
    files: ['src/**/*.{js,jsx,mjs}'],
    plugins: {
      'unused-imports': unusedImports,
    },
    rules: {
      'unused-imports/no-unused-imports': 'warn',
      'unused-imports/no-unused-vars': [
        'warn',
        { vars: 'all', varsIgnorePattern: '^_', args: 'after-used', argsIgnorePattern: '^_' },
      ],
      // New strict rule in eslint-plugin-react-hooks v7 (pulled by Next 16).
      // Existing effects follow legitimate external-state-sync patterns; downgrade
      // to warn so it surfaces without blocking commits. Revisit with a targeted
      // refactor pass.
      'react-hooks/set-state-in-effect': 'warn',
    },
  },
];

export default eslintConfig;
