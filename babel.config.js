/* eslint-env node */
module.exports = {
  presets: [
    '@quasar/babel-preset-app',
    ['@babel/preset-env', { 'modules': 'auto' }],
    '@babel/preset-typescript'
  ],
  plugins: [
    ['@babel/plugin-proposal-class-properties'],
    [
      'babel-plugin-rewrite-require',
      {
        aliases: {
          net: 'net-browserify',
          tls: 'tls-browserify',
        },
      },
    ],
  ]
}
