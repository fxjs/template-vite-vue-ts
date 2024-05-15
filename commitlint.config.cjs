const ERROR = 2;
const WARNING = 1;

module.exports = {
  extends: ['@commitlint/config-angular'],
  rules: {
    'type-enum': [
      ERROR,
      'always',
      [
        'feat',
        'fix',
        'perf',
        'style',
        'revert',
        'refactor',
        'wip',
        'chore',
        'docs',
        'test',
        'types',
        'ci',
        'build',
        'deploy',
        'workflow',
      ],
    ],
    'header-max-length': [0, 'always', 144],
  },
};
