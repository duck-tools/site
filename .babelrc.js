module.exports = {
  presets: ['@babel/preset-react', ['@babel/preset-env', { modules: false }]],
  plugins: [ '@babel/plugin-syntax-dynamic-import', ['babel-plugin-styled-components', {
    displayName: false
  }]]
};
