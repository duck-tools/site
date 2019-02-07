module.exports = {
  presets: ['@babel/preset-react', ['@babel/preset-env', { modules: false }]],
  plugins: [
    process.env.USE_DEV && '@babel/plugin-transform-runtime',
    '@babel/plugin-syntax-dynamic-import',
    ['babel-plugin-styled-components', {
      displayName: false,
      ssr: false
    }],
  ].filter(Boolean)
};
