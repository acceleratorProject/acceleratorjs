import commonjs from '@rollup/plugin-commonjs'
import { nodeResolve } from '@rollup/plugin-node-resolve'
export default {
  input: 'src/init.js',
  output: {
    file: 'dist/init.cjs',
    format: 'cjs'
  },
  plugins: [nodeResolve(), commonjs()]
}
