import babel from 'rollup-plugin-babel';
import resolve from 'rollup-plugin-node-resolve';
import replace from 'rollup-plugin-replace';
import commonjs from 'rollup-plugin-commonjs';
import { uglify } from 'rollup-plugin-uglify';

const resolveConfig = {
  jail: './src'
};

const commonjsConfig = {
  include: 'node_modules/**',
  namedExports: {
    'node_modules/react/index.js': [
      'cloneElement',
      'Component',
      'createElement',
      'createContext',
      'useState',
      'useContext'
    ],
    'node_modules/react-is/index.js': [
      'isElement',
      'isValidElementType',
      'ForwardRef'
    ],
    'node_modules/react-cache/index.js': [
      'unstable_createResource'
    ]
  }
};

let plugins = [
  babel({ runtimeHelpers: true }),
  resolve(resolveConfig),
  commonjs(commonjsConfig)
];

if (process.env.NODE_ENV === 'production') {
  plugins = [
    babel({ runtimeHelpers: true }),
    resolve(resolveConfig),
    replace({
      ['process.env.NODE_ENV']: JSON.stringify('production'),
      ['process.env.SSR_ENABLED']: JSON.stringify(false)
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
    '@babel/runtime/helpers/extends',
    '@babel/runtime/helpers/slicedToArray',
    'express',
    'stream',
    'path',
    'prop-types',
    'styled-components',
    'react',
    'react-dom/server'
  ],
  plugins
}
