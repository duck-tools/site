import babel from 'rollup-plugin-babel';
import resolve from 'rollup-plugin-node-resolve';
import replace from 'rollup-plugin-replace';
import commonjs from 'rollup-plugin-commonjs';
import { uglify } from 'rollup-plugin-uglify';

let plugins = [
  babel(),
  resolve(),
  commonjs()
];

if (process.env.NODE_ENV === 'production') {
  plugins = [
    babel(),
    resolve(),
    replace({
      ['process.env.NODE_ENV']: JSON.stringify('production')
    }),
    commonjs(),
    uglify()
  ];
}

export default {
  input: 'src/server.js',
  output: {
    file: 'index.js',
    format: 'cjs'
  },
  external: [
    'express',
    'stream'
  ],
  plugins
}
