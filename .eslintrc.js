module.exports = {
  root: true,
  extends: '@react-native',
  rules: {
    '@typescript-eslint/no-restricted-imports': [
      'error',
      {
        name: 'react-redux',
        importNames: ['useSelector', 'useDispatch'],
        message:
          'Use typed hooks `useAppDispatch` and `useAppSelector` instead.',
      },
    ],
  },
};
