import resolve from 'rollup-plugin-node-resolve';
import commonjs from 'rollup-plugin-commonjs';
import json from 'rollup-plugin-json';

export default {
    input: 'dist/serve.js',
    output: {
        file: 'dist/bundle.js',
        format: 'cjs'
    },
	plugins: [
        resolve(),
        commonjs({
            include: ['node_modules/**', 'dist/**'],
        }),
        json()
	]
}