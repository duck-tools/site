import babel from 'rollup-plugin-babel';
import resolve from 'rollup-plugin-node-resolve';
import replace from 'rollup-plugin-replace';
import commonjs from 'rollup-plugin-commonjs';
import { uglify } from 'rollup-plugin-uglify';

const commonjsConfig = {
  include: 'node_modules/**',
  namedExports: {
    'node_modules/react/index.js': [
      'cloneElement',
      'Component',
      'createElement'
    ],
    'node_modules/react-is/index.js': [
      'isValidElementType'
    ]
  }
};

let plugins = [
  babel(),
  resolve(),
  commonjs(commonjsConfig)
];

if (process.env.NODE_ENV === 'production') {
  plugins = [
    babel(),
    resolve(),
    replace({
      ['process.env.NODE_ENV']: JSON.stringify('production')
    }),
    commonjs(commonjsConfig),
    uglify()
  ];
}

export default {
  input: 'src/server.js',
  output: {
    file: 'web-server.js',
    format: 'cjs'
  },
  external: [
    'express',
    'stream'
  ],
  plugins
}
