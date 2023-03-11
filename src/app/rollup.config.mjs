import postcss from "rollup-plugin-postcss";
import typescript from "rollup-plugin-typescript2";
import livereload from "rollup-plugin-livereload";
import serve from "rollup-plugin-serve";
import resolve from "@rollup/plugin-node-resolve";
import replace from "@rollup/plugin-replace";
import babel from "@rollup/plugin-babel";
import commonjs from "@rollup/plugin-commonjs";
import React from "react";
import ReactDOM from "react-dom";
import ReactRouteDom from "react-router-dom";
import nodePolyfills from "rollup-plugin-node-polyfills";


export default {
	input: "index.tsx",
	output: {
		file: "dist/bundle.js",
		format: "cjs",
		sourcemap: true,
	},
	plugins: [
		typescript({ tsconfig: "./tsconfig.json" }),
		postcss({
			extensions: [".css"],
		}),
		replace({
			"process.env.NODE_ENV": JSON.stringify("development"),
		}),
		nodePolyfills(),
		resolve({
			browser: true,
		}), commonjs({
			include: /node_modules/,
			namedExports: {
				"react": Object.keys(React),
				"react-dom": Object.keys(ReactDOM),
				"react-router-dom": Object.keys(ReactRouteDom),
			},
		}),
		babel({
			exclude: "node_modules/**",
			presets: ["@babel/preset-react"],
			babelHelpers: "bundled",
		}),

		livereload({
			watch: "dist",
			verbose: false, // Disable console output
			port: 12345,
			delay: 300,
		}),
		serve({
			host: "localhost",
			port: 10001,
		}),
	],
};
