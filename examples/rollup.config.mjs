import serve from "rollup-plugin-serve";
import livereload from "rollup-plugin-livereload";
import typescript from "rollup-plugin-typescript2";
import external from "rollup-plugin-peer-deps-external";
import resolve from "@rollup/plugin-node-resolve";
import commonjs from "@rollup/plugin-commonjs";
import replace from '@rollup/plugin-replace';
import scss from 'rollup-plugin-scss'

export default {
	input: "examples/src/index.tsx",
	output: [
		{
			file: "examples/public/dist/index.js",
			format: "iife",
			sourcemap: true,
		},
	],
	plugins: [
		replace({
			'process.env.NODE_ENV': JSON.stringify( 'development' )
		}),
		external(), resolve(), commonjs(),		typescript({ tsconfig: "examples/tsconfig.json", clean: true }),
		scss({ fileName: 'examples/public/dist/bundle.css' }),
		serve({
			open: true,
			verbose: true,
			contentBase: ["", "examples/public"],
			host: "localhost",
			port: 3000,
			historyApiFallback: true
		}),
		livereload({ watch: "examples/public/dist" }),],
};
