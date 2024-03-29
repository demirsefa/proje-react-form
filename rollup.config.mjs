import resolve from "@rollup/plugin-node-resolve";
import commonjs from "@rollup/plugin-commonjs";
import { terser } from "rollup-plugin-terser";
import external from "rollup-plugin-peer-deps-external";
import typescript from "rollup-plugin-typescript2";

export default {
	input: "src/index.ts",
	output: [
		{
			file: "dist/index.cjs.js",
			format: "cjs",
			sourcemap: false,
		},
		{
			file: "dist/index.esm.js",
			format: "esm",
			sourcemap: false,
		},
	],
	plugins: [external(), resolve(), commonjs(), typescript({ tsconfig: "./tsconfig.json", clean: true }), terser()],
	external: ["react"],

};
