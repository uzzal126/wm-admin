/// <reference types="vite/client" />

import { loadEnv, defineConfig, transformWithEsbuild } from 'vite';
import react from '@vitejs/plugin-react-swc';
import svgr from "vite-plugin-svgr";

import { executeUnsafe, isObject, isUndefinedNullOrEmptyString, } from './utilities';

const loadEnvironmentVariables = (mode: string): NodeJS.ProcessEnv => {
  return executeUnsafe(mode => {
    let process: NodeJS.Process;

    if (isObject(global?.process)) { process = global.process; }
    else if (isObject(window?.process)) { process = window.process; }
    else { return {}; }

    // updating the 'process.env' variable...
    process.env = {
      ...process.env,
      ...loadEnv(mode, process.cwd()),
    };
    
    // returns the environment variables...
    return process.env;
  }, mode);
};

const retrieveSourceMapBuildOption = (environmentVariables: NodeJS.ProcessEnv): boolean | 'inline' | 'hidden' => {
  if (isUndefinedNullOrEmptyString(environmentVariables.VITE_GENERATE_SOURCEMAP)) { return false; }

  let sourceMap = environmentVariables.VITE_GENERATE_SOURCEMAP.toLowerCase(); 

  if (sourceMap === 'true') { return true; }
  if (sourceMap === 'inline' || sourceMap === 'hidden') { return sourceMap; }

  return false;
};

export default ({ mode }) => {
  // loading the environment variables...
  const environmentVariables = loadEnvironmentVariables(mode);

  // https://vitejs.dev/config/
  return defineConfig({
    server: {
      host: environmentVariables.VITE_HOST,
      port: parseInt(environmentVariables.VITE_PORT),
      open: false,
    },
    plugins: [
      {
        name: 'transform-js-files-as-jsx',
        async transform(code: string, id: string) {
          // if the file does not end with '.js' within 'src' directory...
          if (!id.match(/src\/.*\.js$/)) {
            // we shall not proceed any further...
            return null;
          }
  
          // otherwise, we shall call the transform function
          // from vite (instead of directly transforming with esbuild)...
          return transformWithEsbuild(code, id, {
            loader: 'jsx',
            jsx: 'automatic',
          });
        },
      },
      react(),
      svgr(),
    ],
    optimizeDeps: {
      force: false,
      esbuildOptions: {
        loader: {
          '.js': 'jsx',
          '.ts': 'tsx',
        },
      },
    },
    build: {
      sourcemap: retrieveSourceMapBuildOption(environmentVariables),
    },
  });
};
