import lint from '@tanzerfe/eslint-config-lint';

export default [
  {
    ignores: ['.turbo/**', 'dist/**', 'mock/dist/**', 'public/**', 'node_modules/**', 'components.d.ts', 'src/lib/**'],
  },
  ...lint,
];
