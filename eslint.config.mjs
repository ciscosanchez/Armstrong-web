import { dirname } from 'path';
import { fileURLToPath } from 'url';
import coreWebVitals from 'eslint-config-next/core-web-vitals';
import typescript from 'eslint-config-next/typescript';

const __dirname = dirname(fileURLToPath(import.meta.url));

const eslintConfig = [
  // Ignore build output and generated files
  {
    ignores: ['.next/**', 'node_modules/**', 'out/**', 'build/**'],
  },

  ...coreWebVitals,
  ...typescript,

  {
    // Enable typed linting so rules like no-floating-promises can access type info
    files: ['**/*.ts', '**/*.tsx'],
    languageOptions: {
      parserOptions: {
        project: './tsconfig.json',
        tsconfigRootDir: __dirname,
      },
    },
    rules: {
      // No file over 500 lines
      'max-lines': ['error', { max: 500, skipComments: true, skipBlankLines: true }],

      // TypeScript strictness
      '@typescript-eslint/no-explicit-any': 'error',
      '@typescript-eslint/no-unused-vars': ['error', { argsIgnorePattern: '^_' }],
      '@typescript-eslint/consistent-type-imports': ['error', { prefer: 'type-imports' }],
      '@typescript-eslint/no-floating-promises': 'error',

      // React
      'react/self-closing-comp': 'error',
      'react-hooks/exhaustive-deps': 'error',

      // No raw console (use structured logging)
      'no-console': ['warn', { allow: ['warn', 'error'] }],

      // No default exports except for Next.js pages and API routes
      // (Next.js requires default exports for pages — allow in app/ dir)
      'import/prefer-default-export': 'off',

      // React Compiler purity rules produce false positives for valid patterns
      // (setState in useEffect, Date.now in server components)
      'react-hooks/purity': 'off',
      'react-hooks/set-state-in-effect': 'off',
    },
  },

  {
    // Test files get relaxed rules
    files: ['tests/**/*.ts', 'tests/**/*.tsx'],
    rules: {
      'max-lines': 'off',
      '@typescript-eslint/no-floating-promises': 'off',
    },
  },

  {
    // Next.js config files
    files: ['next.config.ts', 'tailwind.config.ts', 'eslint.config.mjs'],
    rules: {
      '@typescript-eslint/no-require-imports': 'off',
    },
  },
];

export default eslintConfig;
