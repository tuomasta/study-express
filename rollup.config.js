import resolve from 'rollup-plugin-node-resolve';
import commonjs from 'rollup-plugin-commonjs';
import json from 'rollup-plugin-json';

export default {
    input: 'dist/serve.js',
    output: {
        file: 'dist/bundle.js',
        format: 'cjs'
    },
    onwarn(warning) {
        // skip certain warnings
        if (warning.code === 'UNRESOLVED_IMPORT' ||
            warning.code === 'EVAL') return;
      
        // console.warn everything else
        console.warn(warning.message, warning.code);
    }, 
	plugins: [
        resolve({
            preferBuiltins: true
        }),
        commonjs({
            include: ['node_modules/**', 'dist/**'],
        }),
        json()
	]
}