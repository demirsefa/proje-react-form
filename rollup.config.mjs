import resolve from "@rollup/plugin-node-resolve";
import commonjs from "@rollup/plugin-commonjs";
import { terser } from "rollup-plugin-terser";
import external from "rollup-plugin-peer-deps-external";
import typescript from "rollup-plugin-typescript2";

export default {
	input: "src/index.tsx",
	output: [
		{
			file: "dist/index.cjs.js",
			format: "cjs",
			sourcemap: true,
			name: "dev",
		},
		{
			file: "dist/index.esm.js",
			format: "esm",
			sourcemap: true,
			name: "dev",
		},
	],
	plugins: [external(), resolve(), commonjs(), typescript({ tsconfig: "./tsconfig.json", clean: true }), terser()],
	external: ["react"],

};
